import { Status } from "@/app/(dashboard)/dashboard/tenant/page";

export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type QuerySearchParams = {
  page?: number;
  search?: string;
  role?: string;
};

export type UserDetails = {
  id: number;
  email: string;
  name: string;
  isBanned: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type AdminRentalRequest = {
  id: number;
  status: Status;
  createdAt: string;
  property: {
    title: string;
    location: string;
    price: number;
    image: string | null;
  };
  tenant: {
    name: string;
    email: string;
  };
};

export type AdminProperties = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  isAvailable: boolean;
  image: string | null;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  ownerId: number;
  createdAt: string;
  updatedAt: string;
};

export type AdminRentalRequests = {
  id: number;
  tenantId: number;
  propertyId: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
