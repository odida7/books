'use client'

import { deletePost } from '@/lib/actions/post.actions';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default async function page({params}) {
  const router = useRouter()
  const { data: session, status } = useSession(); 
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);


  
  if (status === "unauthenticated") {
    router.replace("/login");
  }

  const id = params?.id;

  const handledelete = async()=>{
    
    try{
      const res = await deletePost(id);

      if(res.status === 200){
        setError(null);
      router.replace('/');
    }
   
    }catch(err){
      MongoSystemError(`Error deleting post${err.message}`)
    } finally {
      setDeleting(false);
    }
  }


  return (
    <div className='flex flex-col items-center justify-center m-12'>
       <span className='p-5 rounded-sm bg-red-500 w-1/2 text-center text-white font-light text-xl'>
        Are you sure you want to delete this book
       </span>

       <div className='flex flex-row justify-between items-center w-1/2'>
        
          <button 
            onClick={()=>{handledelete()}}
            className='m-2 p-2 bg-slate-400 rounded-md hover:bg-slate-300 text-sm font-medium'
            disabled={deleting}
          >
            {deleting ? 'deleting...' : 'Delete'}
          </button>
       
        
        <Link href={`/book/${id}`}>
          <button className='m-2 p-2 bg-slate-400 rounded-md hover:bg-slate-300 text-sm font-medium'>
            No
          </button>
        </Link>

          {error && (
          <p className='text-red-500 text-sm mt-2'>{`Error: ${error}`}</p>
        )}
      </div>
       
    </div>
  )
}
