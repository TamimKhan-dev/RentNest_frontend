"use client";

import Link from "next/link";
import RegisterForm from "../_components/registerForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
      <div className="w-full max-w-120 bg-white rounded-[24px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden border border-[#bbcabf]/20">
        <div className="h-48 w-full relative bg-[#e5eeff]">
          <Image
            src="https://i.ibb.co.com/r2VMX37K/Property-Image.jpg"
            alt="Property"
            className="h-full w-full object-cover"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-linear-to-t from-white to-transparent" />
        </div>

        <div className="px-8 pb-10 -mt-8 relative z-10">
          <div className="mb-8">
            <h1 className="font-bold text-[30px] leading-tight text-[#0b1c30] mb-2">
              Join Person Name
            </h1>
            <p className="text-[#515f74] text-base">
              Start your seamless property journey today.
            </p>
          </div>

          {/*Register Form */}
          <RegisterForm />

          {/* Redirect to Login */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#515f74]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#006c49] font-semibold hover:underline transition-all"
              >
                Login instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}