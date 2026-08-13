export type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  property: {
    id: number;
    title: string;
    location: string;
    image: string | null;
  };
};

export type RentalRequestData = {
  id: string;
  createdAt: string;
  property: {
    image: string | null;
    title: string;
    price: number;
    location: string;
    description: string;
    amenities?: string[];
  };
};

export type TenantPaymentInfo = {
  id: number;
  rentalRequestId: number;
  transactionId: string;
  amount: number;
  status: string;
  provider: string;
  paidAt: string;
  rentalRequest: {
    property: {
      title: string;
      location: string;
      price: number;
    };
  };
};
