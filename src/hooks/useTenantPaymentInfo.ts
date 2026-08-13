import { getTenantPaymentInfo } from "@/lib/api/tenants";
import { useQuery } from "@tanstack/react-query";


export function useTenantPaymentInfo(session_id: string) {
    return useQuery({
        queryKey: ["tenant-payment-info", session_id],
        queryFn: () => getTenantPaymentInfo(session_id)
    });
};