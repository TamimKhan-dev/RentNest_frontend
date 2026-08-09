import { getUsersInformation } from "@/lib/api/userInformation";
import { useQuery } from "@tanstack/react-query";

export function useUsersInformation () {
    return useQuery({
        queryKey: ["users-information"],
        queryFn: getUsersInformation,
    });
};