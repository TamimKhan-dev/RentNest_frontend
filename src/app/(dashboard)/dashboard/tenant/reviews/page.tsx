"use client";

import {
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  MessageSquareText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Review } from "@/types/tenant";
import { useTenantReviews } from "@/hooks/useTenantReviews";
import Image from "next/image";
import { toast } from "sonner";

export default function TenantReviewsPage() {
  const { data: reviews = [], isLoading, isError } = useTenantReviews();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div className="mb-6">
          <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
            My Reviews
          </h1>
          <p className="text-sm text-[#515f74]">
            View and manage the reviews you&apos;ve left on properties.
          </p>
        </div>

        {/* Stat card */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 flex items-center justify-between max-w-xs">
            <div>
              <p className="text-xs font-medium text-[#515f74] mb-2">
                Total Reviews
              </p>
              <p className="text-2xl font-bold text-[#0b1c30]">
                {reviews.length}
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0">
              <MessageSquareText size={18} className="text-[#006c49]" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews card */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="font-bold text-xl text-[#0b1c30] mb-1">
            Review History
          </h2>
          <p className="text-sm text-[#515f74] mb-5">
            A record of every review you&apos;ve submitted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
              />
              <Input
                placeholder="Search by property name..."
                className="pl-9 h-auto py-2.5 rounded-lg border-[#e5eeff] bg-[#f8f9ff]"
              />
            </div>
            <Select>
              <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-full sm:w-40 cursor-pointer">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="ALL">
                  All Ratings
                </SelectItem>
                <SelectItem className="cursor-pointer" value="5">
                  5 Stars
                </SelectItem>
                <SelectItem className="cursor-pointer" value="4">
                  4 Stars
                </SelectItem>
                <SelectItem className="cursor-pointer" value="3">
                  3 Stars
                </SelectItem>
                <SelectItem className="cursor-pointer" value="2">
                  2 Stars
                </SelectItem>
                <SelectItem className="cursor-pointer" value="1">
                  1 Star
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading && (
            <p className="text-sm text-[#515f74] p-4 flex gap-2 items-center">
              <Spinner /> Loading reviews...
            </p>
          )}

          {isError && (
            <p className="text-sm text-red-500 p-4">
              Failed to load reviews. Please try again.
            </p>
          )}

          {!isLoading && !isError && reviews.length === 0 && (
            <p className="text-sm text-[#515f74] p-4">No reviews found!.</p>
          )}

          {!isLoading && !isError && reviews.length > 0 && (
            <table className="w-full min-w-180 text-sm">
              <thead>
                <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
                  <th className="text-left font-semibold px-6 py-3">
                    Property
                  </th>
                  <th className="text-left font-semibold px-6 py-3">Rating</th>
                  <th className="text-left font-semibold px-6 py-3">Comment</th>
                  <th className="text-left font-semibold px-6 py-3">
                    Reviewed On
                  </th>
                  <th className="text-left font-semibold px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review: Review) => (
                  <tr
                    key={review.id}
                    className="border-t border-[#e5eeff] hover:bg-[#f8f9ff] transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            review.property.image ||
                            "https://i.ibb.co.com/QFWY3SYV/no-image.webp"
                          }
                          alt={review.property.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                          width={100}
                          height={100}
                        />

                        <div className="min-w-0">
                          <p className="font-semibold text-[#1d4ed8] whitespace-nowrap">
                            {review.property.title}
                          </p>
                          <p className="text-xs text-[#94a3b8] whitespace-nowrap">
                            {review.property.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={
                              i < review.rating
                                ? "fill-[#f5b400] text-[#f5b400]"
                                : "text-[#e5eeff]"
                            }
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-[#515f74] max-w-64 truncate">
                      {review.comment}
                    </td>
                    <td className="px-6 py-3 text-[#515f74] whitespace-nowrap">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast.warning("Feature hasn't build yet!")}
                          aria-label="Edit review"
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-[#eff4ff] text-[#1d4ed8] hover:bg-[#dbeafe] transition-colors cursor-pointer"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => toast.warning("Feature hasn't build yet!")}
                          aria-label="Delete review"
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-[#fef3c7] text-[#b45309] hover:bg-[#fde68a] transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer: count + pagination */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e5eeff]">
          <p className="text-xs text-[#515f74]">
            Showing <span className="font-semibold text-[#0b1c30]">1-6</span> of{" "}
            <span className="font-semibold text-[#0b1c30]">
              {reviews.length}
            </span>{" "}
            reviews
          </p>

          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Page numbers */}
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium border transition-colors cursor-pointer border-[#e5eeff] text-[#0b1c30] hover:bg-[#f8f9ff]">
              1
            </button>

            {/* Next */}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
