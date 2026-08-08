"use client";

import {
  Inbox,
  Clock,
  CheckCircle2,
  KeyRound,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
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
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { useRentalRequestAction } from "@/hooks/useRentalRequestAction";
import { useRentalRequests } from "@/hooks/useRentalRequests";

const statusStyles: Record<Status, string> = {
  APPROVED: "bg-[#e0e7ff] text-[#4338ca]",
  PENDING: "bg-[#fef3c7] text-[#b45309]",
  ACTIVE: "bg-[#d7f5e9] text-[#006c49]",
  REJECTED: "bg-[#ffdad6] text-[#ba1a1a]",
  COMPLETED: "bg-[#dbeafe] text-[#1d4ed8]",
};

export default function RentalRequestsPage() {
  const { data: requests = [], isLoading, isError } = useRentalRequests();

  const activeRequests = requests.filter((request) => request.status === "ACTIVE").length;
  const pendingRequests = requests.filter((request) => request.status === "PENDING").length;
  const approvedRequests = requests.filter((request) => request.status === "APPROVED").length;

  const stats = [
    {
      label: "Total Requests",
      value: requests.length,
      change: "+12%",
      icon: Inbox,
      bg: "bg-[#dbeafe]",
      iconColor: "text-[#1d4ed8]",
      highlight: false,
    },
    {
      label: "Pending Review",
      value: pendingRequests,
      icon: Clock,
      bg: "bg-[#fef3c7]",
      iconColor: "text-[#b45309]",
      highlight: false,
    },
    {
      label: "Approved",
      value: approvedRequests,
      icon: CheckCircle2,
      bg: "bg-[#e0e7ff]",
      iconColor: "text-[#4338ca]",
      highlight: false,
    },
    {
      label: "Active Rentals",
      value: activeRequests,
      icon: KeyRound,
      highlight: true,
    },
  ];

  const { mutateAsync: rentalRequestAction } = useRentalRequestAction();

  const handleRentalRequestAction = async (action: string, id: number) => {
    await rentalRequestAction({ action, id });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
          Rental Requests
        </h1>
        <p className="text-sm text-[#515f74]">
          Review incoming booking requests and manage their status.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) =>
          stat.highlight ? (
            <div
              key={stat.label}
              className="bg-[#006c49] rounded-2xl p-4 flex flex-col justify-between"
            >
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center mb-6">
                <stat.icon size={17} className="text-white" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/80 mb-1">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          ) : (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-[#e5eeff] p-4 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}
                >
                  <stat.icon size={17} className={stat.iconColor} />
                </div>
                {stat.change && (
                  <span className="text-[11px] font-semibold text-[#006c49]">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-[#0b1c30]">{stat.value}</p>
            </div>
          ),
        )}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-t-2xl border border-b-0 border-[#e5eeff] p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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

        <div className="flex gap-2 shrink-0">
          <Select defaultValue="all">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-32.5">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm gap-1.5 text-[#0b1c30]"
          >
            <ArrowUpDown size={14} />
            Sort: Newest First
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5eeff] max-h-105 overflow-auto">
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

        {!isLoading && !isError && requests.length === 0 && (
          <p className="text-sm text-[#515f74] p-4">
            You don&apos;t have any rental-requests yet.
          </p>
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
                <th className="text-left font-semibold px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
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
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
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
                  <td className="px-4 py-3 font-semibold text-[#006c49] whitespace-nowrap">
                    ${req.property.price}\mon
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[req.status]}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() =>
                          handleRentalRequestAction("rejected", req.id)
                        }
                        size="sm"
                        variant="outline"
                        disabled={req.status !== "PENDING"}
                        className="text-xs h-auto px-3 py-1.5 rounded-lg border-[#ba1a1a]/30 text-[#ba1a1a] hover:bg-[#ffdad6] whitespace-nowrap cursor-pointer"
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={() =>
                          handleRentalRequestAction("approved", req.id)
                        }
                        size="sm"
                        disabled={req.status !== "PENDING"}
                        className="text-xs h-auto px-3 py-1.5 rounded-lg bg-[#006c49] hover:bg-[#006c49]/90 text-white whitespace-nowrap cursor-pointer"
                      >
                        Approve
                      </Button>
                    </div>
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
          Showing{" "}
          <span className="font-semibold text-[#0b1c30]">
            {requests.length}
          </span>{" "}
          requests
        </p>

        <div className="flex items-center gap-1.5">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#0b1c30] text-white transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
