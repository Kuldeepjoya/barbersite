import { toggleBookingPayment } from "@/mocks/backend";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMarkBookingPaid() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, bigint>({
    mutationFn: async (id: bigint) => {
      await toggleBookingPayment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] });
    },
  });
}
