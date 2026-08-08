import { rentalRequestAction } from "@/lib/api/rentalRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRentalRequestAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({action, id}: {action: string; id: number}) => rentalRequestAction(action, id),
    onSuccess: (_, variables) => {
      toast.success(`Rental-request ${variables.action === 'approved' ? "Approved" : "Rejected"} successfully`);
      queryClient.invalidateQueries({ queryKey: ["rental-requests"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}