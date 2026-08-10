import { banUnbanUser } from "@/lib/api/adminData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useIsBannedUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, isBanned }: { userId: number | null; isBanned: boolean }) =>
      banUnbanUser(userId, isBanned),
    onSuccess: (_, variables) => {
      toast.success(
        `User ${variables.isBanned ? "banned" : "unbaned"} successfully`,
      );
      queryClient.invalidateQueries({ queryKey: ["users-information"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
