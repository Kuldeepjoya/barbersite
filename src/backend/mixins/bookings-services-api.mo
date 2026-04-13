import Types "../types/bookings-services";
import Lib "../lib/bookings-services";

mixin (state : Lib.State) {
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

  // --- Bookings ---

  public shared func createBooking(req : Types.BookingRequest) : async Types.BookingResult {
    Lib.createBooking(state, req);
  };

  public query func listBookings() : async [Types.Booking] {
    Lib.listBookings(state);
  };

  public query func getBooking(id : Types.BookingId) : async ?Types.Booking {
    Lib.getBooking(state, id);
  };

  public shared func cancelBooking(id : Types.BookingId) : async Types.BookingResult {
    Lib.cancelBooking(state, id);
  };
};
