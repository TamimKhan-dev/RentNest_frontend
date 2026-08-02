import { AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <div className="w-full min-h-screen bg-[#f8f9ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-95 bg-white rounded-2xl border border-[#e5eeff] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-6">
        {/* Warning icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-[#fef3c7]/50 flex items-center justify-center">
            <AlertTriangle size={30} className="text-[#d97706]" strokeWidth={2} />
          </div>
        </div>

        {/* Status pill */}
        <div className="flex justify-center mb-4">
          <span className="flex items-center gap-1.5 bg-[#fef3c7] text-[#b45309] text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
            Payment Pending
          </span>
        </div>

        {/* Title + description */}
        <h1 className="text-center font-bold text-2xl text-[#0b1c30] mb-2">
          Payment Cancelled
        </h1>
        <p className="text-center text-sm text-[#515f74] leading-relaxed mb-6">
          Your payment was cancelled before it could be completed. No money
          has been charged. You can return anytime to complete your payment.
        </p>

        {/* Status update box */}
        <div className="flex items-start gap-3 bg-[#eff4ff] rounded-xl p-4 mb-6">
          <div className="w-7 h-7 shrink-0 rounded-full bg-[#d7f5e9] flex items-center justify-center">
            <Info size={14} className="text-[#006c49]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0b1c30] mb-1">
              Status Update
            </p>
            <p className="text-sm text-[#515f74] leading-relaxed">
              Your rental request is still awaiting payment. Complete payment
              to activate your rental.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mb-5">
          <Button
            asChild
            className="w-full bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold h-auto py-3 rounded-xl"
          >
            <Link href="#">Return to Payment</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-[#bbcabf] text-[#0b1c30] font-semibold h-auto py-3 rounded-xl"
          >
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <p className="text-center text-xs text-[#515f74] leading-relaxed">
          Need help?{" "}
          <a href="#" className="text-[#006c49] font-semibold hover:underline">
            Contact support
          </a>{" "}
          if you{`'`}re experiencing payment issues.
        </p>
      </div>
    </div>
  );
}