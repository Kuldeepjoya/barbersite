import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export type BookingId = bigint;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Service {
    id: ServiceId;
    name: string;
    description: string;
    durationMinutes: bigint;
    category: ServiceCategory;
    price: bigint;
}
export type BookingResult = {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: string;
};
export interface CheckoutRequest {
    customerName: string;
    cancelUrl: string;
    customerPhone: string;
    teamMemberId?: TeamMemberId;
    preferredDateTime: string;
    serviceIds: Array<ServiceId>;
    customerEmail: string;
    successUrl: string;
}
export type CheckoutSessionResult = {
    __kind__: "ok";
    ok: {
        checkoutUrl: string;
        sessionId: string;
    };
} | {
    __kind__: "err";
    err: string;
};
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type TeamMemberId = bigint;
export interface TeamMember {
    id: TeamMemberId;
    name: string;
    specialty: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface Booking {
    id: BookingId;
    customerName: string;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    customerPhone: string;
    teamMemberId?: TeamMemberId;
    createdAt: Timestamp;
    preferredDateTime: string;
    serviceIds: Array<ServiceId>;
    referenceCode: string;
    totalAmount: bigint;
    stripeSessionId?: string;
    customerEmail: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum PaymentStatus {
    paid = "paid",
    unpaid = "unpaid"
}
export enum ServiceCategory {
    fade = "fade",
    haircut = "haircut",
    beardTrim = "beardTrim",
    lineup = "lineup"
}
export interface backendInterface {
    cancelBooking(id: BookingId): Promise<BookingResult>;
    confirmBookingAfterPayment(stripeSessionId: string): Promise<BookingResult>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createStripeCheckoutSession(req: CheckoutRequest): Promise<CheckoutSessionResult>;
    getBooking(id: BookingId): Promise<Booking | null>;
    getService(id: ServiceId): Promise<Service | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTeamMember(id: TeamMemberId): Promise<TeamMember | null>;
    isStripeConfigured(): Promise<boolean>;
    listAllBookings(): Promise<Array<Booking>>;
    listBookings(): Promise<Array<Booking>>;
    listBookingsByDate(dateStr: string): Promise<Array<Booking>>;
    listFutureBookings(): Promise<Array<Booking>>;
    listServices(): Promise<Array<Service>>;
    listTeamMembers(): Promise<Array<TeamMember>>;
    markBookingPaid(id: BookingId): Promise<BookingResult>;
    setStripeConfiguration(secretKey: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
