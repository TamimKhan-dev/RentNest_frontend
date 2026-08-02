import { cookies } from "next/headers";

export const serverFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}${endpoint}`,
    {
      ...options,
      headers,
      cache: "no-store",
    }
  );

  return res;
};