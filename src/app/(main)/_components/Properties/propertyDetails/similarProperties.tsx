import { MapPin, Star } from "lucide-react";

type SimilarProperty = {
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
};

const similarProperties: SimilarProperty[] = [
  {
    name: "Modern Glass Studio",
    location: "Gulshan, Dhaka",
    price: "$420",
    rating: 4.7,
    image: "https://picsum.photos/seed/modern-glass-studio/500/380",
  },
  {
    name: "Industrial Loft Space",
    location: "Banani, Dhaka",
    price: "$380",
    rating: 4.9,
    image: "https://picsum.photos/seed/industrial-loft-space/500/380",
  },
  {
    name: "Scandi Minimalist Studio",
    location: "Uttara, Dhaka",
    price: "$290",
    rating: 4.6,
    image: "https://picsum.photos/seed/scandi-minimalist-studio/500/380",
  },
  {
    name: "Executive Smart Home",
    location: "Banani, Dhaka",
    price: "$550",
    rating: 4.8,
    image: "https://picsum.photos/seed/executive-smart-home/500/380",
  },
];

export default function SimilarProperties() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-[#0b1c30] mb-5">
        Similar Properties
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {similarProperties.map((sp) => (
          <div
            key={sp.name}
            className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden"
          >
            <div className="relative h-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sp.image}
                alt={sp.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white/95 text-xs font-semibold text-[#0b1c30] px-2 py-1 rounded-full">
                <Star size={11} className="fill-[#f5b400] text-[#f5b400]" />
                {sp.rating}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm text-[#0b1c30] mb-1">
                {sp.name}
              </h3>
              <p className="flex items-center gap-1 text-xs text-[#515f74] mb-3">
                <MapPin size={11} />
                {sp.location}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  <span className="font-bold text-[#006c49]">{sp.price}</span>
                  <span className="text-[#515f74]"> /mo</span>
                </p>
                <a
                  href="#"
                  className="text-xs font-semibold text-[#006c49] hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
