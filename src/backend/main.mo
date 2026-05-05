import Lib "lib/bookings-services";
import AdminLib "lib/bookings-admin";
import BookingsServicesApi "mixins/bookings-services-api";
import BookingsAdminApi "mixins/bookings-admin-api";
import Migration "migration";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Stripe "mo:caffeineai-stripe/stripe";

(with migration = Migration.run)
actor {
  let state = Lib.initState();
  let adminState = AdminLib.initAdminState();

  // --- Required by caffeineai-stripe lint rules ---

  // HTTP outcall response transform (required by caffeineai-stripe)
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Check if Stripe has been configured
  public query func isStripeConfigured() : async Bool {
    state.stripeConfigured;
  };

  // Set Stripe secret key (admin setup)
  public shared func setStripeConfiguration(secretKey : Text) : async () {
    state.stripeSecretKey := secretKey;
    state.stripeConfigured := true;
  };

  // Low-level Stripe checkout session creation (required by extension rules)
  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let config : Stripe.StripeConfiguration = {
      secretKey = state.stripeSecretKey;
      allowedCountries = ["IN"];
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  // Get Stripe session status (required by extension rules)
  public shared func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config : Stripe.StripeConfiguration = {
      secretKey = state.stripeSecretKey;
      allowedCountries = ["IN"];
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  // Mixin includes — after transform is defined so it can be passed as a parameter
  include BookingsServicesApi(state, adminState, transform);
  include BookingsAdminApi(state, adminState);
};
