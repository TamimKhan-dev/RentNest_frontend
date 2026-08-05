import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProperty } from "@/lib/api/properties";
import { UpdatePropertyPayload } from "@/types/property";

type IUpdateProperty = {
  payload: UpdatePropertyPayload;
  id: number;
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({payload, id}: IUpdateProperty) => updateProperty(payload, id),
    onSuccess: () => {
      toast.success("Property updated successfully");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}