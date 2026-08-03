import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProperty, CreatePropertyPayload } from "@/lib/api/properties";

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePropertyPayload) => createProperty(payload),
    onSuccess: () => {
      toast.success("Property created successfully");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}