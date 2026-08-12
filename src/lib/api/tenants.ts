import { PaymentHistory } from "@/types/payment";


export async function getTenantPayments() {
    const res = await fetch("/api/payments");
    if (!res.ok) throw new Error("Failed to load rental-requests");
    const json = await res.json();
    return json.data as PaymentHistory[];
};