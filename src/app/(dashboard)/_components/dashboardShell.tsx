"use client";

import { useState } from "react";
import Sidebar, { UserRole } from "./sidebar";
import DashboardHeader from "./dashboardHeader";


export default function DashboardShell({
  userRole,
  children,
}: {
  userRole: UserRole;
  children?: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8f9ff]">
      <Sidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} userRole={userRole} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setMobileNavOpen(true)} userRole={userRole} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}