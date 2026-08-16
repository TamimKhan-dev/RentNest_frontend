import { PropertyQueries } from "@/types/publicTypes";

export async function getAllPublicProperties(params?: PropertyQueries) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.location) searchParams.set("location", params.location);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.minPrice) searchParams.set("minPrice", String(params.minPrice));
  if (params?.maxPrice) searchParams.set("maxPrice", String(params.maxPrice));
  if (params?.amenities) searchParams.set("amenities", params.amenities);

  const res = await fetch(`/api/properties?${searchParams.toString()}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load Public Properties");
  }

  return json.data;
}

export async function getCategories() {
  const res = await fetch("/api/properties/categories");
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to load Categories");
  }

  return json.data;
}

export async function getSingleProperty(id: number) {
  const res = await fetch(`/api/properties/${id}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message || "Failed to load Property");
  }

  return json.data;
}

export async function sendBookingRequests(propertyId: number) {
  const res = await fetch("/api/rentals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ propertyId }),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to send booking request!");
  }

  return json;
}
