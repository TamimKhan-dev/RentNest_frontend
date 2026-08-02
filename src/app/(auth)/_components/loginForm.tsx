"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { LoginFormData, loginSchema } from "@/lib/schema/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [state, formAction, pending] = useActionState(loginAction, false);

  // useEffect(() => {
  //   if (!state) return;

  //   if (!state.success) {
  //     toast.error(state.message || "Login failed")
  //   };
  // }, [state]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema)});

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginAction(data);

    if (!result.success) {
      toast.error(result.message || "Login failed")
    } 
    console.log(result);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-[#515f74]">
          Email Address
        </Label>
        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#515f74]/40 pointer-events-none"
            size={20}
          />
          <Input
            id="email"
            { ...register('email', { required: true })}
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            className="pl-12 pr-4 py-3 h-auto rounded-lg border-[#6c7a71] focus-visible:ring-4 focus-visible:ring-[#10b981]/20 focus-visible:border-[#006c49]"
          />
        </div>
        {errors.email && (
          <span className="text-red-400 text-xs">{errors.email?.message}</span>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-[#515f74]"
          >
            Password
          </Label>
          <a
            href="#"
            className="text-xs font-semibold text-[#006c49] hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#515f74]/40 pointer-events-none"
            size={20}
          />
          <Input
            id="password"
            { ...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className="pl-12 pr-12 py-3 h-auto rounded-lg border-[#6c7a71] focus-visible:ring-4 focus-visible:ring-[#10b981]/20 focus-visible:border-[#006c49]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#515f74]/40 hover:text-[#515f74] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-400 text-xs">{errors.password?.message}</span>
        )}
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-[#00422b] cursor-pointer font-semibold text-lg py-4 h-auto rounded-xl shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
      >
        {isSubmitting ? <Spinner /> : "Login"}
      </Button>

      {/* Divider */}
      <div className="relative flex items-center py-4">
        <div className="grow border-t border-[#bbcabf]/30" />
        <span className="shrink mx-4 text-xs text-[#515f74]/40 uppercase tracking-widest">
          Or continue with
        </span>
        <div className="grow border-t border-[#bbcabf]/30" />
      </div>

      {/* Social Login */}
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-3 border-[#6c7a71] hover:bg-[#eff4ff] py-3.5 h-auto rounded-xl font-semibold text-sm text-[#515f74] hover:shadow-sm active:scale-95 cursor-pointer"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </Button>
    </form>
  );
}
