import { mockBackend } from "@/mocks/backend";
import type { CheckoutRequest, CheckoutSessionResult } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateStripeCheckoutSession() {
  return useMutation<CheckoutSessionResult, Error, CheckoutRequest>({
    mutationFn: async (
      req: CheckoutRequest,
    ): Promise<CheckoutSessionResult> => {
      const result = await mockBackend.createStripeCheckoutSession({
        customerName: req.customerName,
        customerEmail: req.customerEmail,
        customerPhone: req.customerPhone,
        serviceIds: req.serviceIds.map((id) => BigInt(id)),
        teamMemberId:
          req.teamMemberId != null ? BigInt(req.teamMemberId) : undefined,
        preferredDateTime: req.preferredDateTime,
        successUrl: req.successUrl,
        cancelUrl: req.cancelUrl,
      });

      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }

      return {
        sessionId: result.ok.sessionId,
        checkoutUrl: result.ok.checkoutUrl,
      };
    },
  });
}
