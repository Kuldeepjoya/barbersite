import Types "../types/bookings-services";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type State = {
    bookings : List.List<Types.Booking>;
    services : List.List<Types.Service>;
    teamMembers : List.List<Types.TeamMember>;
    var nextBookingId : Nat;
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

  // --- Bookings ---

  public func createBooking(state : State, req : Types.BookingRequest) : Types.BookingResult {
    // Validate service exists
    switch (state.services.find(func(s) { s.id == req.serviceId })) {
      case null { return #err("Service not found") };
      case (?_) {};
    };

    // Validate team member if provided
    switch (req.teamMemberId) {
      case (?tmId) {
        switch (state.teamMembers.find(func(m) { m.id == tmId })) {
          case null { return #err("Team member not found") };
          case (?_) {};
        };
      };
      case null {};
    };

    // Validate required fields
    if (req.customerName == "") { return #err("Customer name is required") };
    if (req.customerEmail == "") { return #err("Customer email is required") };
    if (req.preferredDateTime == "") { return #err("Preferred date/time is required") };

    let id = state.nextBookingId;
    state.nextBookingId += 1;

    let booking : Types.Booking = {
      id;
      customerName = req.customerName;
      customerEmail = req.customerEmail;
      customerPhone = req.customerPhone;
      serviceId = req.serviceId;
      teamMemberId = req.teamMemberId;
      preferredDateTime = req.preferredDateTime;
      status = #confirmed;
      createdAt = Time.now();
    };

    state.bookings.add(booking);
    #ok(booking);
  };

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
};
