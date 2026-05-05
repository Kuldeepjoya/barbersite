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
    price : Nat; // in paise (smallest INR unit)
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

  public type PaymentStatus = {
    #unpaid;
    #paid;
  };

  // Updated Booking — serviceIds replaces serviceId; totalAmount and stripeSessionId added
  public type Booking = {
    id : BookingId;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    serviceIds : [ServiceId]; // array of selected service IDs
    teamMemberId : ?TeamMemberId;
    preferredDateTime : Text; // ISO-8601 string from client
    status : BookingStatus;
    createdAt : Timestamp;
    paymentStatus : PaymentStatus;
    referenceCode : Text; // MD-YYYYMMDD-XXX
    totalAmount : Nat; // total price in rupees
    stripeSessionId : ?Text; // Stripe Checkout Session ID
  };

  // Request to initiate a Stripe Checkout session (no booking created yet)
  public type CheckoutRequest = {
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    serviceIds : [ServiceId]; // one or more services
    teamMemberId : ?TeamMemberId;
    preferredDateTime : Text;
    successUrl : Text;
    cancelUrl : Text;
  };

  // Returned from createStripeCheckoutSession
  public type CheckoutSessionResult = {
    #ok : { sessionId : Text; checkoutUrl : Text };
    #err : Text;
  };

  public type BookingResult = {
    #ok : Booking;
    #err : Text;
  };
};
