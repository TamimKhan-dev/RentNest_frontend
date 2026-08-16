import {
  Wifi,
  ParkingSquare,
  DoorOpen,
  UtensilsCrossed,
  Snowflake,
  ShieldCheck,
  PawPrint,
  WashingMachine,
  Trees,
  ArrowUpDown,
  LucideIcon,
} from "lucide-react";

const amenityIcons: Record<string, LucideIcon> = {
  "Wi-Fi": Wifi,
  WiFi: Wifi,
  Parking: ParkingSquare,
  Balcony: DoorOpen,
  Kitchen: UtensilsCrossed,
  AC: Snowflake,
  Security: ShieldCheck,
  Pets: PawPrint,
  "Pet Friendly": PawPrint,
  Laundry: WashingMachine,
  Garden: Trees,
  Elevator: ArrowUpDown,
};

export default function Amenities({ amenities }: { amenities: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] p-6">
      <h2 className="font-bold text-lg text-[#0b1c30] mb-4">
        Amenities
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity];

          return (
            <div
              key={amenity}
              className="flex items-center gap-2 bg-[#eff4ff] rounded-lg px-3 py-2.5 text-sm text-[#0b1c30]"
            >
              {Icon && <Icon size={16} className="text-[#006c49]" />}
              {amenity}
            </div>
          );
        })}
      </div>
    </div>
  );
}
