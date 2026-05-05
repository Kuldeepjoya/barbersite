import type { Booking as BackendBooking } from "@/backend";
import { mockBackend } from "@/mocks/backend";
import type { Booking } from "@/types";
import { useQuery } from "@tanstack/react-query";

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

export function useConfirmBookingAfterPayment(stripeSessionId: string | null) {
  return useQuery<Booking, Error>({
    queryKey: ["confirm-booking", stripeSessionId],
    queryFn: async (): Promise<Booking> => {
      if (!stripeSessionId) throw new Error("No session ID provided");
      const result =
        await mockBackend.confirmBookingAfterPayment(stripeSessionId);
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      return fromBackend(result.ok);
    },
    enabled: !!stripeSessionId,
    retry: false,
  });
}
