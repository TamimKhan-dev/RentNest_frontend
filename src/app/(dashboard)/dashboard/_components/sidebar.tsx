"use client";

import {
  LayoutGrid,
  Building2,
  PlusSquare,
  Users2,
  type LucideIcon,
  CreditCard,
  ClipboardList,
  Inbox,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "@/components/shared/Logo";
import SidebarContent from "./sidebarContent";

export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

type SidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: UserRole;
};



const roleNav: Record<UserRole, NavSection> = {
  TENANT: {
    label: "Tenant",
    items: [
      { label: "Overview", icon: LayoutGrid, href: "/dashboard/tenant" },
      { label: "Payments", icon: CreditCard, href: "/dashboard/tenant/payments" },
      { label: "Requests", icon: ClipboardList, href: "/dashboard/tenant/requests/2/pay" },
    ],
  },
  LANDLORD: {
    label: "Landlord",
    items: [
      { label: "Overview", icon: LayoutGrid, href: "/dashboard/landlord" },
      { label: "My Properties", icon: Building2, href: "/dashboard/landlord/properties" },
      { label: "Add Property", icon: PlusSquare, href: "/dashboard/landlord/properties/new" },
      { label: "Rental requests", icon: Inbox, href: "/dashboard/landlord/requests" },
    ],
  },
  ADMIN: {
    label: "Admin",
    items: [
      { label: "Overview", icon: LayoutGrid, href: "/dashboard/admin" },
      { label: "Properties", icon: Building2, href: "/dashboard/admin/properties" },
      { label: "Users", icon: Users2, href: "/dashboard/admin/users" },
    ],
  },
};



export default function Sidebar({
  open,
  onOpenChange,
  userRole,
}: SidebarProps) {
  const sections: NavSection[] = [roleNav[userRole]];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-white border-r border-[#e5eeff] h-screen sticky top-0 py-6 px-4 flex-col gap-8">
        <Logo />
        <SidebarContent sections={sections} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-72 p-4 flex flex-col gap-8">
          <SheetHeader className="p-0">
            <SheetTitle asChild>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <SidebarContent
            sections={sections}
            onNavigate={() => onOpenChange(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
