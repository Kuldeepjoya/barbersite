import Types "../types/bookings-services";
import AdminLib "bookings-admin";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";

module {
  public type State = {
    bookings : List.List<Types.Booking>;
    services : List.List<Types.Service>;
    teamMembers : List.List<Types.TeamMember>;
    var nextBookingId : Nat;
    // Pending checkout sessions: stripeSessionId -> CheckoutRequest
    // stored so confirmBookingAfterPayment can reconstruct the booking
    var pendingSessions : [(Text, Types.CheckoutRequest)];
    // Stripe configuration
    var stripeSecretKey : Text;
    var stripeConfigured : Bool;
  };

  public func initState() : State {
    let services = List.empty<Types.Service>();
    services.add({ id = 1; name = "Haircut"; description = "Classic haircut styled to your preference"; price = 2500; durationMinutes = 30; category = #haircut });
    services.add({ id = 2; name = "Fade"; description = "Sharp fade with precision blending"; price = 3000; durationMinutes = 45; category = #fade });
    services.add({ id = 3; name = "Beard Trim"; description = "Shape and trim for a clean, defined look"; price = 2000; durationMinutes = 20; category = #beardTrim });
    services.add({ id = 4; name = "Line-up"; description = "Clean edge-up on hairline and temples"; price = 1500; durationMinutes = 20; category = #lineup });

    let teamMembers = List.empty<Types.TeamMember>();
    teamMembers.add({ id = 1; name = "Marcus"; specialty = "Fades specialist" });
    teamMembers.add({ id = 2; name = "James"; specialty = "Classic cuts" });
    teamMembers.add({ id = 3; name = "Ray"; specialty = "Beard & Grooming" });

    {
      bookings = List.empty<Types.Booking>();
      services;
      teamMembers;
      var nextBookingId = 1;
      var pendingSessions = [];
      var stripeSecretKey = "";
      var stripeConfigured = false;
    };
  };

  // --- Services ---

  public func listServices(state : State) : [Types.Service] {
    state.services.toArray();
  };

  public func getService(state : State, id : Types.ServiceId) : ?Types.Service {
    state.services.find(func(s) { s.id == id });
  };

  // --- Team Members ---

  public func listTeamMembers(state : State) : [Types.TeamMember] {
    state.teamMembers.toArray();
  };

  public func getTeamMember(state : State, id : Types.TeamMemberId) : ?Types.TeamMember {
    state.teamMembers.find(func(m) { m.id == id });
  };

  // --- Bookings (read-only) ---

  public func listBookings(state : State) : [Types.Booking] {
    state.bookings.toArray();
  };

  public func getBooking(state : State, id : Types.BookingId) : ?Types.Booking {
    state.bookings.find(func(b) { b.id == id });
  };

  public func cancelBooking(state : State, id : Types.BookingId) : Types.BookingResult {
    switch (state.bookings.findIndex(func(b) { b.id == id })) {
      case null { #err("Booking not found") };
      case (?idx) {
        let booking = state.bookings.at(idx);
        if (booking.status == #cancelled) {
          return #err("Booking is already cancelled");
        };
        let updated = { booking with status = #cancelled };
        state.bookings.put(idx, updated);
        #ok(updated);
      };
    };
  };

  // --- Stripe Two-Step Payment Flow ---

  // Step 1: Validate request, store pending session, return session data for caller to use with Stripe.
  // The actual Stripe API call is performed in the mixin (requires async/await).
  // This function validates inputs and calculates the total, returning data needed for the checkout.
  public func validateCheckoutRequest(state : State, req : Types.CheckoutRequest) : { #ok : { totalAmount : Nat; serviceNames : [Text] }; #err : Text } {
    if (req.serviceIds.size() == 0) {
      return #err("At least one service must be selected");
    };
    var totalAmount : Nat = 0;
    let serviceNames = List.empty<Text>();
    for (sid in req.serviceIds.vals()) {
      switch (state.services.find(func(s) { s.id == sid })) {
        case null { return #err("Service not found: " # sid.toText()) };
        case (?s) {
          totalAmount += s.price;
          serviceNames.add(s.name);
        };
      };
    };
    #ok({ totalAmount; serviceNames = serviceNames.toArray() });
  };

  // Store a pending session so it can be retrieved when payment is confirmed
  public func storePendingSession(state : State, sessionId : Text, req : Types.CheckoutRequest) : () {
    state.pendingSessions := state.pendingSessions.concat([(sessionId, req)]);
  };

  // Step 2: Look up pending session, verify double-booking, create booking record atomically.
  // Called after Stripe confirms payment. Returns the newly created Booking.
  public func createBookingFromSession(
    state : State,
    adminState : AdminLib.AdminState,
    sessionId : Text,
    totalAmount : Nat,
  ) : Types.BookingResult {
    // Find and remove the pending session
    var foundReq : ?Types.CheckoutRequest = null;
    var newSessions : [(Text, Types.CheckoutRequest)] = [];
    for (entry in state.pendingSessions.vals()) {
      if (entry.0 == sessionId) {
        foundReq := ?entry.1;
      } else {
        newSessions := newSessions.concat([entry]);
      };
    };
    let req = switch (foundReq) {
      case null { return #err("Session not found or already used") };
      case (?r) { r };
    };
    state.pendingSessions := newSessions;

    // Check for double-booking: same preferredDateTime already confirmed/pending
    let conflict = state.bookings.find(func(b) {
      b.preferredDateTime == req.preferredDateTime and b.status != #cancelled
    });
    switch (conflict) {
      case (?_) { return #err("This time slot is already booked") };
      case null {};
    };

    // Generate reference code
    let dateStr = extractDateStr(req.preferredDateTime);
    let referenceCode = AdminLib.generateReferenceCode(adminState, dateStr);
    let id = state.nextBookingId;
    state.nextBookingId += 1;

    let booking : Types.Booking = {
      id;
      customerName = req.customerName;
      customerEmail = req.customerEmail;
      customerPhone = req.customerPhone;
      serviceIds = req.serviceIds;
      teamMemberId = req.teamMemberId;
      preferredDateTime = req.preferredDateTime;
      status = #confirmed;
      createdAt = Time.now();
      paymentStatus = #paid;
      referenceCode;
      totalAmount;
      stripeSessionId = ?sessionId;
    };
    state.bookings.add(booking);
    #ok(booking);
  };

  // Extract "YYYYMMDD" from an ISO-8601 preferredDateTime string (e.g. "2026-04-20T10:00")
  public func extractDateStr(dt : Text) : Text {
    let chars = dt.toArray();
    let size = chars.size();
    if (size < 10) { return "00000000" };
    let y = Text.fromArray([chars[0], chars[1], chars[2], chars[3]]);
    let m = Text.fromArray([chars[5], chars[6]]);
    let d = Text.fromArray([chars[8], chars[9]]);
    y # m # d;
  };
};
