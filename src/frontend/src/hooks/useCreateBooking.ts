/**
 * Kept for backward compatibility (admin hooks may import Booking type helpers).
 * The active booking flow now uses useCreateStripeCheckoutSession.
 */
export { useCreateStripeCheckoutSession as useCreateBooking } from "./useCreateStripeCheckoutSession";
