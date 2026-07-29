import { User, Mail, Lock, UserCog } from "lucide-react";
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

export default function RegisterForm() {
  return (
    <form className="space-y-6">
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
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="John Doe"
            className="pl-10 pr-4 py-3 h-auto rounded-xl border-[#bbcabf] focus-visible:ring-4 focus-visible:ring-[#10b981]/10 focus-visible:border-[#10b981]"
          />
        </div>
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
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
            className="pl-10 pr-4 py-3 h-auto rounded-xl border-[#bbcabf] focus-visible:ring-4 focus-visible:ring-[#10b981]/10 focus-visible:border-[#10b981]"
          />
        </div>
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
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="pl-10 pr-4 py-3 h-auto rounded-xl border-[#bbcabf] focus-visible:ring-4 focus-visible:ring-[#10b981]/10 focus-visible:border-[#10b981]"
          />
        </div>
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
          <Select name="role" defaultValue="tenant">
            <SelectTrigger
              id="role"
              className="w-full pl-10 pr-4 py-3 h-auto rounded-xl border-[#bbcabf] focus:ring-4 focus:ring-[#10b981]/10 focus:border-[#10b981]"
            >
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tenant">Tenant</SelectItem>
              <SelectItem value="landlord">Landlord</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white font-semibold text-lg py-4 h-auto rounded-xl shadow-md shadow-[#10b981]/20 hover:scale-[1.01] active:scale-95 transition-all mt-2"
      >
        Create Account
      </Button>
    </form>
  );
}
