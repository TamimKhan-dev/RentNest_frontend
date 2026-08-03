"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type DeletePropertyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: number | null;
  propertyName?: string;
};

export default function DeletePropertyDialog({
  open,
  onOpenChange,
  propertyId,
  propertyName,
}: DeletePropertyDialogProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteProperty, isPending } = useMutation({
    mutationFn: async () => {
      if (propertyId === null) {
        throw new Error("No property selected");
      }

      const res = await fetch(`/api/landlord/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.message || "Failed to delete property");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landlordProperties"] });
      toast.success("Property deleted successfully");
      onOpenChange(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this property?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            {propertyName ? <strong>{propertyName}</strong> : "this property"}?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            onClick={() => deleteProperty()}
            disabled={isPending}
            className="bg-[#ba1a1a] hover:bg-[#ba1a1a]/90 text-white"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin mr-1.5" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}