"use client";

import { useState } from "react";
import DashboardHeader from "./dashboard/_components/dashboardHeader";
import Sidebar from "./dashboard/_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8f9ff]">
      <Sidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}