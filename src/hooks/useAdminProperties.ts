import { getAdminProperties } from "@/lib/api/adminData";
import { useQuery } from "@tanstack/react-query";

export function useAdminProperties() {
  return useQuery({
    queryKey: ["admin-properties"],
    queryFn: getAdminProperties,
  });
}