import { Button } from "@/components/ui/button";
import { PublicProperty } from "@/types/publicTypes";
import { Star, MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({
  property,
}: {
  property: PublicProperty;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden">
      <div className="relative h-40">
        <Image
          src={property.image ?? "https://i.ibb.co.com/QFWY3SYV/no-image.webp"}
          alt={property.title}
          className="w-full h-full object-contain border-b-2 border-gray-300"
          width={400}
          height={400}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm text-[#0b1c30] max-w-50 truncate">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="fill-[#006c49] text-[#006c49]" />
            <span className="text-xs font-medium text-[#0b1c30]">4.3</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#515f74] mb-3">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#515f74] mb-4">
          <span className="flex items-center gap-1">
            <BedDouble size={13} /> 2
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} /> 1
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={13} /> 500
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-bold text-[#006c49]">${property.price}</span>
            <span className="text-[#515f74]"> /month</span>
          </p>
          <Link href={`/properties/${property.id}`}>
            <Button
              size="sm"
              className="bg-[#0b1c30] hover:bg-[#0b1c30]/90 text-white text-xs h-auto px-4 py-2 rounded-lg cursor-pointer"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
