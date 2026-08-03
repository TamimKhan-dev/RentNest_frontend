export type CreatePropertyPayload = {
  title: string;
  description: string;
  location: string;
  price: number;
  categoryId: number;
  isAvailable: boolean;
  amenities: string[];
  image: string | null;
};

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