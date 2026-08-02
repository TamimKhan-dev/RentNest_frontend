"use client";

import { Star } from "lucide-react";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const MAX_CHARS = 140;

type ReviewFormData = {
  rating: number;
  comment: string;
};

export default function LeaveReviewModal({
  open,
  onOpenChange,
  propertyId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: number;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    defaultValues: { rating: 0, comment: "" },
  });

  const reviewValue = useWatch({ control, name: "comment", defaultValue: "" });
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const res = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          rating: data.rating,
          comment: data.comment,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "Failed to submit review");
      }

      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentalRequests"] });
      reset();
      onOpenChange(false);
      toast.success("Review sent successfully!");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message)
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    submitReview(data);
    
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-105">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#0b1c30]">
            Leave a Review
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-[#515f74]">
            Share your experience with this property and landlord.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Star rating */}
          <div className="flex flex-col items-center gap-2 py-2">
            <Controller
              name="rating"
              control={control}
              rules={{ min: 1 }}
              render={({ field }) => (
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        size={30}
                        className={
                          star <= field.value
                            ? "fill-[#f5b400] text-[#f5b400]"
                            : "text-[#cbd5e1]"
                        }
                      />
                    </button>
                  ))}
                </div>
              )}
            />
            <p className="text-xs font-semibold tracking-wide text-[#006c49]">
              RATE YOUR STAY
            </p>
            {errors.rating && (
              <span className="text-red-400 text-xs">
                Please select a star rating
              </span>
            )}
          </div>

          {/* Review textarea */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Your Review
            </label>
            <Textarea
              {...register("comment", {
                required: "Please write a short review",
                maxLength: {
                  value: MAX_CHARS,
                  message: `Review can't exceed ${MAX_CHARS} characters`,
                },
              })}
              maxLength={MAX_CHARS}
              placeholder="Write your review here..."
              rows={3}
              className="resize-none rounded-xl border-[#e5eeff] focus-visible:ring-4 focus-visible:ring-[#10b981]/10 focus-visible:border-[#10b981]"
            />
            <div className="flex items-center justify-between">
              {errors.comment ? (
                <span className="text-red-400 text-xs">
                  {errors.comment.message}
                </span>
              ) : (
                <span />
              )}
              <p className="text-xs text-[#94a3b8]">
                {reviewValue.length}/{MAX_CHARS}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className="text-[#515f74]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isPending}
              className="bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold rounded-lg px-5"
            >
              {isPending ? "Sending..." : "Send Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
