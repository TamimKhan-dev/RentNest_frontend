"use client";

import { useState } from "react";
import {
  Command,
  Menu,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { logout } from "@/service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    isBanned: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};

export default function Navbar({
  user,
  userRole,
}: {
  user: IUser;
  userRole: string;
}) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const router = useRouter();
  const userData = user.data;
  let redirectTo: string;

  const handleLogout = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/");
    }
  };

  switch (userRole) {
    case "LANDLORD":
      redirectTo = "/dashboard/landlord";
      break;

    case "TENANT":
      redirectTo = "/dashboard/tenant";
      break;

    case "ADMIN":
      redirectTo = "/dashboard/admin";
      break;
    default:
      redirectTo = "/";
      break;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 2xl:px-0">
        {/* Section 1: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">RentNest</span>
        </Link>

        {/* Section 2: Menu options */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Section 3: Auth actions */}
        <div className="flex items-center gap-2">
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="relative size-9 rounded-full p-0"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-9">
                    <AvatarFallback>
                      {userData?.name.slice(0, 2).toUpperCase()}.
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {userData?.name}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {userData?.email}
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={redirectTo}>
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <User />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={async () => {
                    await handleLogout("logout");
                  }}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="bg-[#006c49]">
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="md:hidden"
              >
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 md:hidden">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.label}>
                  {link.label}
                </DropdownMenuItem>
              ))}
              {!user.success && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/login">Log in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Sign up</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
