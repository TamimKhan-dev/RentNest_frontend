import { getSingleProperty } from "@/lib/api/public";
import { useQuery } from "@tanstack/react-query";


export function useProperty(id: number) {
    return useQuery({
        queryKey: ["property", id],
        queryFn: () => getSingleProperty(id),
    });
};