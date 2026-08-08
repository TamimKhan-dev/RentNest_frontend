import { getRentalRequests } from "@/lib/api/rentalRequests";
import { useQuery } from "@tanstack/react-query";

export function useRentalRequests() {
  return useQuery({
    queryKey: ["rental-requests"],
    queryFn: getRentalRequests,
  });
}