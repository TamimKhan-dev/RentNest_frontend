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

type Property = {
  name: string;
  location: string;
  price: string;
  rating: number;
  badge: string | null;
  badgeColor: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
};

const properties: Property[] = [
  {
    name: "Nordic Minimalist Loft",
    location: "Østerbro, Copenhagen",
    price: "$1,250",
    rating: 4.9,
    badge: "Verified",
    badgeColor: "bg-[#006c49]",
    beds: 2,
    baths: 1,
    sqft: 850,
    image: "https://picsum.photos/seed/nordic-loft/500/380",
  },
  {
    name: "Skyline Terrace Suite",
    location: "Marina Bay, Singapore",
    price: "$2,400",
    rating: 4.8,
    badge: null,
    badgeColor: "",
    beds: 1,
    baths: 1,
    sqft: 820,
    image: "https://picsum.photos/seed/skyline-terrace/500/380",
  },
  {
    name: "Heritage Brick Townhouse",
    location: "Notting Hill, London",
    price: "$1,850",
    rating: 4.7,
    badge: "Hot Deal",
    badgeColor: "bg-[#ba1a1a]",
    beds: 3,
    baths: 2,
    sqft: 1200,
    image: "https://picsum.photos/seed/brick-townhouse/500/380",
  },
  {
    name: "Coastal Beachfront Villa",
    location: "Malibu, California",
    price: "$2,200",
    rating: 5.0,
    badge: null,
    badgeColor: "",
    beds: 2,
    baths: 2,
    sqft: 980,
    image: "https://picsum.photos/seed/beachfront-villa/500/380",
  },
  {
    name: "Industrial Berlin Loft",
    location: "Kreuzberg, Berlin",
    price: "$950",
    rating: 4.8,
    badge: "New Listing",
    badgeColor: "bg-[#1d4ed8]",
    beds: 1,
    baths: 1,
    sqft: 710,
    image: "https://picsum.photos/seed/berlin-loft/500/380",
  },
  {
    name: "Zen Garden Studio",
    location: "Nakagyo Ward, Kyoto",
    price: "$800",
    rating: 4.9,
    badge: null,
    badgeColor: "",
    beds: 1,
    baths: 1,
    sqft: 450,
    image: "https://picsum.photos/seed/zen-garden/500/380",
  },
  {
    name: "Harbor View High-rise",
    location: "Pyrmont, Sydney",
    price: "$1,900",
    rating: 4.9,
    badge: "Top Rated",
    badgeColor: "bg-[#0b1c30]",
    beds: 2,
    baths: 2,
    sqft: 920,
    image: "https://picsum.photos/seed/harbor-view/500/380",
  },
  {
    name: "Vibrant Condesa Studio",
    location: "Condesa, CDMX",
    price: "$650",
    rating: 4.5,
    badge: null,
    badgeColor: "",
    beds: 1,
    baths: 1,
    sqft: 400,
    image: "https://picsum.photos/seed/condesa-studio/500/380",
  },
  {
    name: "Alpine Glass Cabin",
    location: "Zermatt, Switzerland",
    price: "$2,100",
    rating: 5.0,
    badge: null,
    badgeColor: "",
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "https://picsum.photos/seed/alpine-cabin/500/380",
  },
  {
    name: "Eiffel View Residence",
    location: "7th Arr., Paris",
    price: "$1,600",
    rating: 4.8,
    badge: null,
    badgeColor: "",
    beds: 1,
    baths: 1,
    sqft: 580,
    image: "https://picsum.photos/seed/eiffel-view/500/380",
  },
  {
    name: "Stanley Park Condo",
    location: "West End, Vancouver",
    price: "$1,450",
    rating: 4.7,
    badge: "Just Listed",
    badgeColor: "bg-[#0b1c30]",
    beds: 2,
    baths: 1,
    sqft: 810,
    image: "https://picsum.photos/seed/stanley-park/500/380",
  },
  {
    name: "East Austin Loft",
    location: "East Side, Austin",
    price: "$1,100",
    rating: 4.6,
    badge: null,
    badgeColor: "",
    beds: 1,
    baths: 1,
    sqft: 640,
    image: "https://picsum.photos/seed/alpine-cabin/500/380",
  },
];

const filters = [
  { label: "Price Range", icon: Tag },
  { label: "Property Type", icon: Home },
  { label: "More Filters", icon: SlidersHorizontal },
];

export default function ExploreProperties() {
  const [page, setPage] = useState(1);
  const totalPages = 12;

  return (
    <section className="w-full bg-[#f8f9ff] px-4 md:px-12 py-10">
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
            <PropertyCard key={property.name} property={property} />
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
    </section>
  );
}