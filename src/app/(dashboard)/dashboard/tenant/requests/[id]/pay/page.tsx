"use client";

import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Wifi,
  ParkingSquare,
  UtensilsCrossed,
  DoorOpen,
  MapPin,
  ShieldCheck,
  Lock,
  Headset,
  ArrowRight,
  LucideIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import SpinnerDefault from "@/app/loading";

const amenityIconMap: Record<string, LucideIcon> = {
  WiFi: Wifi,
  Parking: ParkingSquare,
  Kitchen: UtensilsCrossed,
  Balcony: DoorOpen,
};
const FallbackIcon = CheckCircle2;

export default function ConfirmAndPayPage() {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["rentalRequests", id],
    queryFn: async () => {
      const res = await fetch(`/api/rentals/${id}`, {
        cache: "no-cache",
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

const { mutate: initiateCheckout, isPending: isCheckoutLoading } =
  useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rentalRequestId: id }),
      });
      if (!res.ok) throw new Error("Failed to create checkout session");
      return res.json();
    },
    onSuccess: (data) => {
      const url = data?.data?.paymentUrl;
      if (url) {
        window.location.href = url;
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  if (isLoading) return <SpinnerDefault />;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  const { property } = data.data;
  const rentalRequest = data.data;

  return (
    <div className="w-full max-w-180 mx-auto">
      {/* Back link */}
      <Link
        href="/dashboard/tenant"
        className="inline-flex items-center gap-1.5 text-sm text-[#006c49] font-medium hover:underline mb-4"
      >
        <ArrowLeft size={15} />
        Back to Rental Requests
      </Link>

      {/* Title */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
            Confirm &amp; Pay
          </h1>
          <p className="text-sm text-[#515f74]">
            Review your approved rental request before completing payment.
          </p>
        </div>
        <Badge className="bg-[#006c49] hover:bg-[#006c49] text-white text-xs font-semibold px-3 py-1.5 rounded-full gap-1 shrink-0">
          <CheckCircle2 size={13} />
          APPROVED
        </Badge>
      </div>

      {/* Property card */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] p-5 mb-6 flex flex-col sm:flex-row gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/emerald-heights-suite/400/400"
          alt="property Image"
          className="w-full sm:w-40 h-40 rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 className="font-bold text-lg text-[#0b1c30]">
              {property.title}
            </h2>
            <p className="font-bold text-lg text-[#006c49] whitespace-nowrap">
              ${property.price}\mon
            </p>
          </div>
          <p className="flex items-center gap-1 text-sm text-[#515f74] mb-3">
            <MapPin size={14} className="text-[#006c49]" />
            {property.location}
          </p>
          <p className="text-sm text-[#515f74] leading-relaxed mb-4">
            {property.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {property.amenities?.map((amenity: string) => {
              const Icon = amenityIconMap[amenity] ?? FallbackIcon;
              return (
                <span
                  key={amenity}
                  className="flex items-center gap-1.5 bg-[#eff4ff] text-[#0b1c30] text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <Icon size={13} className="text-[#515f74]" />
                  {amenity}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Request Details */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] p-5 mb-6">
        <h2 className="flex items-center gap-2 font-bold text-lg text-[#0b1c30] mb-5">
          <FileText size={18} className="text-[#006c49]" />
          Request Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">
              Request ID
            </p>
            <p className="text-sm font-semibold text-[#0b1c30]">
              {rentalRequest.id}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">
              Requested On
            </p>
            <p className="text-sm font-semibold text-[#0b1c30]">
              {rentalRequest.createdAt}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">
              Lease Term
            </p>
            <p className="text-sm font-semibold text-[#0b1c30]">
              12 Months (Starting Nov 1st)
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">
              Status
            </p>
            <p className="text-sm font-semibold text-[#1d4ed8]">
              Pending Payment
            </p>
          </div>
        </div>
      </div>

      {/* Amount due + CTA */}
      <div className="bg-[#eaf6f0] border border-[#bfe3d4] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-[#0b1c30]">
            Amount Due:{" "}
            <span className="font-bold text-2xl text-[#0b1c30]">
              ${property.price}
            </span>
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[#515f74] mt-1">
            <ShieldCheck size={13} className="text-[#006c49]" />
            Your payment will securely complete the rental confirmation.
          </p>
        </div>
        <Button
          onClick={() => initiateCheckout()}
          disabled={isCheckoutLoading}
          className="w-full sm:w-auto bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold h-auto py-3 px-6 rounded-xl gap-2 whitespace-nowrap"
        >
          {isCheckoutLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Preparing checkout...
            </>
          ) : (
            <>
              Proceed to Payment
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#515f74] pb-8">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} />
          Secure Checkout
        </span>
        <span className="flex items-center gap-1.5">
          <Lock size={14} />
          Encrypted Data
        </span>
        <span className="flex items-center gap-1.5">
          <Headset size={14} />
          24/7 Support
        </span>
      </div>
    </div>
  );
}
