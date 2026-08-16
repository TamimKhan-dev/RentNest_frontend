"use client";

import { Heart, Star, MapPin, CheckCircle2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Description from "../../_components/Properties/propertyDetails/description";
import Amenities from "../../_components/Properties/propertyDetails/amenities";
import RecentReviews from "../../_components/Properties/propertyDetails/recentReviews";
import SimilarProperties from "../../_components/Properties/propertyDetails/similarProperties";
import BookingSidebar from "../../_components/Properties/propertyDetails/bookingSidebar";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useProperty } from "@/hooks/useProperty";
import { PublicProperty } from "@/types/publicTypes";
import SpinnerDefault from "@/app/loading";

export default function PropertyDetailsPage() {
  const { id: propertyId } = useParams();
  const { data: property = {} as PublicProperty, isLoading } = useProperty(
    Number(propertyId),
  );

  return (
    <div className="w-full min-h-screen bg-[#f8f9ff] px-4 md:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <SpinnerDefault />
        ) : (
          <>
            {/* Breadcrumb */}
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[#006c49] text-xs">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/properties"
                    className="text-[#006c49] text-xs"
                  >
                    Properties
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#0b1c30] text-xs">
                    {property.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Title row */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-[#515f74]">
                    <MapPin size={14} className="text-[#006c49]" />
                    {property.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-[#0b1c30]">
                    <Star size={14} className="fill-[#f5b400] text-[#f5b400]" />
                    4.8
                  </span>
                  {property.verified && (
                    <span className="flex items-center gap-1 bg-[#d7f5e9] text-[#006c49] text-xs font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={12} />
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <button
                aria-label="Save property"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#bbcabf] text-[#0b1c30] hover:text-[#ba1a1a] hover:border-[#ba1a1a] transition-colors shrink-0"
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Gallery — single hero image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <Image
                src={
                  property.image ??
                  "https://i.ibb.co.com/QFWY3SYV/no-image.webp"
                }
                alt={property.title}
                className="w-full h-80 md:h-105 object-fill"
                width={1000}
                height={1000}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
              {/* Left column */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Description */}
                <Description property={property} />

                {/* Amenities */}
                <Amenities amenities={property.amenities}/>

                {/* Recent Reviews */}
                <RecentReviews />
              </div>

              {/* Right column — Booking sidebar */}
              <div className="lg:col-span-1">
                <BookingSidebar property={property} />
              </div>
            </div>

            {/* Similar Properties */}
            <SimilarProperties />
          </>
        )}
      </div>
    </div>
  );
}
