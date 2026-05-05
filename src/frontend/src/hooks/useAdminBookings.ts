import type { Booking as BackendBooking } from "@/backend";
import { mockBackend } from "@/mocks/backend";
import type { Booking } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Convert backend Booking (bigint enums) to frontend Booking (string enums, number ids)
function fromBackend(b: BackendBooking): Booking {
  return {
    id: Number(b.id),
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    serviceIds: b.serviceIds.map(Number),
    teamMemberId:
      b.teamMemberId !== undefined ? Number(b.teamMemberId) : undefined,
    preferredDateTime: b.preferredDateTime,
    status: b.status as "pending" | "confirmed" | "cancelled",
    paymentStatus: b.paymentStatus as "unpaid" | "paid",
    referenceCode: b.referenceCode,
    createdAt: Number(b.createdAt / BigInt(1_000_000)),
    totalAmount: Number(b.totalAmount),
    stripeSessionId: b.stripeSessionId ?? null,
  };
}

export function useAllBookings() {
  return useQuery<Booking[]>({
    queryKey: ["admin", "bookings", "all"],
    queryFn: async () => {
      const bookings = await mockBackend.listAllBookings();
      return bookings.map(fromBackend);
    },
    staleTime: 0,
    refetchInterval: 10_000,
  });
}

export function useBookingsByDate(dateStr: string) {
  return useQuery<Booking[]>({
    queryKey: ["admin", "bookings", "date", dateStr],
    queryFn: async () => {
      if (!dateStr) return [];
      const bookings = await mockBackend.listBookingsByDate(dateStr);
      return bookings.map(fromBackend);
    },
    enabled: dateStr.length > 0,
    staleTime: 0,
    refetchInterval: 10_000,
  });
}

export function useFutureBookings() {
  return useQuery<Booking[]>({
    queryKey: ["admin", "bookings", "future"],
    queryFn: async () => {
      const bookings = await mockBackend.listFutureBookings();
      return bookings.map(fromBackend);
    },
    staleTime: 0,
    refetchInterval: 10_000,
  });
}
