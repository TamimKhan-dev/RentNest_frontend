"use server";

import { LoginFormData, RegisterFormData } from "@/lib/schema/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (data: LoginFormData) => {

  const payload = {
    ...data
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      path: "/"
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 7 day
      sameSite: "lax",
      path: "/"
    });

    redirect("/");
  }

  return result;
};

export const registerAction = async (data: RegisterFormData) => {
  const payload = { 
    ...data
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();

  return result;
};
