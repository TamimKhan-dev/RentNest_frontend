"use client";

import {
  ClipboardList,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "../../tenant/page";
import Image from "next/image";
import { useAdminRentalRequests } from "@/hooks/useAdminRentalRequests";
import { Spinner } from "@/components/ui/spinner";
import { AdminRentalRequest } from "@/types/admin";
import { toast } from "sonner";

const statusStyles: Record<Status, string> = {
  APPROVED: "bg-[#e0e7ff] text-[#4338ca]",
  PENDING: "bg-[#fef3c7] text-[#b45309]",
  ACTIVE: "bg-[#d7f5e9] text-[#006c49]",
  REJECTED: "bg-[#ffdad6] text-[#ba1a1a]",
  COMPLETED: "bg-[#dbeafe] text-[#1d4ed8]",
};

export default function AllRentalRequestsPage() {
  const { data: requests = [], isLoading, isError } = useAdminRentalRequests();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
            All Rental Requests
          </h1>
          <p className="text-sm text-[#515f74]">
            View and manage all rental requests submitted on the platform.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5eeff] px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#e0e7ff] flex items-center justify-center shrink-0">
            <ClipboardList size={16} className="text-[#4338ca]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8]">
              Total Requests
            </p>
            <p className="text-xl font-bold text-[#0b1c30]">
              {requests.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-t-2xl border border-b-0 border-[#e5eeff] p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />
          <Input
            placeholder="Search by tenant or property..."
            className="pl-9 h-auto py-2.5 rounded-lg border-[#e5eeff] bg-[#f8f9ff]"
          />
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Select defaultValue="all">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-38">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status: All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm gap-1.5 text-[#0b1c30]"
          >
            <SlidersHorizontal size={14} />
            More Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5eeff] overflow-x-auto">
        {isLoading && (
          <p className="text-sm text-[#515f74] p-4 flex gap-2 items-center">
            <Spinner /> Loading requests...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500 p-4">
            Failed to load requests. Please try again.
          </p>
        )}

        {!isLoading && !isError && requests.length === 0 && (
          <p className="text-sm text-[#515f74] p-4">No requests found!.</p>
        )}
        {!isLoading && !isError && requests.length > 0 && (
          <table className="w-full min-w-205 text-sm">
            <thead>
              <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
                <th className="text-left font-semibold px-4 py-3">Tenant</th>
                <th className="text-left font-semibold px-4 py-3">Property</th>
                <th className="text-left font-semibold px-4 py-3">
                  Monthly Rent
                </th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-left font-semibold px-4 py-3">
                  Requested On
                </th>
                <th className="text-left font-semibold px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req: AdminRentalRequest) => (
                <tr
                  key={req.id}
                  className="border-t border-[#e5eeff] hover:bg-[#f8f9ff] transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#0b1c30] whitespace-nowrap">
                      {req.tenant.name}
                    </p>
                    <p className="text-xs text-[#94a3b8] whitespace-nowrap">
                      {req.tenant.email}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Image
                          src={
                            req.property.image ||
                            "https://i.ibb.co.com/QFWY3SYV/no-image.webp"
                          }
                          alt={req.property.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                          width={100}
                          height={100}
                        />
                      
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1d4ed8] whitespace-nowrap">
                          {req.property.title}
                        </p>
                        <p className="text-xs text-[#94a3b8] whitespace-nowrap">
                          {req.property.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#0b1c30] whitespace-nowrap">
                    ${req.property.price.toLocaleString()}/mon
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[req.status]}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                    {new Date(req.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      onClick={() => toast.warning("Feature comming soon!")}
                      size="sm"
                      variant="outline"
                      className="text-xs h-auto px-4 py-1.5 rounded-lg border-[#bbcabf] text-[#0b1c30] whitespace-nowrap cursor-pointer"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer: count + pagination */}
      <div className="bg-white rounded-b-2xl border border-t-0 border-[#e5eeff] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#515f74]">
          Showing <span className="font-semibold text-[#0b1c30]">1-10</span> of{" "}
          <span className="font-semibold text-[#0b1c30]">128</span> requests
        </p>

        <div className="flex items-center gap-1.5">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium border transition-colors border-[#e5eeff] text-[#0b1c30] hover:bg-[#f8f9ff]`}
            >
              {n}
            </button>
          ))}
          <span className="text-[#515f74] text-xs px-0.5">…</span>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
