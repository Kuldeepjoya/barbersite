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
export type TeamMemberId = bigint;
export interface BookingRequest {
    customerName: string;
    customerPhone: string;
    teamMemberId?: TeamMemberId;
    preferredDateTime: string;
    serviceId: ServiceId;
    customerEmail: string;
}
export interface TeamMember {
    id: TeamMemberId;
    name: string;
    specialty: string;
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
export interface Booking {
    id: BookingId;
    customerName: string;
    status: BookingStatus;
    customerPhone: string;
    teamMemberId?: TeamMemberId;
    createdAt: Timestamp;
    preferredDateTime: string;
    serviceId: ServiceId;
    customerEmail: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum ServiceCategory {
    fade = "fade",
    haircut = "haircut",
    beardTrim = "beardTrim",
    lineup = "lineup"
}
export interface backendInterface {
    cancelBooking(id: BookingId): Promise<BookingResult>;
    createBooking(req: BookingRequest): Promise<BookingResult>;
    getBooking(id: BookingId): Promise<Booking | null>;
    getService(id: ServiceId): Promise<Service | null>;
    getTeamMember(id: TeamMemberId): Promise<TeamMember | null>;
    listBookings(): Promise<Array<Booking>>;
    listServices(): Promise<Array<Service>>;
    listTeamMembers(): Promise<Array<TeamMember>>;
}
