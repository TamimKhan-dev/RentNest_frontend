import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/service/serverFetch";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const endpoint = `/api/${path.join("/")}${req.nextUrl.search}`;

  const res = await serverFetch(endpoint);

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}


export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const endpoint = `/api/${path.join("/")}`;

  const body = await req.text();

  const res = await serverFetch(endpoint, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const endpoint = `/api/${path.join("/")}`;

  const body = await req.text();

  const res = await serverFetch(endpoint, {
    method: "PATCH",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const endpoint = `/api/${path.join("/")}`;

  const body = await req.text();

  const res = await serverFetch(endpoint, {
    method: "PUT",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const endpoint = `/api/${path.join("/")}`;

  const res = await serverFetch(endpoint, {
    method: "DELETE",
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}