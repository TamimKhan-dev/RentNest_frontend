import { Switch } from "@/components/ui/switch";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, DollarSign } from "lucide-react";
import { PropertyFormData } from "../../dashboard/landlord/properties/new/page";
import { useQuery } from "@tanstack/react-query";

type PropertyInformationProps = {
  register: UseFormRegister<PropertyFormData>;
  control: Control<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
};

export default function PropertyInformation({
  errors,
  register,
  control,
}: PropertyInformationProps) {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/properties/categories");
      if (!res.ok) throw new Error("Failed to load categories");
      const json = await res.json();
      return json.data as { id: number; name: string }[];
    },
  });


  return (
    <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 mb-6">
      <h2 className="flex items-center gap-2 font-bold text-lg text-[#0b1c30] mb-5">
        <Building2 size={18} className="text-[#006c49]" />
        Property Information
      </h2>

      <div className="flex flex-col gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#0b1c30]">
            Property Title
          </label>
          <Input
            {...register("title", { required: "Title is required." })}
            placeholder="e.g., Luxury Penthouse with City View"
            className="h-auto py-2.5 rounded-lg border-[#bbcabf]"
          />
          {errors.title && (
            <span className="text-red-400 text-xs">{errors.title.message}</span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#0b1c30]">
            Description
          </label>
          <Textarea
            {...register("description")}
            placeholder="Describe the unique features of your property..."
            rows={4}
            className="resize-none rounded-lg border-[#bbcabf]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Location
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
              />
              <Input
                {...register("location")}
                placeholder="Full Address"
                className="pl-9 h-auto py-2.5 rounded-lg border-[#bbcabf]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Monthly Rent
            </label>
            <div className="relative">
              <DollarSign
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
              />
              <Input
                {...register("price")}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-9 h-auto py-2.5 rounded-lg border-[#bbcabf]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Property Category
            </label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Please select a category" }}
              render={({ field }) => (
                <Select value={String(field.value)} onValueChange={field.onChange}>
                  <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#bbcabf] cursor-pointer">
                    <SelectValue
                      placeholder={
                        categoriesLoading ? "Loading..." : "Select a category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="bg-[#eff4ff] rounded-lg p-3.5 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#0b1c30] mb-0.5">
                Availability Status
              </p>
              <p className="text-xs text-[#515f74]">
                Set if this property is ready for rent.
              </p>
            </div>
            <Controller
              name="available"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="shrink-0 mt-0.5"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
