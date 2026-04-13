import Lib "lib/bookings-services";
import BookingsServicesApi "mixins/bookings-services-api";

actor {
  let state = Lib.initState();
  include BookingsServicesApi(state);
};
