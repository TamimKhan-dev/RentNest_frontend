import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    date: "May 12, 2024",
    comment:
      "Beautiful space and amazing natural lighting. The landlord was very professional and the check-in process was seamless.",
  },
  {
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/100?img=13",
    rating: 4,
    date: "April 28, 2024",
    comment:
      "Great location and very secure. Perfect for a single professional working in the Banani area.",
  },
];

export default function RecentReviews() {
  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] p-6">
              <h2 className="font-bold text-lg text-[#0b1c30] mb-5">
                Recent Reviews
              </h2>
              <div className="flex flex-col gap-6">
                {reviews.map((review) => (
                  <div key={review.name}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-sm text-[#0b1c30]">
                            {review.name}
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={
                                  i < review.rating
                                    ? "fill-[#f5b400] text-[#f5b400]"
                                    : "text-[#e5eeff]"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-[#515f74]">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-[#515f74] leading-relaxed pl-12">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
  )
}
