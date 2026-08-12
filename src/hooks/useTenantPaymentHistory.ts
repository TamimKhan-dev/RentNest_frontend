import { getTenantPayments } from "@/lib/api/tenants";
import { useQuery } from "@tanstack/react-query";


export function useTenantPyamentHistory() {
    return useQuery({
        queryKey: ["tenants-payment-history"],
        queryFn: getTenantPayments
    });
};