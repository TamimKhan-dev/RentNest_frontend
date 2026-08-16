"use client"

import { Heart, Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePublicProperties } from "@/hooks/usePublicProperties";
import { PublicProperty } from "@/types/publicTypes";
import Image from "next/image";
import PropertyCardSkeleton from "../Properties/propertyCardSkeleton";

function PropertyCard({ property }: { property: PublicProperty }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden">
      <div className="relative h-44">
        <Image
          src={property.image ?? "https://i.ibb.co.com/QFWY3SYV/no-image.webp"}
          alt={property.title}
          className="w-full h-full object-contain"
          width={500}
          height={500}
        />
        <span className="absolute top-3 left-3 bg-[#006c49] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
          Verified
        </span>
        <button
          aria-label="Save property"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-[#0b1c30] hover:text-[#ba1a1a] transition-colors cursor-pointer"
        >
          <Heart size={15} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm text-[#0b1c30]">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="fill-[#006c49] text-[#006c49]" />
            <span className="text-xs font-medium text-[#0b1c30]">
              4.8
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#515f74] mb-4">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm space-x-3">
            <span className="font-bold text-[#0b1c30]">${property.price}\mon</span>
            <span className="text-[#515f74]">{new Date(property.createdAt).toLocaleDateString("en-US", { 
              month: "short",
              day: "2-digit",
              year: "numeric"
            })}</span>
          </p>
          <Link href={`/properties/${property.id}`}>
            <Button
            size="sm"
            className="bg-[#0b1c30] hover:bg-[#0b1c30]/90 text-white text-xs h-auto px-4 py-2 rounded-lg cursor-pointer"
          >
            Details
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProperties() {
  const {data, isLoading } = usePublicProperties({
    limit: 6,
  });

  const properties = data?.properties ?? [];

  return (
    <section className="w-full px-4 md:px-12 py-16 mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-2">
              Featured Properties
            </h2>
            <p className="text-sm text-[#515f74] max-w-md">
              Explore our curated selection of high-end rentals, each
              offering a unique blend of style and comfort.
            </p>
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-1 text-sm font-semibold text-[#006c49] hover:underline whitespace-nowrap"
          >
            View all properties
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { isLoading ? <PropertyCardSkeleton cardNumber={6} /> : properties.map((property: PublicProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}