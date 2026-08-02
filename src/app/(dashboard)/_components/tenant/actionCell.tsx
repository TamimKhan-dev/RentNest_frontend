import { Button } from "@/components/ui/button";
import { Status } from "../../dashboard/tenant/page";
import Link from "next/link";



export default function ActionCell({ status, rentalId }: { status: Status, rentalId: number }) {
  switch (status) {
      case "APPROVED":
        return (
          <Link href={`/dashboard/tenant/requests/${rentalId}/pay`} className="bg-[#006c49] hover:bg-[#006c49]/90 text-white text-xs h-auto px-4 py-2 rounded-lg whitespace-nowrap">
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
            variant="outline"
            className="text-xs h-auto px-4 py-2 rounded-lg border-[#bbcabf] text-[#0b1c30] whitespace-nowrap"
          >
            Leave Review
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
          <Button
            variant="outline"
            className="text-xs h-auto px-4 py-2 rounded-lg border-[#bbcabf] text-[#0b1c30] whitespace-nowrap"
          >
            View Review
          </Button>
        );
    }
}
