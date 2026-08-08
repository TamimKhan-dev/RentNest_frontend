import { Status } from "@/app/(dashboard)/dashboard/tenant/page";

export type RentalRequest = {
  id: number;
  tenantId: number;
  propertyId: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
  property: {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    amenities: string[];
    isAvailable: boolean;
    image: string | null;
    categoryId: number;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
  };
  tenant: {
    id: number;
    name: string;
    email: string;
  };
};
