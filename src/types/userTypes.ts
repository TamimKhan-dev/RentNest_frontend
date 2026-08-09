
export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type UserDetails = {
    id: number;
    email: string;
    name: string;
    isBanned: boolean;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}