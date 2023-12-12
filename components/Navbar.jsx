'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'


export default function Navbar() {
  
 const {data: session, status} = useSession();
const router = useRouter();
  if (status === "unauthenticated") {
    router.replace("/login");
  }

  return (
    <div className='bg-gray-100 flex flex-row items-center justify-between shadow-sm shadow-gray-300 static z-10'>
        <div className='flex flex-row items-center gap-4 p-2'>

         <Link href={'/'}>
            <h1 className='text-xl text-slate-600 font-bold'>
                Books
            </h1>
         </Link>
          
         <Link href={'/newBook'}>
          <span className='hover:bg-gray-300 p-1 rounded-lg text-slate-700 bg-gray-200'>New Book</span>  
         </Link> 
        </div>

        <div className='flex flex-row items-center gap-4 p-2'>
            <Link href={'/user'}>
             <span className='text-slate-600 font-semibold'>{session?.user?.name} </span>  
            </Link>

            <button 
              onClick={()=> signOut({redirect: true})}
               className='bg-slate-100 text-sm font-light text-slate-500 p-1 sm:p-2 hover:bg-red-600 hover:text-white rounded-full'
            >
                Logout
            </button>
        </div>
      
    </div>
  )
}
