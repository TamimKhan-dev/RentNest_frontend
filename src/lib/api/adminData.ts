import { QuerySearchParams } from "@/types/admin";

export async function getUsersInformation({
  page = 1,
  search = "",
  role = "",
}: QuerySearchParams) {
  const params = new URLSearchParams({
    page: String(page),
    limit: "6",
    search,
    role: role === "ALL" ? "" : role,
  });
  const res = await fetch(`/api/admin/users?${params}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load users");
  }

  return json.data;
}

export async function getAdminRentalRequests() {
  const res = await fetch("/api/admin/rentals");
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load Rental requests");
  }

  return json.data;
}

export async function getAdminProperties() {
  const res = await fetch("/api/admin/properties");
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load Properties");
  }

  return json.data;
}
