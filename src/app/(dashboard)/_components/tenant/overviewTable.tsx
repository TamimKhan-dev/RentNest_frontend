import ActionCell from "./actionCell";
import { Status } from "../../dashboard/tenant/page";
import { Spinner } from "@/components/ui/spinner";

type RentalRequest = {
  id: number;
  propertyId: number;
  status: Status;
  tenantId: number;
  property: {
    id: number;
    title: string;
    description: string;
    location: string;
    price: number;
    isAvailable: boolean;
    amenities: string[];
    categoryId: number;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  hasReviewed: boolean;
};

const statusStyles: Record<Status, string> = {
  APPROVED: "bg-[#e0e7ff] text-[#4338ca]",
  PENDING: "bg-[#fef3c7] text-[#b45309]",
  ACTIVE: "bg-[#d7f5e9] text-[#006c49]",
  REJECTED: "bg-[#ffdad6] text-[#ba1a1a]",
  COMPLETED: "bg-[#dbeafe] text-[#1d4ed8]",
};

export default function OverviewTable({
  data,
  isError,
  isLoading,
}: {
  data: RentalRequest[];
  isError: boolean;
  isLoading: boolean;
}) {
  return (
    <div className="bg-white border border-[#e5eeff] overflow-auto max-h-115">
      {isLoading && (
        <p className="text-sm text-[#515f74] p-4 flex gap-2 items-center">
          <Spinner /> Loading rental-requests...
        </p>
      )}

      {isError && (
        <p className="text-sm text-red-500 p-4">
          Failed to load rental-requests. Please try again.
        </p>
      )}

      {!isLoading && !isError && data.length === 0 && (
        <p className="text-sm text-[#515f74] p-4">No rental-requests found!.</p>
      )}
      {!isLoading && !isError && data.length > 0 && (
        <table className="w-full min-w-180 text-sm">
          <thead>
            <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
              <th className="text-left font-semibold px-4 py-3">Property</th>
              <th className="text-left font-semibold px-4 py-3">Location</th>
              <th className="text-left font-semibold px-4 py-3">
                Monthly Rent
              </th>
              <th className="text-left font-semibold px-4 py-3">
                Requested Date
              </th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-left font-semibold px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((req) => (
              <tr
                key={req.propertyId}
                className="border-t border-[#e5eeff] hover:bg-[#f8f9ff] transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#0b1c30] whitespace-nowrap">
                      {req.property.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                  {req.property.location}
                </td>
                <td className="px-4 py-3 font-semibold text-[#006c49] whitespace-nowrap">
                  ${req.property.price}\mon
                </td>
                <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                  {new Date(req.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusStyles[req.status]}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ActionCell
                    status={req.status}
                    rentalId={req.id}
                    propertyId={req.propertyId}
                    hasReviewed={req.hasReviewed}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
