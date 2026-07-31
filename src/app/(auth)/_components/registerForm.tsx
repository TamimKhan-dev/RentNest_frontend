"use client";

import { User, Mail, Lock, UserCog, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { registerAction } from "../_actions/authActions";
import { toast } from "sonner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerAction(data);

    if (result.success) {
      toast.success("User Registered Successfully!");
    } else {
      toast.error(result.message);
    };
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold text-[#0b1c30]">
          Full Name
        </Label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c7a71] pointer-events-none"
            size={20}
          />
          <Input
            id="name"
            {...register("name", { required: true })}
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            className="pl-10 pr-4 py-3 h-auto rounded-xl border-[#bbcabf] focus-visible:ring-4 focus-visible:ring-[#10b981]/10 focus-visible:border-[#10b981]"
          />
        </div>
        {errors.name && (
          <span className="text-red-400 text-xs">{errors.name?.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-[#0b1c30]">
          Email Address
        </Label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c7a71] pointer-events-none"
            size={20}
          />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", { required: true })}
            placeholder="name@example.com"
            className="pl-10 pr-4 py-3 h-auto rounded-xl border-[#bbcabf] focus-visible:ring-4 focus-visible:ring-[#10b981]/10 focus-visible:border-[#10b981]"
          />
        </div>
        {errors.email && (
          <span className="text-red-400 text-xs">{errors.email?.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-semibold text-[#0b1c30]"
        >
          Password
        </Label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c7a71] pointer-events-none"
            size={20}
          />
          <Input
            id="password"
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            className="pl-10 pr-10 py-3 h-auto rounded-xl border-[#bbcabf] focus-visible:ring-4 focus-visible:ring-[#10b981]/10 focus-visible:border-[#10b981]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6c7a71] hover:text-[#0b1c30] transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-400 text-xs">
            {errors.password?.message}
          </span>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-semibold text-[#0b1c30]">
          I am a...
        </Label>
        <div className="relative">
          <UserCog
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c7a71] pointer-events-none z-10"
            size={20}
          />
          <Controller
            name="role"
            control={control}
            defaultValue="Tenant"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="role"
                  className="w-full pl-10 pr-4 py-3 h-auto rounded-xl border-[#bbcabf] focus:ring-4 focus:ring-[#10b981]/10 focus:border-[#10b981]"
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tenant">Tenant</SelectItem>
                  <SelectItem value="Landlord">Landlord</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {errors.role && (
          <span className="text-red-400 text-xs">{errors.role?.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white font-semibold text-lg py-4 h-auto rounded-xl shadow-md shadow-[#10b981]/20 hover:scale-[1.01] active:scale-95 transition-all mt-2 cursor-pointer"
      >
        {isSubmitting ? <Spinner /> : "Create Account"}
      </Button>
    </form>
  );
}
