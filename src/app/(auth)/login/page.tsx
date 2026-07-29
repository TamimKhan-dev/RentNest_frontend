"use client";

import Link from "next/link";
import LoginForm from "../_components/loginForm";

export default function LoginPage() {
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
      <div className="w-full max-w-120 bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-8 md:p-10 border border-[#bbcabf]/20">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-bold text-[30px] leading-tight text-[#515f74] mb-2">
            Welcome Back
          </h1>
          <p className="text-[#515f74]/70 text-base">
            Enter your credentials to access your portal
          </p>
        </div>

        {/*Login Form */}
        <LoginForm />

        <p className="mt-8 text-center text-sm text-[#515f74]/70">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="text-sm font-semibold text-[#006c49] hover:underline ml-1"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}