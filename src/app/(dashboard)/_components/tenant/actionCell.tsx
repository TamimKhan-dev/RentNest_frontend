import { Button } from "@/components/ui/button";
import { Status } from "../../dashboard/tenant/page";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import LeaveReviewModal from "./tenantModal/leaveReviewModal";

export default function ActionCell({
  status,
  rentalId,
  propertyId,
}: {
  status: Status;
  rentalId: number;
  propertyId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: markAsCompleted, isPending: isCompleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/rentals/complete/${rentalId}`, {
        method: "PATCH",
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "Failed to mark rental as completed");
      }

      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentalRequests"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  switch (status) {
    case "APPROVED":
      return (
        <Link
          href={`/dashboard/tenant/requests/${rentalId}/pay`}
          className="bg-[#006c49] hover:bg-[#006c49]/90 text-white text-xs h-auto px-4 py-2 rounded-lg whitespace-nowrap"
        >
          Pay Now
        </Link>
      );
    case "PENDING":
      return (
        <Button
          disabled
          variant="outline"
          className="text-xs h-auto px-4 py-2 rounded-lg text-[#94a3b8] border-[#e5eeff] whitespace-nowrap"
        >
          Waiting for Approval
        </Button>
      );
    case "ACTIVE":
      return (
        <Button
          onClick={() => markAsCompleted()}
          disabled={isCompleting}
          variant="outline"
          className="text-xs h-auto px-4 py-2 rounded-lg bg-[#e8f0fe] text-[#1a56db] border border-[#c3d9fb] hover:bg-[#d9e6fc] whitespace-nowrap font-medium"
        >
          {isCompleting ? (
            <>
              <Loader2 size={13} className="animate-spin mr-1" />
              Completing...
            </>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      );
    case "REJECTED":
      return (
        <span className="text-xs font-medium text-[#ba1a1a] whitespace-nowrap">
          Request Rejected
        </span>
      );
    case "COMPLETED":
      return (
        <>
          <Button
          onClick={() =>  setIsModalOpen(true)}
          variant="outline"
          className="text-xs h-auto px-4 py-2 rounded-lg border-[#bbcabf] text-[#0b1c30] whitespace-nowrap cursor-pointer"
        >
          Leave Review
        </Button>

        <LeaveReviewModal open={isModalOpen} onOpenChange={setIsModalOpen} propertyId={propertyId}/>
        </>
      );
  }
}
