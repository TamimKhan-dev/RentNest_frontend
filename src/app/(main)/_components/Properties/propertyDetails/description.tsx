import { PublicProperty } from "@/types/publicTypes";


export default function Description({
  property,
}: {
  property: PublicProperty;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] p-6">
      <h2 className="font-bold text-lg text-[#0b1c30] mb-4">Description</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#515f74] mb-1">
            Price
          </p>
          <p className="text-sm font-semibold text-[#0b1c30]">
            ${property.price}/mon
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#515f74] mb-1">
            Type
          </p>
          <p className="text-sm font-semibold text-[#0b1c30]">
            {property.category.name}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#515f74] mb-1">
            Posted
          </p>
          <p className="text-sm font-semibold text-[#0b1c30]">
            {new Date(property.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric"
            })}
          </p>
        </div>
      </div>
      <p className="text-sm text-[#515f74] leading-relaxed">
        {property.description}
      </p>
    </div>
  );
}
