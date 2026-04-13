import type { Booking, BookingRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, BookingRequest>({
    mutationFn: async (req: BookingRequest): Promise<Booking> => {
      // When backend is available: const result = await actor.createBooking(req)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const booking: Booking = {
        id: Date.now(),
        customerName: req.customerName,
        customerEmail: req.customerEmail,
        customerPhone: req.customerPhone,
        serviceId: req.serviceId,
        teamMemberId: req.teamMemberId,
        preferredDateTime: req.preferredDateTime,
        status: "confirmed",
        createdAt: Date.now(),
      };
      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
