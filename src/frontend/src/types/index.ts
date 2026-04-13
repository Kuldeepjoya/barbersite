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

export interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: number;
  teamMemberId?: number;
  preferredDateTime: string;
  status: BookingStatus;
  createdAt: number;
}

export interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: number;
  teamMemberId?: number;
  preferredDateTime: string;
}

export type BookingResult = { ok: Booking } | { err: string };
