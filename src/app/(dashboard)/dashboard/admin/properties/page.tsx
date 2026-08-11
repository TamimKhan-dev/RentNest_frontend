"use client";

import {
  Home,
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
import Image from "next/image";
import { useAdminProperties } from "@/hooks/useAdminProperties";
import { AdminProperties } from "@/types/admin";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const availabilityStyles: Record<"Available" | "UnAvailable", string> = {
  Available: "bg-[#d7f5e9] text-[#006c49]",
  UnAvailable: "bg-[#eff4ff] text-[#515f74]",
};

export default function AdminAllPropertiesPage() {
  const { data: properties = [], isLoading, isError } = useAdminProperties();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
            All Properties
          </h1>
          <p className="text-sm text-[#515f74]">
            View and manage all rental properties listed on the platform.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5eeff] px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#d7f5e9] flex items-center justify-center shrink-0">
            <Home size={16} className="text-[#006c49]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8]">
              Total Properties
            </p>
            <p className="text-xl font-bold text-[#0b1c30]">
              {properties.length}
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
            placeholder="Search properties by title or location..."
            className="pl-9 h-auto py-2.5 rounded-lg border-[#e5eeff] bg-[#f8f9ff]"
          />
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Select defaultValue="all">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-38">
              <SelectValue placeholder="Category: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Category: All</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-38">
              <SelectValue placeholder="Availability: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Availability: All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
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
      <div className="bg-white border border-[#e5eeff] overflow-x-auto max-h-122">
        {isLoading && (
          <p className="text-sm text-[#515f74] p-4 flex gap-2 items-center">
            <Spinner /> Loading properties...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500 p-4">
            Failed to load properties. Please try again.
          </p>
        )}

        {!isLoading && !isError && properties.length === 0 && (
          <p className="text-sm text-[#515f74] p-4">No properties found!.</p>
        )}
        {!isLoading && !isError && properties.length > 0 && (
          <table className="w-full min-w-205 text-sm">
            <thead>
              <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
                <th className="text-left font-semibold px-4 py-3">Property</th>
                <th className="text-left font-semibold px-4 py-3">Location</th>
                <th className="text-left font-semibold px-4 py-3">Category</th>
                <th className="text-left font-semibold px-4 py-3">
                  Monthly Rent
                </th>
                <th className="text-left font-semibold px-4 py-3">
                  Availability
                </th>
                <th className="text-left font-semibold px-4 py-3">Listed On</th>
                <th className="text-left font-semibold px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property: AdminProperties) => (
                <tr
                  key={property.id}
                  className="border-t border-[#e5eeff] hover:bg-[#f8f9ff] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          property.image ||
                          "https://i.ibb.co.com/QFWY3SYV/no-image.webp"
                        }
                        alt={property.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                        width={100}
                        height={100}
                      />
                      <span className="font-semibold text-[#1d4ed8] whitespace-nowrap">
                        {property.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                    {property.location}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-[#eff4ff] text-[#0b1c30] text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                      {property.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#0b1c30] whitespace-nowrap">
                    ${property.price}\mon
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                        availabilityStyles[property.isAvailable ? "Available" : "UnAvailable"]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          property.isAvailable ? "bg-[#006c49]" : "bg-[#94a3b8]"
                        }`}
                      />
                      {property.isAvailable ? "Available" : "UnAvailable"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#1d4ed8] whitespace-nowrap">
                    {new Date(property.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-auto px-4 py-1.5 rounded-lg border-[#bbcabf] text-[#0b1c30] whitespace-nowrap cursor-pointer"
                      onClick={() => toast.warning("Feature coming soon")}
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
          <span className="font-semibold text-[#0b1c30]">50</span> properties
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
