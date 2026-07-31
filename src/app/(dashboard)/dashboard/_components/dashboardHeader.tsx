"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-[#e5eeff] px-4 md:px-6 py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="md:hidden w-9 h-9 shrink-0 flex items-center justify-center rounded-lg hover:bg-[#f8f9ff] text-[#0b1c30]"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <p className="hidden sm:block text-xs text-[#515f74] mb-1 truncate">
            Dashboard &gt; Overview
          </p>
          <h1 className="font-bold text-base md:text-lg text-[#0b1c30] truncate">
            Dashboard Overview
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
        <Button
          variant="outline"
          className="hidden sm:flex border-[#bbcabf] text-sm text-[#0b1c30] h-auto py-2 px-4 rounded-lg gap-2"
        >
          <ArrowUpRight size={15} />
          <Link href="/" className="hidden lg:inline cursor-pointer">Back to Site</Link>
        </Button>

        <div className="flex items-center gap-2.5">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://i.pravatar.cc/100?img=47" alt="Sarah Jenkins" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-[#0b1c30] leading-tight">
              Sarah Jenkins
            </p>
            <Badge className="bg-[#eff4ff] text-[#515f74] hover:bg-[#eff4ff] text-[10px] font-semibold px-1.5 py-0 h-4">
              ADMIN
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}