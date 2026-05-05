import Types "../types/bookings-services";
import Lib "../lib/bookings-services";
import AdminLib "../lib/bookings-admin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Text "mo:core/Text";

mixin (state : Lib.State, adminState : AdminLib.AdminState, transformFn : OutCall.Transform) {

  // --- Services ---

  public query func listServices() : async [Types.Service] {
    Lib.listServices(state);
  };

  public query func getService(id : Types.ServiceId) : async ?Types.Service {
    Lib.getService(state, id);
  };

  // --- Team Members ---

  public query func listTeamMembers() : async [Types.TeamMember] {
    Lib.listTeamMembers(state);
  };

  public query func getTeamMember(id : Types.TeamMemberId) : async ?Types.TeamMember {
    Lib.getTeamMember(state, id);
  };

  // --- Stripe Two-Step Booking Flow ---

  // Step 1: Validate the booking request, create a Stripe Checkout session, and return the
  // hosted checkout URL. No booking record is created at this point.
  public shared ({ caller }) func createStripeCheckoutSession(req : Types.CheckoutRequest) : async Types.CheckoutSessionResult {
    let validation = Lib.validateCheckoutRequest(state, req);
    switch (validation) {
      case (#err(msg)) { return #err(msg) };
      case (#ok(_)) {};
    };

    var items : [Stripe.ShoppingItem] = [];
    for (sid in req.serviceIds.vals()) {
      let svc = switch (Lib.getService(state, sid)) {
        case null { return #err("Service not found: " # sid.toText()) };
        case (?s) { s };
      };
      items := items.concat([{
        currency = "inr";
        productName = svc.name;
        productDescription = svc.description;
        priceInCents = svc.price;
        quantity = 1;
      }]);
    };

    let config : Stripe.StripeConfiguration = {
      secretKey = state.stripeSecretKey;
      allowedCountries = ["IN"];
    };

    try {
      let sessionJson = await Stripe.createCheckoutSession(
        config,
        caller,
        items,
        req.successUrl,
        req.cancelUrl,
        transformFn,
      );

      let sessionId = extractJsonField(sessionJson, "id");
      let checkoutUrl = extractJsonField(sessionJson, "url");

      switch (sessionId, checkoutUrl) {
        case (?sid, ?url) {
          Lib.storePendingSession(state, sid, req);
          #ok({ sessionId = sid; checkoutUrl = url });
        };
        case _ { #err("Failed to parse Stripe session response") };
      };
    } catch (_) {
      #err("Failed to create Stripe checkout session");
    };
  };

  // Step 2: Called after Stripe redirects to successUrl.
  // Verifies payment, then atomically creates the booking record.
  public shared func confirmBookingAfterPayment(stripeSessionId : Text) : async Types.BookingResult {
    let config : Stripe.StripeConfiguration = {
      secretKey = state.stripeSecretKey;
      allowedCountries = ["IN"];
    };

    let status = await Stripe.getSessionStatus(config, stripeSessionId, transformFn);
    switch (status) {
      case (#failed({ error })) { #err("Payment verification failed: " # error) };
      case (#completed({ response; userPrincipal = _ })) {
        let totalAmount = switch (extractJsonNat(response, "amount_total")) {
          case (?amt) { amt };
          case null { 0 };
        };
        Lib.createBookingFromSession(state, adminState, stripeSessionId, totalAmount);
      };
    };
  };

  // --- Bookings ---

  public query func listBookings() : async [Types.Booking] {
    Lib.listBookings(state);
  };

  public query func getBooking(id : Types.BookingId) : async ?Types.Booking {
    Lib.getBooking(state, id);
  };

  public shared func cancelBooking(id : Types.BookingId) : async Types.BookingResult {
    Lib.cancelBooking(state, id);
  };

  // --- JSON Helpers ---

  private func extractJsonField(json : Text, field : Text) : ?Text {
    let patterns = ["\"" # field # "\":\"", "\"" # field # "\": \""];
    for (pattern in patterns.vals()) {
      if (json.contains(#text pattern)) {
        let parts = json.split(#text pattern);
        switch (parts.next()) {
          case null {};
          case (?_) {
            switch (parts.next()) {
              case (?afterPattern) {
                switch (afterPattern.split(#text "\"").next()) {
                  case (?value) { return ?value };
                  case null {};
                };
              };
              case null {};
            };
          };
        };
      };
    };
    null;
  };

  private func extractJsonNat(json : Text, field : Text) : ?Nat {
    let patterns = ["\"" # field # "\":", "\"" # field # "\": "];
    for (pattern in patterns.vals()) {
      if (json.contains(#text pattern)) {
        let parts = json.split(#text pattern);
        switch (parts.next()) {
          case null {};
          case (?_) {
            switch (parts.next()) {
              case (?afterPattern) {
                var numStr = "";
                var done = false;
                for (ch in afterPattern.toArray().vals()) {
                  if (not done) {
                    if (ch >= '0' and ch <= '9') {
                      numStr := numStr # (Text.fromChar(ch));
                    } else {
                      done := true;
                    };
                  };
                };
                if (numStr.size() > 0) {
                  return numStr.toNat();
                };
              };
              case null {};
            };
          };
        };
      };
    };
    null;
  };
};
