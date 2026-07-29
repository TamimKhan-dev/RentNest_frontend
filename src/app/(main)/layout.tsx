import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex-1 w-full'>
        {children}
      </div>
      <Footer />
      </div>
  )
}
