import React from 'react'
import ActionCell from './actionCell'
import { Status } from '../../tenant/page';

type RentalRequest = {
  property: string;
  location: string;
  image: string;
  rent: string;
  requestedDate: string;
  status: Status;
};

const requests: RentalRequest[] = [
  {
    property: "Emerald Heights Suite",
    location: "Gulshan 2, Dhaka",
    image: "https://picsum.photos/seed/emerald-heights/80/80",
    rent: "$450/mo",
    requestedDate: "Oct 24, 2023",
    status: "APPROVED",
  },
  {
    property: "Nordic Glow Studio",
    location: "Banani, Dhaka",
    image: "https://picsum.photos/seed/nordic-glow/80/80",
    rent: "$320/mo",
    requestedDate: "Oct 22, 2023",
    status: "PENDING",
  },
  {
    property: "Azure Sky Condos",
    location: "Dhanmondi, Dhaka",
    image: "https://picsum.photos/seed/azure-sky/80/80",
    rent: "$650/mo",
    requestedDate: "Oct 20, 2023",
    status: "ACTIVE",
  },
  {
    property: "Gardenia Sanctuary",
    location: "Uttara, Dhaka",
    image: "https://picsum.photos/seed/gardenia-sanctuary/80/80",
    rent: "$380/mo",
    requestedDate: "Oct 18, 2023",
    status: "REJECTED",
  },
  {
    property: "Industrial Loft Space",
    location: "Banani, Dhaka",
    image: "https://picsum.photos/seed/industrial-loft-2/80/80",
    rent: "$380/mo",
    requestedDate: "Oct 15, 2023",
    status: "COMPLETED",
  },
  {
    property: "Industrial Space",
    location: "Banani, Dhaka",
    image: "https://picsum.photos/seed/industrial-loft-2/80/80",
    rent: "$380/mo",
    requestedDate: "Oct 15, 2023",
    status: "COMPLETED",
  },
  {
    property: "Industrial Loft",
    location: "Banani, Dhaka",
    image: "https://picsum.photos/seed/industrial-loft-2/80/80",
    rent: "$380/mo",
    requestedDate: "Oct 15, 2023",
    status: "COMPLETED",
  },
];

const statusStyles: Record<Status, string> = {
  APPROVED: "bg-[#e0e7ff] text-[#4338ca]",
  PENDING: "bg-[#fef3c7] text-[#b45309]",
  ACTIVE: "bg-[#d7f5e9] text-[#006c49]",
  REJECTED: "bg-[#ffdad6] text-[#ba1a1a]",
  COMPLETED: "bg-[#dbeafe] text-[#1d4ed8]",
};

export default function OverviewTable() {
  return (
    <div className="bg-white border border-[#e5eeff] overflow-auto max-h-115">
        <table className="w-full min-w-180 text-sm">
          <thead>
            <tr className="bg-[#eff4ff] text-[10px] uppercase tracking-wide text-[#515f74]">
              <th className="text-left font-semibold px-4 py-3">Property</th>
              <th className="text-left font-semibold px-4 py-3">Location</th>
              <th className="text-left font-semibold px-4 py-3">
                Monthly Rent
              </th>
              <th className="text-left font-semibold px-4 py-3">
                Requested Date
              </th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-left font-semibold px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.property}
                className="border-t border-[#e5eeff] hover:bg-[#f8f9ff] transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={req.image}
                      alt={req.property}
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                    <span className="font-semibold text-[#0b1c30] whitespace-nowrap">
                      {req.property}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                  {req.location}
                </td>
                <td className="px-4 py-3 font-semibold text-[#006c49] whitespace-nowrap">
                  {req.rent}
                </td>
                <td className="px-4 py-3 text-[#515f74] whitespace-nowrap">
                  {req.requestedDate}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusStyles[req.status]}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ActionCell status={req.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}
