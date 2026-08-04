"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  MapPin,
  Wifi,
  ParkingSquare,
  Snowflake,
  UtensilsCrossed,
  WashingMachine,
  type LucideIcon,
  DoorOpen,
  ShieldCheck,
  PawPrint,
  Trees,
  ArrowUpDown,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type EditPropertyFormData = {
  title: string;
  description: string;
  price: string;
  location: string;
  category: string;
};

export type EditablePropertyData = EditPropertyFormData & {
  id: number;
  amenities: string[];
};

const amenitiesList: { label: string; icon: LucideIcon }[] = [
  { label: "WiFi", icon: Wifi },
  { label: "Parking", icon: ParkingSquare },
  { label: "Kitchen", icon: UtensilsCrossed },
  { label: "AC", icon: Snowflake },
  { label: "Balcony", icon: DoorOpen },
  { label: "Laundry", icon: WashingMachine },
  { label: "Security", icon: ShieldCheck },
  { label: "Pets", icon: PawPrint },
  { label: "Garden", icon: Trees },
  { label: "Elevator", icon: ArrowUpDown },
];

export default function PropertyUpdateModal({
  open,
  onOpenChange,
  property,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: EditablePropertyData | null;
  onSave?: (data: EditablePropertyData) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<EditPropertyFormData>({
    values: property
      ? {
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          category: property.category,
        }
      : undefined,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/properties/categories");
      if (!res.ok) throw new Error("Failed to load categories");
      const json = await res.json();
      return json.data as { id: number; name: string }[];
    },
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    property?.amenities ?? [],
  );

  const [lastPropertyId, setLastPropertyId] = useState<number | null>(null);
  if (property && property.id !== lastPropertyId) {
    setLastPropertyId(property.id);
    setSelectedAmenities(property.amenities);
  }

  const toggleAmenity = (label: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label],
    );
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onSubmit = (data: EditPropertyFormData) => {
    // if (!property) return;
    // onSave?.({ ...property, ...data, amenities: selectedAmenities });
    // handleOpenChange(false);

    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-115 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0b1c30]">
            Edit Property
          </DialogTitle>
          <DialogDescription className="text-sm text-[#515f74]">
            Update your property information to keep listings accurate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Property Title
            </label>
            <Input
              {...register("title", { required: true })}
              className="h-auto py-2.5 rounded-lg border-[#bbcabf]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Description
            </label>
            <Textarea
              {...register("description")}
              rows={4}
              className="resize-none rounded-lg border-[#bbcabf]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="pl-9 h-auto py-2.5 rounded-lg border-[#bbcabf]"
                />
              </div>
            </div>

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
                  className="pl-9 h-auto py-2.5 rounded-lg border-[#bbcabf]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Category
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => {
                const selected = categories?.find(
                  (c) => String(c.id) === field.value || c.name === field.value,
                );

                return (
                  <Select
                    value={selected ? String(selected.id) : undefined}
                    onValueChange={field.onChange}
                    disabled={categoriesLoading}
                  >
                    <SelectTrigger className="w-full h-auto py-2.5 rounded-lg border-[#bbcabf]">
                      <SelectValue
                        placeholder={
                          categoriesLoading
                            ? "Loading categories..."
                            : "Select a category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0b1c30]">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map(({ label, icon: Icon }) => {
                const selected = selectedAmenities.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleAmenity(label)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                      selected
                        ? "bg-[#006c49] border-[#006c49] text-white"
                        : "bg-white border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff]"
                    }`}
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="border-[#bbcabf] text-[#0b1c30] cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold rounded-lg px-5 cursor-pointer"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
