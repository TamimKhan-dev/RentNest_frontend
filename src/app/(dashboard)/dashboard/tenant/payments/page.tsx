"use client";

import {
  Wallet,
  Search,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useTenantPyamentHistory } from "@/hooks/useTenantPaymentHistory";
import { PaymentHistory, PaymentStatus } from "@/types/payment";
import { toast } from "sonner";

const statusStyles: Record<PaymentStatus, string> = {
  COMPLETED: "bg-[#d7f5e9] text-[#006c49]",
  PENDING: "bg-[#fef3c7] text-[#b45309]",
  FAILED: "bg-[#ffdad6] text-[#ba1a1a]",
};

export default function AllPaymentHistoryPage() {
  const { data: payments = [], isLoading, isError } = useTenantPyamentHistory();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div className="mb-6">
          <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
            All Payment History
          </h1>
          <p className="text-sm text-[#515f74]">
            View all your past rental payments and their status.
          </p>
        </div>

        {/* Stat card */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 flex items-center justify-between max-w-xs">
            <div>
              <p className="text-xs font-medium text-[#515f74] mb-2">
                Total Payments
              </p>
              <p className="text-2xl font-bold text-[#0b1c30]">
                {payments.length}
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0">
              <Wallet size={18} className="text-[#006c49]" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment History card */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="font-bold text-xl text-[#0b1c30] mb-1">
            Payment History
          </h2>
          <p className="text-sm text-[#515f74] mb-5">
            A record of every payment made on your rental requests.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
              />
              <Input
                placeholder="Search by transaction ID..."
                className="pl-9 h-auto py-2.5 rounded-lg border-[#e5eeff] bg-[#f8f9ff]"
              />
            </div>
            <Select>
              <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-full sm:w-40 cursor-pointer">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="ALL">
                  All Statuses
                </SelectItem>
                <SelectItem className="cursor-pointer" value="COMPLETED">
                  Completed
                </SelectItem>
                <SelectItem className="cursor-pointer" value="PENDING">
                  Pending
                </SelectItem>
                <SelectItem className="cursor-pointer" value="FAILED">
                  Failed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading && (
            <p className="text-sm text-[#515f74] p-4 flex gap-2 items-center">
              <Spinner /> Loading payment history...
            </p>
          )}

          {isError && (
            <p className="text-sm text-red-500 p-4">
              Failed to load payment history. Please try again.
            </p>
          )}

          {!isLoading && !isError && payments.length === 0 && (
            <p className="text-sm text-[#515f74] p-4">No payments found!.</p>
          )}

          {!isLoading && !isError && payments.length > 0 && (
            <table className="w-full min-w-180 text-sm">
              <thead>
                <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
                  <th className="text-left font-semibold px-6 py-3">
                    Transaction ID
                  </th>
                  <th className="text-left font-semibold px-6 py-3">
                    Rental Request
                  </th>
                  <th className="text-left font-semibold px-6 py-3">Amount</th>
                  <th className="text-left font-semibold px-6 py-3">
                    Provider
                  </th>
                  <th className="text-left font-semibold px-6 py-3">Status</th>
                  <th className="text-left font-semibold px-6 py-3">Paid On</th>
                  <th className="text-left font-semibold px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment: PaymentHistory) => (
                  <tr
                    key={payment.id}
                    className="border-t border-[#e5eeff] hover:bg-[#f8f9ff] transition-colors"
                  >
                    <td className="px-6 py-3">
                      <span className="font-mono text-xs text-[#0b1c30] whitespace-nowrap">
                        {payment.transactionId.slice(0, 18)}...
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#1d4ed8] whitespace-nowrap">
                      #{payment.rentalRequestId}
                    </td>
                    <td className="px-6 py-3 font-semibold text-[#0b1c30] whitespace-nowrap">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-[#515f74] capitalize whitespace-nowrap">
                      {payment.provider}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[payment.status]}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#515f74] whitespace-nowrap">
                      {new Date(payment.paidAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3">
                      <Button
                        onClick={() => toast.warning("Feature hasn't build yet!")}
                        size="sm"
                        variant="outline"
                        className="text-xs h-auto px-4 py-1.5 rounded-lg border-[#bbcabf] text-[#0b1c30] whitespace-nowrap gap-1.5 cursor-pointer"
                      >
                        <Receipt size={13} />
                        View Receipt
                      </Button>
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
              {payments.length}
            </span>{" "}
            payments
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
            <button
              className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium border transition-colors cursor-pointer border-[#e5eeff] text-[#0b1c30] hover:bg-[#f8f9ff]`}
            >
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
