import {
  Wifi,
  ParkingSquare,
  DoorOpen,
  UtensilsCrossed,
  Snowflake,
  ShieldCheck,
  PawPrint,
  WashingMachine,
} from "lucide-react";

const amenities = [
  { label: "WiFi", icon: Wifi },
  { label: "Parking", icon: ParkingSquare },
  { label: "Balcony", icon: DoorOpen },
  { label: "Kitchen", icon: UtensilsCrossed },
  { label: "AC", icon: Snowflake },
  { label: "Security", icon: ShieldCheck },
  { label: "Pet Friendly", icon: PawPrint },
  { label: "Laundry", icon: WashingMachine },
];

export default function Amenities() {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] p-6">
      <h2 className="font-bold text-lg text-[#0b1c30] mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {amenities.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 bg-[#eff4ff] rounded-lg px-3 py-2.5 text-sm text-[#0b1c30]"
          >
            <Icon size={16} className="text-[#006c49]" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
