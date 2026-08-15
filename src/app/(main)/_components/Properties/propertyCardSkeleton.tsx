import { Skeleton } from "@/components/ui/skeleton";

function PropertyCardSkeletonFunc() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dce6f5] bg-white max-w-7xl">
      {/* Image */}
      <Skeleton className="h-40 w-full rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title + rating */}
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-10" />
        </div>

        {/* Location */}
        <Skeleton className="h-3 w-2/3" />

        {/* Details */}
        <div className="flex gap-4">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-10" />
        </div>

        {/* Price + button */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function PropertyCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <PropertyCardSkeletonFunc key={index} />
      ))}
    </div>
  );
}