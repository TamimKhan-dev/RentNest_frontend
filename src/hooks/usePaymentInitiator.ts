import { initiatePayment } from "@/lib/api/tenants";
import { useMutation } from "@tanstack/react-query";

export function usePaymentInitiator() {
  return useMutation({
    mutationFn: (id: number) => initiatePayment(id),
    onSuccess: (data) => {
      const url = data?.data?.paymentUrl;
      if (url) {
        window.location.href = url;
      }
    },
    onError: (error) => {
        console.log(error)
    },
  });
}
