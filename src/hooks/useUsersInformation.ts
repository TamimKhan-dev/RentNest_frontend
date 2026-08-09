import { getUsersInformation } from "@/lib/api/adminData";
import { QuerySearchParams } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";

export function useUsersInformation (params: QuerySearchParams) {
    return useQuery({
        queryKey: ["users-information", params],
        queryFn: () => getUsersInformation(params),
    });
};