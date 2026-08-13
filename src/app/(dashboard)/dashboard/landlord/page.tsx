"use client";

import { useState } from "react";
import {
  Home,
  CheckSquare,
  ClipboardList,
  Wallet,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLandlordProperties } from "@/hooks/useLandlordProperties";
import { Property } from "@/types/property";
import DeletePropertyDialog from "../../_components/landlord/deletePropertyModal";
import PropertyUpdateModal, {
  type EditablePropertyData,
} from "../../_components/landlord/propertyUpdateModal";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default function OverviewMyProperties() {
  const { data: properties = [], isLoading, isError } = useLandlordProperties();

  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [editTarget, setEditTarget] = useState<EditablePropertyData | null>(null);

  const openEdit = (property: Property) => {
    setEditTarget({
      id: property.id,
      title: property.title,
      description: property.description,
      price: String(property.price),
      location: property.location,
      categoryId: String(property.categoryId),
      amenities: property.amenities,
      isAvailable: property.isAvailable,
    });
  };

  const totalProperties = properties.length;
  const availableProperties = properties.filter((p) => p.isAvailable).length;

  const stats = [{
      label: "Total Properties",
      value: totalProperties,
      icon: Home,
      bg: "bg-[#dbeafe]",
      iconColor: "text-[#1d4ed8]",
    },
    {
      label: "Available Properties",
      value: availableProperties,
      icon: CheckSquare,
      bg: "bg-[#d7f5e9]",
      iconColor: "text-[#006c49]",
    },
    {
      label: "Active Rental Requests",
      value: "0", 
      icon: ClipboardList,
      bg: "bg-[#fef3c7]",
      iconColor: "text-[#b45309]",
    },
    {
      label: "Monthly Earnings",
      value: "45,000", 
      icon: Wallet,
      bg: "bg-[#ffdad6]",
      iconColor: "text-[#ba1a1a]",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-1">
          Overview &amp; My Properties
        </h1>
        <p className="text-sm text-[#515f74]">
          Manage your property listings and monitor their current status.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, bg, iconColor }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-[#e5eeff] p-4"
          >
            <div
              className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}
            >
              <Icon size={18} className={iconColor} />
            </div>
            <p className="text-xs font-medium text-[#515f74] mb-1">{label}</p>
            <p className="text-xl font-bold text-[#0b1c30]">{value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-t-2xl border border-b-0 border-[#e5eeff] p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />
          <Input
            placeholder="Search properties..."
            className="pl-9 h-auto py-2.5 rounded-lg border-[#e5eeff] bg-[#f8f9ff]"
          />
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Select defaultValue="all">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-38">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-35">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Availability</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="newest">
            <SelectTrigger className="h-auto py-2.5 rounded-lg border-[#e5eeff] text-sm w-32.5">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Sort by: Newest</SelectItem>
              <SelectItem value="oldest">Sort by: Oldest</SelectItem>
              <SelectItem value="rent-high">Rent: High to Low</SelectItem>
              <SelectItem value="rent-low">Rent: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-2xl border border-[#e5eeff] max-h-120 overflow-y-auto overflow-x-auto">
        {isLoading && (
          <p className="text-sm text-[#515f74] p-4 flex gap-2 items-center"><Spinner /> Loading properties...</p>
        )}

        {isError && (
          <p className="text-sm text-red-500 p-4">
            Failed to load properties. Please try again.
          </p>
        )}

        {!isLoading && !isError && properties.length === 0 && (
          <p className="text-sm text-[#515f74] p-4">
            You haven&apos;t listed any properties yet.
          </p>
        )}

        {!isLoading && !isError && properties.length > 0 && (
          <table className="w-full min-w-215 text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
                <th className="text-left font-semibold px-4 py-3">Property</th>
                <th className="text-left font-semibold px-4 py-3">Location</th>
                <th className="text-left font-semibold px-4 py-3">
                  Monthly Rent
                </th>
                <th className="text-left font-semibold px-4 py-3">Category</th>
                <th className="text-left font-semibold px-4 py-3">
                  Availability
                </th>
                <th className="text-left font-semibold px-4 py-3">
                  Created Date
                </th>
                <th className="text-left font-semibold px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-t border-[#e5eeff] hover:bg-[#f8f9ff] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={property.image ?? "https://i.ibb.co.com/QFWY3SYV/no-image.webp"}
                        alt={property.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                        width={100}
                        height={100}
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1d4ed8] whitespace-nowrap">
                          {property.title}
                        </p>
                        <p className="text-xs text-[#94a3b8] truncate max-w-50">
                          {property.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                    {property.location}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#0b1c30] whitespace-nowrap">
                    ${property.price}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-[#eff4ff] text-[#1d4ed8] text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                      {property.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                        property.isAvailable
                          ? "bg-[#d7f5e9] text-[#006c49]"
                          : "bg-[#ffdad6] text-[#ba1a1a]"
                      }`}
                    >
                      {property.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                    {new Date(property.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Edit property"
                        onClick={() => openEdit(property)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-[#eff4ff] text-[#1d4ed8] hover:bg-[#dbeafe] transition-colors cursor-pointer"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        aria-label="Delete property"
                        onClick={() =>
                          setDeleteTarget({ id: property.id, name: property.title })
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-[#fef3c7] text-[#b45309] hover:bg-[#fde68a] transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <DeletePropertyDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        propertyId={deleteTarget?.id ?? null}
        propertyName={deleteTarget?.name}
      />

      <PropertyUpdateModal
        open={editTarget !== null}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null);
        }}
        property={editTarget}
      />
    </div>
  );
}