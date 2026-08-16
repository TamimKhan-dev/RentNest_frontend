"use client";

import { useEffect, useState } from "react";
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
  Wifi,
  ParkingSquare,
  UtensilsCrossed,
  Snowflake,
  DoorOpen,
  WashingMachine,
  ShieldCheck,
  PawPrint,
  Trees,
  ArrowUpDown,
  LucideIcon,
} from "lucide-react";
import { usePublicProperties } from "@/hooks/usePublicProperties";
import { PublicProperty } from "@/types/publicTypes";
import { useCategories } from "@/hooks/useCategories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PropertyCardSkeleton from "../_components/Properties/propertyCardSkeleton";

const amenitiesList: { label: string; icon: LucideIcon }[] = [
  { label: "Wi-Fi", icon: Wifi },
  { label: "Parking", icon: ParkingSquare },
  { label: "Kitchen", icon: UtensilsCrossed },
  { label: "AC", icon: Snowflake },
  { label: "Balcony", icon: DoorOpen },
  { label: "Laundry", icon: WashingMachine },
  { label: "Security", icon: ShieldCheck },
  { label: "Pets", icon: PawPrint },
  { label: "Garden", icon: Trees },
  { label: "Elevator", icon: ArrowUpDown },
];

export default function ExploreProperties() {
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [debouncedLocation, setDebouncedLocation] = useState("");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState("");
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const LIMIT = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLocation(location);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 800);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  const { data: categories = [] } = useCategories();
  const { data, isLoading, isError, error } = usePublicProperties({
    page,
    limit: LIMIT,
    type: propertyType,
    location: debouncedLocation,
    amenities: selectedAmenities.join(","),
    minPrice: debouncedMinPrice ? Number(debouncedMinPrice) : undefined,
    maxPrice: debouncedMaxPrice ? Number(debouncedMaxPrice) : undefined,
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );

    setPage(1);
  };

  const properties: PublicProperty[] = data?.properties ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  return (
    <section className="w-full min-h-[93vh] bg-[#f8f9ff] px-4 md:px-12 py-10">
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-9 h-auto py-2.5 rounded-full border-[#bbcabf] bg-white"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 bg-white border border-[#bbcabf] rounded-full px-4 py-2.5 text-sm text-[#0b1c30] hover:bg-[#eff4ff] transition-colors whitespace-nowrap cursor-pointer">
                  <Home size={15} className="text-[#515f74]" />
                  {propertyType || "All"}
                  <ChevronDown size={14} className="text-[#515f74]" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setPropertyType("")}
                  className="cursor-pointer"
                >
                  All
                </DropdownMenuItem>

                {categories?.map((category: { id: number; name: string }) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => setPropertyType(category.name)}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 bg-white border border-[#bbcabf] rounded-full px-4 py-2.5 text-sm text-[#0b1c30] hover:bg-[#eff4ff] transition-colors whitespace-nowrap cursor-pointer">
                  <Tag size={15} className="text-[#515f74] cursor-pointer" />
                  {minPrice || maxPrice
                    ? `$${minPrice || "0"} - $${maxPrice || "∞"}`
                    : "Price Range"}
                  <ChevronDown size={14} className="text-[#515f74]" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64 p-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm">Minimum Price</label>
                    <Input
                      type="number"
                      placeholder="Min price"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm">Maximum Price</label>
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                      }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="text-sm text-red-500 hover:underline cursor-pointer"
                  >
                    Clear Price
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 bg-white border border-[#bbcabf] rounded-full px-4 py-2.5 text-sm text-[#0b1c30] hover:bg-[#eff4ff] transition-colors whitespace-nowrap cursor-pointer">
                  <SlidersHorizontal size={15} className="text-[#515f74]" />
                  More Filters
                  <ChevronDown size={14} className="text-[#515f74]" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4">
                <h3 className="font-semibold text-sm mb-4">Amenities</h3>

                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map(({ label, icon: Icon }) => (
                    <label
                      key={label}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedAmenities.includes(label)}
                        onCheckedChange={() => toggleAmenity(label)}
                        className="cursor-pointer"
                      />

                      <Icon size={15} className="text-[#515f74]" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                {selectedAmenities.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedAmenities([]);
                      setPage(1);
                    }}
                    className="mt-4 text-sm text-red-500 hover:underline cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </PopoverContent>
            </Popover>

            <div className="ml-auto flex items-center gap-2 text-sm text-[#515f74]">
              Sort by:
              <button className="flex items-center gap-1 font-semibold text-[#0b1c30]">
                Newest
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? <PropertyCardSkeleton /> : isError ? <div>Error: {(error as Error).message}</div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#515f74] hover:bg-[#eff4ff] transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
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

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
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
