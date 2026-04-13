import Common "common";

module {
  public type BookingId = Common.BookingId;
  public type ServiceId = Common.ServiceId;
  public type TeamMemberId = Common.TeamMemberId;
  public type Timestamp = Common.Timestamp;

  public type ServiceCategory = {
    #haircut;
    #fade;
    #beardTrim;
    #lineup;
  };

  public type Service = {
    id : ServiceId;
    name : Text;
    description : Text;
    price : Nat; // in cents
    durationMinutes : Nat;
    category : ServiceCategory;
  };

  public type TeamMember = {
    id : TeamMemberId;
    name : Text;
    specialty : Text;
  };

  public type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type Booking = {
    id : BookingId;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    serviceId : ServiceId;
    teamMemberId : ?TeamMemberId;
    preferredDateTime : Text; // ISO-8601 string from client
    status : BookingStatus;
    createdAt : Timestamp;
  };

  public type BookingRequest = {
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    serviceId : ServiceId;
    teamMemberId : ?TeamMemberId;
    preferredDateTime : Text;
  };

  public type BookingResult = {
    #ok : Booking;
    #err : Text;
  };
};
