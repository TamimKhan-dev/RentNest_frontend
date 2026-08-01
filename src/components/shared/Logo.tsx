import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 px-2">
        <div className="w-8 h-8 rounded-lg bg-[#006c49] flex items-center justify-center">
          <Home size={16} className="text-white" />
        </div>
        <span className="font-bold text-lg text-[#0b1c30]">RentNest</span>
      </div>
    </Link>
  )
}
