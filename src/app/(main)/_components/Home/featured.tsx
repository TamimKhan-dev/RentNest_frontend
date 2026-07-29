import { Heart, Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Property = {
  name: string;
  location: string;
  price: string;
  period: string;
  rating: number;
  badge: string;
  image: string;
};

const properties: Property[] = [
  {
    name: "The Emerald Suite",
    location: "Chelsea, Manhattan",
    price: "$4,200",
    period: "/month",
    rating: 4.9,
    badge: "Verified",
    image: "https://picsum.photos/seed/emerald-suite/500/380",
  },
  {
    name: "Villa Mariposa",
    location: "Malibu, California",
    price: "$6,800",
    period: "/month",
    rating: 4.8,
    badge: "Featured",
    image: "https://picsum.photos/seed/villa-mariposa/500/380",
  },
  {
    name: "Skyline Loft",
    location: "Shoreditch, London",
    price: "£2,900",
    period: "/month",
    rating: 5.0,
    badge: "New",
    image: "https://picsum.photos/seed/skyline-loft/500/380",
  },
  {
    name: "Nordic Retreat",
    location: "Oslo, Norway",
    price: "€1,850",
    period: "/month",
    rating: 4.7,
    badge: "Verified",
    image: "https://picsum.photos/seed/nordic-retreat/500/380",
  },
  {
    name: "Zen Penthouse",
    location: "Ginza, Tokyo",
    price: "¥850K",
    period: "/month",
    rating: 4.9,
    badge: "Featured",
    image: "https://picsum.photos/seed/zen-penthouse/500/380",
  },
  {
    name: "Canal House",
    location: "Jordaan, Amsterdam",
    price: "€3,400",
    period: "/month",
    rating: 4.6,
    badge: "Verified",
    image: "https://picsum.photos/seed/canal-house/500/380",
  },
];

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden">
      <div className="relative h-44">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#006c49] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
          {property.badge}
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
            {property.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="fill-[#006c49] text-[#006c49]" />
            <span className="text-xs font-medium text-[#0b1c30]">
              {property.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#515f74] mb-4">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-bold text-[#0b1c30]">{property.price}</span>
            <span className="text-[#515f74]">{property.period}</span>
          </p>
          <Button
            size="sm"
            className="bg-[#0b1c30] hover:bg-[#0b1c30]/90 text-white text-xs h-auto px-4 py-2 rounded-lg cursor-pointer"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProperties() {
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
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-semibold text-[#006c49] hover:underline whitespace-nowrap"
          >
            View all 2,500 properties
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.name} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}