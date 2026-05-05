export type ServiceCategory = "haircut" | "fade" | "beard" | "shave" | "combo";

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: ServiceCategory;
}

export interface TeamMember {
  id: number;
  name: string;
  specialty: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid";

export interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  /** Legacy single-service (kept for admin display compat) */
  serviceId?: number;
  /** New multi-service list */
  serviceIds: number[];
  teamMemberId?: number;
  preferredDateTime: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  referenceCode: string;
  createdAt: number;
  totalAmount: number;
  stripeSessionId?: string | null;
}

/** Used by the old single-service flow (kept for admin) */
export interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: number;
  teamMemberId?: number;
  preferredDateTime: string;
}

/** New multi-service checkout request */
export interface CheckoutRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceIds: number[];
  teamMemberId?: number | null;
  preferredDateTime: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResult {
  sessionId: string;
  checkoutUrl: string;
}

export type BookingResult = { ok: Booking } | { err: string };
