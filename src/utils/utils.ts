import { Status } from "@/app/(dashboard)/dashboard/tenant/page";

type RentalRequest = {
  id: number;
  propertyId: number;
  status: Status;
  tenantId: number;
  property: {
    id: number;
    title: string;
    description: string;
    location: string;
    price: number;
    isAvailable: boolean;
    amenities: string[];
    categoryId: number;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const getRentalRequestStats = (requests: RentalRequest[] | undefined) => {
  return requests?.reduce(
    (stats, request) => {
      stats.totalRentalRequests++;

      switch (request.status) {
        case "PENDING":
          stats.pendingRentalRequests++;
          break;

        case "APPROVED":
          stats.approvedRentalRequests++;
          break;

        case "ACTIVE":
          stats.activeRentals++;
          break;
      }

      return stats;
    },
    {
      totalRentalRequests: 0,
      pendingRentalRequests: 0,
      approvedRentalRequests: 0,
      activeRentals: 0,
    }
  );
};