"use client";

import {
  LayoutGrid,
  FileText,
  Building2,
  PlusSquare,
  BarChart3,
  Users2,
  Home,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

const navGroups = [
  {
    label: "Tenant",
    items: [
      { label: "Overview", icon: LayoutGrid, active: true },
      { label: "Requests", icon: FileText, active: false },
    ],
  },
  {
    label: "Landlord",
    items: [
      { label: "My Properties", icon: Building2, active: false },
      { label: "Add Property", icon: PlusSquare, active: false },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Analytics", icon: BarChart3, active: false },
      { label: "Users", icon: Users2, active: false },
    ],
  },
];

function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 px-2">
        <div className="w-8 h-8 rounded-lg bg-[#006c49] flex items-center justify-center">
          <Home size={16} className="text-white" />
        </div>
        <span className="font-bold text-lg text-[#0b1c30]">RentNest</span>
      </div>
    </Link>
  );
}

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-6">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="text-[11px] font-semibold tracking-wide uppercase text-[#94a3b8] px-3 mb-2">
            {group.label}
          </p>
          <div className="flex flex-col gap-1">
            {group.items.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  active
                    ? "bg-[#d7f5e9] text-[#006c49]"
                    : "text-[#515f74] hover:bg-[#f8f9ff]"
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

type SidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function Sidebar({ open, onOpenChange }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar — always visible from md up */}
      <aside className="hidden md:flex w-64 shrink-0 bg-white border-r border-[#e5eeff] h-screen sticky top-0 py-6 px-4 flex-col gap-8">
        <Logo />
        <NavContent />
      </aside>

      {/* Mobile sidebar — slide-in drawer below md */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-72 p-4 flex flex-col gap-8">
          <SheetHeader className="p-0">
            <SheetTitle asChild>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <NavContent onNavigate={() => onOpenChange(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
