import { headers } from "next/headers";
import DashboardShell from "./_components/dashboardShell";
import { UserRole } from "@/types/admin";



export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const userRole = (await headers()).get("userRole") as UserRole;

  return <DashboardShell userRole={userRole}>{children}</DashboardShell>;
}