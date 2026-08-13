import { PaymentHistory } from "@/types/payment";
import { RentalRequestData, Review, TenantPaymentInfo } from "@/types/tenant";


export async function getTenantPayments() {
    const res = await fetch("/api/payments");
    if (!res.ok) throw new Error("Failed to load rental-requests");
    const json = await res.json();
    return json.data as PaymentHistory[];
};

export async function getTenantReviews() {
    const res = await fetch("/api/reviews");
    if (!res.ok) throw new Error("Failed to load reviews");
    const json = await res.json();
    return json.data as Review[];
}

export async function getTenantRentalRequest(id: number) {
     const res = await fetch(`/api/rentals/${id}`, {
        cache: "no-cache",
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      return json.data as RentalRequestData;
};

export async function initiatePayment(id: number) {
    const res = await fetch(`/api/payments/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rentalRequestId: id }),
        });
        if (!res.ok) throw new Error("Failed to create checkout session");
        return res.json();
};

export async function getTenantPaymentInfo(session_id: string) {
  const res = await fetch(`/api/payments/${session_id}`, {
    cache: "no-cache"
  });
  if (!res.ok) throw new Error("Network response was not ok");
  const json = await res.json();
  return json.data as TenantPaymentInfo;
};