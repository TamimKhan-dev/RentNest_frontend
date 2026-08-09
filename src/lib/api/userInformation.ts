import { UserDetails } from "@/types/userTypes";

export async function getUsersInformation() {
  const res = await fetch("/api/admin/users");
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load users");
  }

  return json.data as UserDetails[];
}
