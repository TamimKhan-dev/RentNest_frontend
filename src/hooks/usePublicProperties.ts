import { getAllPublicProperties } from "@/lib/api/public";
import { useQuery } from "@tanstack/react-query";


export function usePublicProperties() {
    return useQuery({
        queryKey: ["public-properties"],
        queryFn: getAllPublicProperties,
    });
};