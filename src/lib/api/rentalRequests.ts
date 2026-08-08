import { RentalRequest } from "@/types/rentalRequest";

export async function rentalRequestAction(action: string, id: number) {
  const res = await fetch(`/api/landlord/requests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: action }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || `Failed to ${action} this rental-request`);
  }

  return data;
}

export async function getRentalRequests() {
  const res = await fetch("/api/landlord/requests");
  if (!res.ok) throw new Error("Failed to load rental-requests");
  const json = await res.json();
  return json.data as RentalRequest[];
}
