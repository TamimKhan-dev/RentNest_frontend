"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Home,
  ClipboardCheck,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminRentalRequests, UserDetails, UserRole } from "@/types/admin";
import { useUsersInformation } from "@/hooks/useUsersInformation";
import { Spinner } from "@/components/ui/spinner";
import { useAdminProperties } from "@/hooks/useAdminProperties";
import { useAdminRentalRequests } from "@/hooks/useAdminRentalRequests";
import { BanUserModal } from "../../_components/admin/banUserModal";
import { UnbanUserModal } from "../../_components/admin/unbanUserModal";

const roleStyles: Record<UserRole, string> = {
  TENANT: "bg-[#e0e7ff] text-[#4338ca]",
  LANDLORD: "bg-[#ede9fe] text-[#6d28d9]",
  ADMIN: "bg-[#006c49] text-white",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function OverviewUserManagement() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [action, setAction] = useState<"ban" | "unban" | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useUsersInformation({
    page,
    search: debouncedSearch,
    role,
  });

  const users = data?.users ?? [];
  const totalUsers = data?.totalUsers ?? 0;

  const { data: properties = [] } = useAdminProperties();
  const { data: requests = [] } = useAdminRentalRequests();

  const USERS_PER_PAGE = 6;
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  const pendingRentalRequests = requests.filter(
    (request: AdminRentalRequests) => request.status === "PENDING",
  ).length;

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users },
    { label: "Total Properties", value: properties.length, icon: Home },
    {
      label: "Pending Rental Requests",
      value: pendingRentalRequests,
      icon: ClipboardCheck,
    },
  ];

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
            Overview &amp; User Management
          </h1>
          <p className="text-sm text-[#515f74]">
            Monitor your platform and manage registered users.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-[#e5eeff] p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-[#515f74] mb-2">
                  {label}
                </p>
                <p className="text-2xl font-bold text-[#0b1c30]">{value}</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#006c49]" />
              </div>
            </div>
          ))}
        </div>

        {/* User Management card */}
        <div className="bg-white rounded-2xl border border-[#e5eeff] overflow-hidden">
          <div className="p-6 pb-4">
            <h2 className="font-bold text-xl text-[#0b1c30] mb-1">
              User Management
            </h2>
            <p className="text-sm text-[#515f74] mb-5">
              View and manage all registered users on the platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users by name or email..."
                  className="pl-9 h-auto py-2.5 rounded-lg border-[#e5eeff] bg-[#f8f9ff]"
                />
              </div>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-full sm:w-35 cursor-pointer">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="ALL">
                    All Roles
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="TENANT">
                    Tenant
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="LANDLORD">
                    Landlord
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="ADMIN">
                    Admin
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading && (
              <p className="text-sm text-[#515f74] p-4 flex gap-2 items-center">
                <Spinner /> Loading users...
              </p>
            )}

            {isError && (
              <p className="text-sm text-red-500 p-4">
                Failed to load users. Please try again.
              </p>
            )}

            {!isLoading && !isError && users.length === 0 && (
              <p className="text-sm text-[#515f74] p-4">No users found!.</p>
            )}

            {!isLoading && !isError && users.length > 0 && (
              <table className="w-full min-w-180 text-sm">
                <thead>
                  <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
                    <th className="text-left font-semibold px-6 py-3">User</th>
                    <th className="text-left font-semibold px-6 py-3">Email</th>
                    <th className="text-left font-semibold px-6 py-3">Role</th>
                    <th className="text-left font-semibold px-6 py-3">
                      Joined
                    </th>
                    <th className="text-left font-semibold px-6 py-3">
                      Status
                    </th>
                    <th className="text-left font-semibold px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: UserDetails) => (
                    <tr
                      key={user.id}
                      className={`border-t border-[#e5eeff] transition-colors ${
                        user.isBanned
                          ? "bg-[#fef2f2] hover:bg-[#fde8e8]"
                          : "hover:bg-[#f8f9ff]"
                      }`}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-[#eff4ff] text-[#006c49]">
                              {initials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-[#0b1c30] whitespace-nowrap">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-[#1d4ed8] whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${roleStyles[user.role]}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-[#515f74] whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                            !user.isBanned
                              ? "bg-[#d7f5e9] text-[#006c49]"
                              : "bg-[#ffdad6] text-[#ba1a1a]"
                          }`}
                        >
                          {user.isBanned ? "Banned" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {user.role === "ADMIN" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="text-xs w-17 h-auto px-4 py-1.5 rounded-lg border-[#e5eeff] text-[#94a3b8] whitespace-nowrap"
                          >
                            Ban
                          </Button>
                        ) : !user.isBanned ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs w-17 h-auto px-4 py-1.5 rounded-lg border-[#ba1a1a]/30 text-[#ba1a1a] hover:bg-[#ffdad6] whitespace-nowrap cursor-pointer"
                            onClick={() => {
                              setSelectedUser(user);
                              setAction("ban");
                            }}
                          >
                            Ban
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs w-17 h-auto px-4 py-1.5 rounded-lg border-[#006c49]/30 text-[#006c49] hover:bg-[#d7f5e9] whitespace-nowrap cursor-pointer"
                            onClick={() => {
                              setSelectedUser(user);
                              setAction("unban");
                            }}
                          >
                            Unban
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer: count + pagination */}
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e5eeff]">
            <p className="text-xs text-[#515f74]">
              Showing <span className="font-semibold text-[#0b1c30]">1-6</span>{" "}
              of{" "}
              <span className="font-semibold text-[#0b1c30]">
                {users.length}
              </span>{" "}
              users
            </p>

            <div className="flex items-center gap-1.5">
              {/* Previous */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                    page === n
                      ? "bg-[#006c49] border-[#006c49] text-white"
                      : "border-[#e5eeff] text-[#0b1c30] hover:bg-[#f8f9ff]"
                  }`}
                >
                  {n}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {action === "ban" && (
        <BanUserModal
          open={!!selectedUser}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedUser(null);
              setAction(null);
            }
          }}
          userId={selectedUser?.id ?? null}
          userName={selectedUser?.name}
        />
      )}

      {action === "unban" && (
        <UnbanUserModal
          open={!!selectedUser}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedUser(null);
              setAction(null);
            }
          }}
          userId={selectedUser?.id ?? null}
          userName={selectedUser?.name}
        />
      )}
    </>
  );
}
