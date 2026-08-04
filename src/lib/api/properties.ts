import { CreatePropertyPayload, Property, UpdatePropertyPayload } from "@/types/property";

export async function createProperty(payload: CreatePropertyPayload) {
  const res = await fetch("/api/landlord/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to create property");
  }

  return data;
}

export async function updateProperty(payload: UpdatePropertyPayload, id: number) {
    const res = await fetch(`/api/landlord/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update property");
  }

  return data;
};

export async function getLandlordProperties(): Promise<Property[]> {
  const res = await fetch("/api/landlord/landlord-properties");
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load properties");
  }

  return json.data as Property[];
}