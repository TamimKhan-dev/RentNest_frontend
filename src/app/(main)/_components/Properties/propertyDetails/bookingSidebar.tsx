import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSendBookingRequest } from "@/hooks/useSendBookingRequest";
import { PublicProperty } from "@/types/publicTypes";
import { CheckCircle2, Info } from "lucide-react";

// type IPropertyDeatails = {
//   name: string;
//   location: string;
//   rating: number;
//   verified: boolean;
//   image: string;
//   status: string;
//   price: string;
//   type: string;
//   posted: string;
//   description: string;
// };

const bookingHighlights = [
  "Verified Property",
  "Secure Booking Process",
  "No Hidden Charges",
];

export default function BookingSidebar({
  property,
}: {
  property: PublicProperty;
}) {
  const { mutateAsync: sendBookingRequest, isPending } =
    useSendBookingRequest();

  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 lg:sticky lg:top-15 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-[#0b1c30]">
          ${property.price}
          <span className="text-sm font-normal text-[#515f74]">/month</span>
        </p>
        <span className="bg-[#d7f5e9] text-[#006c49] text-xs font-semibold px-2.5 py-1 rounded-full">
          Available
        </span>
      </div>

      <div className="flex items-start gap-2 bg-[#eff4ff] rounded-lg p-3">
        <Info size={15} className="text-[#515f74] mt-0.5 shrink-0" />
        <p className="text-xs text-[#515f74] leading-relaxed">
          Booking requests are reviewed by the landlord before acceptance.
        </p>
      </div>

      <Button
        onClick={async () =>
          await sendBookingRequest({ propertyId: Number(property.id) })
        }
        disabled={isPending}
        className="w-full bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold h-auto py-3 rounded-xl cursor-pointer"
      >
        {isPending ? (
          <>
            {" "}
            <Spinner /> ...Sending request{" "}
          </>
        ) : (
          "Send Booking Request"
        )}
      </Button>

      <ul className="flex flex-col gap-2.5">
        {bookingHighlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-[#0b1c30]"
          >
            <CheckCircle2 size={15} className="text-[#006c49]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
