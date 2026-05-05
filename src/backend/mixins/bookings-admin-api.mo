import Types "../types/bookings-services";
import BookingsLib "../lib/bookings-services";
import AdminLib "../lib/bookings-admin";

mixin (state : BookingsLib.State, adminState : AdminLib.AdminState) {
  // --- Admin Booking Queries ---

  // Returns all bookings sorted by preferredDateTime ascending
  public query func listAllBookings() : async [Types.Booking] {
    AdminLib.listAllBookings(state.bookings);
  };

  // Returns bookings for a specific date (YYYY-MM-DD), sorted by time ascending
  public query func listBookingsByDate(dateStr : Text) : async [Types.Booking] {
    AdminLib.listBookingsByDate(state.bookings, dateStr);
  };

  // --- Admin Booking Updates ---

  // Toggles payment status between #paid and #unpaid (manual admin override)
  public shared func markBookingPaid(id : Types.BookingId) : async Types.BookingResult {
    AdminLib.markBookingPaid(state.bookings, id);
  };

  // Returns all upcoming bookings (preferredDateTime > now), sorted ascending
  public query func listFutureBookings() : async [Types.Booking] {
    AdminLib.listFutureBookings(state.bookings);
  };
};
