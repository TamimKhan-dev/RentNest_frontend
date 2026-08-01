import { headers } from "next/headers";
import DashboardShell from "./dashboard/_components/dashboardShell";
import { UserRole } from "./dashboard/_components/sidebar";


export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const userRole = (await headers()).get("userRole") as UserRole;

  return <DashboardShell userRole={userRole}>{children}</DashboardShell>;
}