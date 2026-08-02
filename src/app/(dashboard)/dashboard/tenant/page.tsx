"use client";

import { useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  Home,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OverviewTable from "../../_components/tenant/overviewTable";
import { useQuery } from "@tanstack/react-query";
import SpinnerDefault from "@/app/loading";
import { getRentalRequestStats } from "@/utils/utils";

export type Status =
  | "APPROVED"
  | "PENDING"
  | "ACTIVE"
  | "REJECTED"
  | "COMPLETED";

const fetchRentalRequests = async () => {
  const res = await fetch(`/api/rentals`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function OverviewRentalRequests() {
  const [page, setPage] = useState(1);
  const totalPages = 2;
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["rentalRequests"],
    queryFn: fetchRentalRequests,
  });

  if (isLoading) return <SpinnerDefault />;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  const stats = getRentalRequestStats(data.data);

  const statsCards = [
    {
      label: "Total Requests",
      value: stats.totalRentalRequests,
      icon: ClipboardList,
      bg: "bg-[#e0e7ff]",
      iconColor: "text-[#4338ca]",
    },
    {
      label: "Pending",
      value: stats.pendingRentalRequests,
      icon: Clock,
      bg: "bg-[#fef3c7]",
      iconColor: "text-[#b45309]",
    },
    {
      label: "Approved",
      value: stats.approvedRentalRequests,
      icon: CheckCircle2,
      bg: "bg-[#ede9fe]",
      iconColor: "text-[#6d28d9]",
    },
    {
      label: "Active Rentals",
      value: stats.activeRentals,
      icon: Home,
      bg: "bg-[#d7f5e9]",
      iconColor: "text-[#006c49]",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
          Overview &amp; Rental Requests
        </h1>
        <p className="text-sm text-[#515f74]">
          Track your rental requests and complete the next required action.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map(({ label, value, icon: Icon, bg, iconColor }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-[#e5eeff] p-4 flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 shrink-0 rounded-lg ${bg} flex items-center justify-center`}
            >
              <Icon size={18} className={iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] truncate">
                {label}
              </p>
              <p className="text-xl font-bold text-[#0b1c30]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-t-2xl border border-b-0 border-[#e5eeff] p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />
          <Input
            placeholder="Search properties or locations..."
            className="pl-9 h-auto py-2.5 rounded-lg border-[#e5eeff] bg-[#f8f9ff]"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#515f74] whitespace-nowrap hidden sm:inline">
            Filter by:
          </span>
          <Select defaultValue="all">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <OverviewTable data={data.data} />

      {/* Footer: count + pagination */}
      <div className="bg-white rounded-b-2xl border border-t-0 border-[#e5eeff] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#515f74]">Showing 5 of 12 requests</p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          {[1, 2].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium border transition-colors ${
                page === n
                  ? "bg-[#d7f5e9] border-[#006c49] text-[#006c49]"
                  : "border-[#e5eeff] text-[#0b1c30] hover:bg-[#f8f9ff]"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
