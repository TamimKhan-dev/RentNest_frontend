import { Button } from "@/components/ui/button";
import { Star, MapPin, BedDouble, Bath, Ruler } from "lucide-react";

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

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden">
      <div className="relative h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        {property.badge && (
          <span
            className={`absolute top-3 left-3 ${property.badgeColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full`}
          >
            {property.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm text-[#0b1c30]">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="fill-[#006c49] text-[#006c49]" />
            <span className="text-xs font-medium text-[#0b1c30]">
              {property.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#515f74] mb-3">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#515f74] mb-4">
          <span className="flex items-center gap-1">
            <BedDouble size={13} /> {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} /> {property.baths}
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={13} /> {property.sqft}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-bold text-[#006c49]">{property.price}</span>
            <span className="text-[#515f74]"> /month</span>
          </p>
          <Button
            size="sm"
            className="bg-[#0b1c30] hover:bg-[#0b1c30]/90 text-white text-xs h-auto px-4 py-2 rounded-lg cursor-pointer"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
