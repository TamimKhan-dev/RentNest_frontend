type IPropertyDeatails = {
  name: string;
  location: string;
  rating: number;
  verified: boolean;
  image: string;
  status: string;
  price: string;
  type: string;
  posted: string;
  description: string;
};

export default function Description({
  property,
}: {
  property: IPropertyDeatails;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] p-6">
      <h2 className="font-bold text-lg text-[#0b1c30] mb-4">Description</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#515f74] mb-1">
            Status
          </p>
          <p className="text-sm font-semibold text-[#006c49]">
            {property.status}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#515f74] mb-1">
            Price
          </p>
          <p className="text-sm font-semibold text-[#0b1c30]">
            {property.price}/mo
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#515f74] mb-1">
            Type
          </p>
          <p className="text-sm font-semibold text-[#0b1c30]">
            {property.type}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#515f74] mb-1">
            Posted
          </p>
          <p className="text-sm font-semibold text-[#0b1c30]">
            {property.posted}
          </p>
        </div>
      </div>
      <p className="text-sm text-[#515f74] leading-relaxed">
        {property.description}
      </p>
    </div>
  );
}
