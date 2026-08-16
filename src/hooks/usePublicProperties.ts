import { getAllPublicProperties } from "@/lib/api/public";
import { PropertyQueries } from "@/types/publicTypes";
import { useQuery } from "@tanstack/react-query";


export function usePublicProperties(params?: PropertyQueries) {
    return useQuery({
        queryKey: ["public-properties", params],
        queryFn: () => getAllPublicProperties(params),
    });
};