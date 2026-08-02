import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const payment = {
  property: "Emerald Heights Suite",
  location: "Downtown District, Seattle, WA",
  amount: "$450.00",
  transactionId: "#TXN-928374",
  paymentMethod: "Visa ending in 4242",
  date: "Oct 24, 2023",
};

export default function PaymentSuccessPage() {
  return (
    <div className="w-full min-h-screen bg-[#f8f9ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-95 bg-white rounded-2xl border border-[#e5eeff] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-6">
        {/* Success icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-[#d7f5e9] flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#006c49] flex items-center justify-center">
              <Check size={26} className="text-white" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Title + description */}
        <h1 className="text-center font-bold text-xl text-[#0b1c30] mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-center text-sm text-[#515f74] leading-relaxed mb-4">
          Your payment has been received successfully. Your rental request is
          now active. You can view your active rental from your dashboard.
        </p>

        {/* Status pill */}
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-1.5 bg-[#d7f5e9] text-[#006c49] text-xs font-semibold px-3 py-1.5 rounded-full">
            <Check size={13} strokeWidth={3} />
            Payment Completed
          </span>
        </div>

        {/* Payment summary */}
        <div className="bg-[#eff4ff] rounded-xl p-4 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-3">
            Payment Summary
          </p>

          <div className="flex items-center justify-between text-sm mb-2.5">
            <span className="text-[#515f74]">Property Name</span>
            <span className="font-semibold text-[#0b1c30] text-right">
              {payment.property}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2.5">
            <span className="text-[#515f74]">Location</span>
            <span className="font-semibold text-[#0b1c30] text-right">
              {payment.location}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mb-3.5 pb-3.5 border-b border-[#dbe4f5]">
            <span className="text-[#515f74]">Amount Paid</span>
            <span className="font-bold text-[#006c49] text-base">
              {payment.amount}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm mb-2.5">
            <div>
              <p className="text-[#515f74] text-xs mb-0.5">Transaction ID</p>
              <p className="font-semibold text-[#0b1c30]">
                {payment.transactionId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#515f74] text-xs mb-0.5">Payment Method</p>
              <p className="flex items-center gap-1 font-semibold text-[#0b1c30]">
                <CreditCard size={13} />
                {payment.paymentMethod}
              </p>
            </div>
          </div>

          <div className="text-sm">
            <p className="text-[#515f74] text-xs mb-0.5">Payment Date</p>
            <p className="font-semibold text-[#0b1c30]">{payment.date}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mb-4">
          <Button
            asChild
            className="w-full bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold h-auto py-3 rounded-xl"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-[#bbcabf] text-[#0b1c30] font-semibold h-auto py-3 rounded-xl"
          >
            <Link href="/properties">Browse More Properties</Link>
          </Button>
        </div>

        <p className="text-center text-xs text-[#94a3b8]">
          A payment receipt has been recorded for this transaction.
        </p>
      </div>
    </div>
  );
}