import { getTenantRentalRequest } from "@/lib/api/tenants";
import { useQuery } from "@tanstack/react-query";

export function useTenantRentalRequest(id: number) {
  return useQuery({
    queryKey: ["tenant-rental-request", id],
    queryFn: () => getTenantRentalRequest(id),
  });
}
