import { PaymentHistory } from "@/types/payment";
import { Review } from "@/types/tenant";


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