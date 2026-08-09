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

export type AdminRentalRequests = {
  id: number;
  tenantId: number;
  propertyId: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
