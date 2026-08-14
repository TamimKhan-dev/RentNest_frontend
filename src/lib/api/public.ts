import { PublicProperty } from "@/types/publicTypes";

export async function getAllPublicProperties() {
  const res = await fetch("/api/properties");
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load Public Properties");
  }

  return json.data as PublicProperty[];
}
