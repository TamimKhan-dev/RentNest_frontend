"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  CheckCircle2,
  ImageIcon,
  UploadCloud,
  X,
  Wifi,
  ParkingSquare,
  UtensilsCrossed,
  Snowflake,
  DoorOpen,
  WashingMachine,
  ShieldCheck,
  PawPrint,
  Trees,
  ArrowUpDown,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import PropertyInformation from "@/app/(dashboard)/_components/landlord/propertyInformation";
import { uploadImageToCloud } from "@/utils/uploadImageToCloud";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { useCreateProperty } from "@/hooks/useCreateProperty";

export type PropertyFormData = {
  title: string;
  description: string;
  location: string;
  price: string;
  categoryId: string;
  isAvailable: boolean;
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

const MAX_IMAGE_MB = 10;

export default function AddNewPropertyPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
      categoryId: "",
      isAvailable: false,
    },
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAmenity = (label: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const setFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0]; 

    const isValid =
      ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
      file.size <= MAX_IMAGE_MB * 1024 * 1024;
    if (!isValid) return;
    if (image) URL.revokeObjectURL(image.preview);

    setImage({ file, preview: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    if (image) URL.revokeObjectURL(image.preview);
    setImage(null);
  };

  const { mutateAsync: createPropertyMutation } = useCreateProperty();

  const onSubmit = async (data: PropertyFormData) => {
    const imageUrl = image ? await uploadImageToCloud(image.file) : null;
    console.log("categoryId: " + Number(data.categoryId));

    const payload = {
      ...data,
      categoryId: Number(data.categoryId),
      amenities: selectedAmenities,
      image: imageUrl,
      price: parseFloat(data.price)
    };

    await createPropertyMutation(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-180 mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
          Add New Property
        </h1>
        <p className="text-sm text-[#515f74]">
          Create a new rental listing for tenants to discover.
        </p>
      </div>

      {/* Property Information */}
      <PropertyInformation errors={errors} register={register} control={control} />

      {/* Amenities */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 mb-6">
        <h2 className="flex items-center gap-2 font-bold text-lg text-[#0b1c30] mb-5">
          <CheckCircle2 size={18} className="text-[#006c49]" />
          Amenities
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {amenitiesList.map(({ label, icon: Icon }) => {
            const selected = selectedAmenities.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleAmenity(label)}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border text-xs font-medium transition-colors ${
                  selected
                    ? "bg-[#d7f5e9] border-[#006c49] text-[#006c49]"
                    : "bg-white border-[#e5eeff] text-[#515f74] hover:bg-[#f8f9ff]"
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Image */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 mb-6">
        <h2 className="flex items-center gap-2 font-bold text-lg text-[#0b1c30] mb-5">
          <ImageIcon size={18} className="text-[#006c49]" />
          Property Image
        </h2>

        {!image ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              setFile(e.dataTransfer.files);
            }}
            className={`flex flex-col items-center justify-center text-center border-2 border-dashed rounded-xl py-10 px-4 transition-colors ${
              isDragging
                ? "border-[#006c49] bg-[#eaf6f0]"
                : "border-[#dbe4f5] bg-[#f8f9ff]"
            }`}
          >
            <UploadCloud size={28} className="text-[#94a3b8] mb-3" />
            <p className="text-sm font-semibold text-[#0b1c30] mb-1">
              Drag and drop an image here
            </p>
            <p className="text-xs text-[#515f74] mb-4">
              Supported formats: JPG, PNG, WEBP (Max {MAX_IMAGE_MB}MB)
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-[#bbcabf] text-[#0b1c30] h-auto py-2 px-5 rounded-lg"
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={(e) => setFile(e.target.files)}
            />
          </div>
        ) : (
          <div className="relative w-40 aspect-square rounded-lg overflow-hidden border border-[#e5eeff] group">
            <Image
              src={image.preview}
              alt="Property"
              className="w-full h-full object-cover"
              width={300}
              height={300}
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove image"
              className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pb-10">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold h-auto py-3 px-8 rounded-xl cursor-pointer"
        >
          {isSubmitting ? <><Spinner /> Creating...</> : "Create Property"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto border-[#bbcabf] text-[#0b1c30] font-semibold h-auto py-3 px-8 rounded-xl"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}