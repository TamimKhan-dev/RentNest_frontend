import { getCategories } from "@/lib/api/public";
import { useQuery } from "@tanstack/react-query";


export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
};