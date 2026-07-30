import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { getMe } from '@/service/getMe';
import React from 'react'

export default async function layout({children}: {children: React.ReactNode}) {
  const user = await getMe();
  return (
    <div className='flex flex-col'>
      <Navbar user={user}/>
      <div className='flex-1 w-full'>
        {children}
      </div>
      <Footer />
      </div>
  )
}
