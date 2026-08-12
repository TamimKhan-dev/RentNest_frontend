
export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED";

export type PaymentHistory = {
  id: number;
  rentalRequestId: number;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  provider: string;
  paidAt: string;
};