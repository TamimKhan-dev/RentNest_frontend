import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { getMe } from '@/service/getMe';
import { headers } from 'next/headers';
import React from 'react'

export default async function layout({children}: {children: React.ReactNode}) {
  const user = await getMe();
  const userRole = (await headers()).get("userRole") ?? "";
  return (
    <div className='flex flex-col'>
      <Navbar user={user} userRole={userRole}/>
      <div className='flex-1 w-full'>
        {children}
      </div>
      <Footer />
      </div>
  )
}
