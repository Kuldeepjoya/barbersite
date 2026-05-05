import Types "./types/bookings-services";
import List "mo:core/List";

module {
  // Old Booking type (from previous version — had serviceId singular, no totalAmount, no stripeSessionId)
  type OldServiceId = Nat;
  type OldBookingId = Nat;
  type OldTeamMemberId = Nat;
  type OldTimestamp = Int;
  type OldBookingStatus = { #pending; #confirmed; #cancelled };
  type OldPaymentStatus = { #unpaid; #paid };
  type OldBooking = {
    id : OldBookingId;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    serviceId : OldServiceId;
    teamMemberId : ?OldTeamMemberId;
    preferredDateTime : Text;
    status : OldBookingStatus;
    createdAt : OldTimestamp;
    paymentStatus : OldPaymentStatus;
    referenceCode : Text;
  };

  type OldState = {
    bookings : List.List<OldBooking>;
    services : List.List<Types.Service>;
    teamMembers : List.List<Types.TeamMember>;
    var nextBookingId : Nat;
  };

  type OldAdminState = {
    var dailyCounters : [(Text, Nat)];
  };

  type NewState = {
    bookings : List.List<Types.Booking>;
    services : List.List<Types.Service>;
    teamMembers : List.List<Types.TeamMember>;
    var nextBookingId : Nat;
    var pendingSessions : [(Text, Types.CheckoutRequest)];
    var stripeSecretKey : Text;
    var stripeConfigured : Bool;
  };

  type NewAdminState = {
    var dailyCounters : [(Text, Nat)];
  };

  type OldActor = {
    state : OldState;
    adminState : OldAdminState;
  };

  type NewActor = {
    state : NewState;
    adminState : NewAdminState;
  };

  func migrateBooking(old : OldBooking) : Types.Booking {
    {
      id = old.id;
      customerName = old.customerName;
      customerEmail = old.customerEmail;
      customerPhone = old.customerPhone;
      serviceIds = [old.serviceId];
      teamMemberId = old.teamMemberId;
      preferredDateTime = old.preferredDateTime;
      status = old.status;
      createdAt = old.createdAt;
      paymentStatus = old.paymentStatus;
      referenceCode = old.referenceCode;
      totalAmount = 0;
      stripeSessionId = null;
    };
  };

  public func run(old : OldActor) : NewActor {
    let newBookings = List.empty<Types.Booking>();
    for (b in old.state.bookings.values()) {
      newBookings.add(migrateBooking(b));
    };
    let newState : NewState = {
      bookings = newBookings;
      services = old.state.services;
      teamMembers = old.state.teamMembers;
      var nextBookingId = old.state.nextBookingId;
      var pendingSessions = [];
      var stripeSecretKey = "";
      var stripeConfigured = false;
    };
    {
      state = newState;
      adminState = { var dailyCounters = old.adminState.dailyCounters };
    };
  };
};
