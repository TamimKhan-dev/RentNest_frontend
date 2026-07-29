import { Button } from "@/components/ui/button";
import { Building, Star, Headset } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    icon: Building,
    value: "2,500+",
    label: "Properties",
    bg: "bg-[#d7f5e9]",
    iconColor: "text-[#006c49]",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Satisfaction",
    bg: "bg-[#fef3c7]",
    iconColor: "text-[#b45309]",
  },
  {
    icon: Headset,
    value: "24/7",
    label: "Support",
    bg: "bg-[#dbeafe]",
    iconColor: "text-[#1d4ed8]",
  },
];

export default function Hero() {
  return (
    <section className="w-full bg-white px-4 md:px-12 py-16 md:py-24 mb-11">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column — copy */}
        <div>
          <span className="inline-block bg-[#d7f5e9] text-[#006c49] text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
            Verified Rentals Only
          </span>

          <h1 className="font-bold text-4xl md:text-5xl leading-[1.1] text-[#0b1c30] mb-6">
            Find Your Next Home
            <br />
            <span className="text-[#10b981]">with Confidence</span>
          </h1>

          <p className="text-[#515f74] text-base md:text-lg leading-relaxed max-w-md mb-8">
            Experience the pinnacle of rental hospitality. Every property on our
            platform is hand-vetted for quality, safety, and comfort, ensuring
            your transition is seamless and stress-free.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button className="bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold px-6 py-6 h-auto rounded-lg cursor-pointer">
              Browse Properties
            </Button>
            <Button
              variant="outline"
              className="border-[#bbcabf] text-[#0b1c30] font-semibold px-6 py-6 h-auto rounded-lg hover:bg-[#f8f9ff] cursor-pointer"
            >
              Become a Landlord
            </Button>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-[#e5eeff]">
            <Image
              src="https://i.ibb.co.com/ksvcb7r4/Hero-Img.png"
              alt="Dashboard preview"
              className="w-full h-auto object-cover"
              width={500}
              height={500}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, value, label, bg, iconColor }) => (
              <div
                key={label}
                className={`flex flex-col items-start justify-center gap-1.5 h-20 rounded-xl ${bg} px-4`}
              >
                <Icon className={iconColor} size={20} />
                <div className="leading-tight">
                  <p className="font-bold text-sm text-[#0b1c30]">{value}</p>
                  <p className="text-xs text-[#515f74]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
