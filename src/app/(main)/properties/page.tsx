"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import PropertyCard from "../_components/Properties/propertyCard";
import {
  Search,
  Tag,
  Home,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePublicProperties } from "@/hooks/usePublicProperties";
import SpinnerDefault from "@/app/loading";
import { PublicProperty } from "@/types/publicTypes";

const filters = [
  { label: "Price Range", icon: Tag },
  { label: "Property Type", icon: Home },
  { label: "More Filters", icon: SlidersHorizontal },
];

export default function ExploreProperties() {
  const [page, setPage] = useState(1);
  const totalPages = 12;

  const {
    data: properties = [] as PublicProperty[],
    isLoading,
    isError,
    error,
  } = usePublicProperties();

  return (
    <section className="w-full min-h-[93vh] bg-[#f8f9ff] px-4 md:px-12 py-10">
      {isLoading ? (
        <SpinnerDefault />
      ) : isError ? (
        <div>Error: {(error as Error).message}</div>
      ) : (
        <div className="max-w-7xl mx-auto ">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
              Explore Properties
            </h1>
            <p className="text-sm text-[#515f74]">
              Find the perfect home from over 10,000+ verified listings
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="relative flex-1 min-w-55">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#515f74]"
              />
              <Input
                placeholder="Search destinations..."
                className="pl-9 h-auto py-2.5 rounded-full border-[#bbcabf] bg-white"
              />
            </div>

            {filters.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center gap-2 bg-white border border-[#bbcabf] rounded-full px-4 py-2.5 text-sm text-[#0b1c30] hover:bg-[#eff4ff] transition-colors whitespace-nowrap"
              >
                <Icon size={15} className="text-[#515f74]" />
                {label}
                <ChevronDown size={14} className="text-[#515f74]" />
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 text-sm text-[#515f74]">
              Sort by:
              <button className="flex items-center gap-1 font-semibold text-[#0b1c30]">
                Newest
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#515f74] hover:bg-[#eff4ff] transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === n
                    ? "bg-[#006c49] text-white"
                    : "text-[#0b1c30] hover:bg-[#eff4ff]"
                }`}
              >
                {n}
              </button>
            ))}

            <span className="text-[#515f74] text-sm px-1">…</span>

            <button
              onClick={() => setPage(totalPages)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                page === totalPages
                  ? "bg-[#006c49] text-white"
                  : "text-[#0b1c30] hover:bg-[#eff4ff]"
              }`}
            >
              {totalPages}
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#515f74] hover:bg-[#eff4ff] transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
