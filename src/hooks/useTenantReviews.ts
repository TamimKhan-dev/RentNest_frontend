import { getTenantReviews } from "@/lib/api/tenants";
import { useQuery } from "@tanstack/react-query";

export function useTenantReviews() {
    return useQuery({
        queryKey: ["tenant-reviews"],
        queryFn: getTenantReviews
    });
};