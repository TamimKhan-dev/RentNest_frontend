import { getAdminRentalRequests } from "@/lib/api/adminData";
import { useQuery } from "@tanstack/react-query";

export function useAdminRentalRequests() {
  return useQuery({
    queryKey: ["admin-rental-requests"],
    queryFn: getAdminRentalRequests,
  });
}