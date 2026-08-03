import { useQuery } from "@tanstack/react-query";
import { getLandlordProperties } from "@/lib/api/properties";

export function useLandlordProperties() {
  return useQuery({
    queryKey: ["landlord-properties"],
    queryFn: getLandlordProperties,
  });
}