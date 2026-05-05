import Types "../types/bookings-services";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  // State for admin-specific counters (daily sequence tracking)
  public type AdminState = {
    // Array of (dateStr "YYYYMMDD", lastSeqUsed) pairs
    var dailyCounters : [(Text, Nat)];
  };

  public func initAdminState() : AdminState {
    { var dailyCounters = [] };
  };

  // Generate a reference code in MD-YYYYMMDD-XXX format
  // dateStr: "YYYYMMDD" extracted from preferredDateTime
  public func generateReferenceCode(adminState : AdminState, dateStr : Text) : Text {
    // Find current counter for this date
    var seq : Nat = 0;
    for (entry in adminState.dailyCounters.values()) {
      if (entry.0 == dateStr) { seq := entry.1 };
    };
    seq += 1;

    // Rebuild counters array, updating or inserting entry for dateStr
    var found = false;
    var newCounters : [(Text, Nat)] = [];
    for (entry in adminState.dailyCounters.values()) {
      if (entry.0 == dateStr) {
        found := true;
        newCounters := newCounters.concat([(dateStr, seq)]);
      } else {
        newCounters := newCounters.concat([entry]);
      };
    };
    if (not found) {
      newCounters := newCounters.concat([(dateStr, seq)]);
    };
    adminState.dailyCounters := newCounters;

    let seqPadded = if (seq < 10) { "00" # seq.toText() }
                    else if (seq < 100) { "0" # seq.toText() }
                    else { seq.toText() };
    "MD-" # dateStr # "-" # seqPadded;
  };

  // Toggle payment status: unpaid -> paid, paid -> unpaid
  public func markBookingPaid(bookings : List.List<Types.Booking>, id : Types.BookingId) : Types.BookingResult {
    var result : Types.BookingResult = #err("Booking not found");
    var idx : Nat = 0;
    label search for (b in bookings.values()) {
      if (b.id == id) {
        let newStatus : Types.PaymentStatus = switch (b.paymentStatus) {
          case (#unpaid) { #paid };
          case (#paid) { #unpaid };
        };
        let updated = { b with paymentStatus = newStatus };
        bookings.put(idx, updated);
        result := #ok(updated);
        break search;
      };
      idx += 1;
    };
    result;
  };

  // List bookings where preferredDateTime starts with dateStr (YYYY-MM-DD), sorted ascending
  public func listBookingsByDate(bookings : List.List<Types.Booking>, dateStr : Text) : [Types.Booking] {
    let arr = bookings.toArray();
    let filtered = arr.filter(func(b : Types.Booking) : Bool {
      b.preferredDateTime.startsWith(#text dateStr)
    });
    sortByDateTime(filtered);
  };

  // List all bookings sorted by preferredDateTime ascending
  public func listAllBookings(bookings : List.List<Types.Booking>) : [Types.Booking] {
    sortByDateTime(bookings.toArray());
  };

  // List all bookings with preferredDateTime after the current time, sorted ascending
  public func listFutureBookings(bookings : List.List<Types.Booking>) : [Types.Booking] {
    // Time.now() returns nanoseconds as Int; convert to a comparable ISO datetime string
    // preferredDateTime is stored as "YYYY-MM-DDTHH:MM" — compare lexicographically
    let nowNs : Int = Time.now();
    // Convert nanoseconds to seconds
    let nowSec : Int = nowNs / 1_000_000_000;
    // Build ISO datetime prefix "YYYY-MM-DDTHH:MM" from epoch seconds
    let nowStr = epochSecondsToDateTimeStr(nowSec);
    let arr = bookings.toArray();
    let filtered = arr.filter(func(b : Types.Booking) : Bool {
      Text.compare(b.preferredDateTime, nowStr) == #greater
    });
    sortByDateTime(filtered);
  };

  // Convert Unix epoch seconds (Int) to "YYYY-MM-DDTHH:MM" string
  private func epochSecondsToDateTimeStr(epochSec : Int) : Text {
    let secondsPerMinute : Int = 60;
    let secondsPerHour : Int = 3600;
    let secondsPerDay : Int = 86400;

    // Calculate total minutes and hours
    let totalMinutes = epochSec / secondsPerMinute;
    let minute = totalMinutes % 60;
    let totalHours = epochSec / secondsPerHour;
    let hour = totalHours % 24;

    // Days since Unix epoch (1970-01-01)
    let days = epochSec / secondsPerDay;

    // Compute year, month, day from days since epoch
    let (year, month, day) = daysToYMD(days);

    let yStr = intToFixedText(year, 4);
    let mStr = intToFixedText(month, 2);
    let dStr = intToFixedText(day, 2);
    let hStr = intToFixedText(hour, 2);
    let minStr = intToFixedText(minute, 2);
    yStr # "-" # mStr # "-" # dStr # "T" # hStr # ":" # minStr;
  };

  // Convert days since 1970-01-01 to (year, month, day)
  private func daysToYMD(days : Int) : (Int, Int, Int) {
    // Using the civil algorithm for Gregorian calendar
    let z = days + 719468;
    let era : Int = (if (z >= 0) z else z - 146096) / 146097;
    let doe : Int = z - era * 146097;
    let yoe : Int = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let d : Int = doy - (153 * mp + 2) / 5 + 1;
    let m : Int = if (mp < 10) mp + 3 else mp - 9;
    let yr : Int = if (m <= 2) y + 1 else y;
    (yr, m, d);
  };

  // Format an Int as a left-zero-padded text with at least `width` digits
  private func intToFixedText(n : Int, width : Nat) : Text {
    let s = (if (n < 0) 0 else n).toText();
    var padded = s;
    var len = s.size();
    while (len < width) {
      padded := "0" # padded;
      len += 1;
    };
    padded;
  };

  // Sort bookings by preferredDateTime ascending
  private func sortByDateTime(arr : [Types.Booking]) : [Types.Booking] {
    let cmp : (Types.Booking, Types.Booking) -> Order.Order = func(a, b) {
      Text.compare(a.preferredDateTime, b.preferredDateTime)
    };
    arr.sort(cmp);
  };
};
