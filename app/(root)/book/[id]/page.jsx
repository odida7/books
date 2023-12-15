
import { fetchPost } from '@/lib/actions/post.actions'
import Link from 'next/link';
import React from 'react'


export default async function page({ params }) {
  const id = params?.id;
  console.log('paramId:', id);

  const result = await fetchPost(id);
  console.log('result:', result);

  const posts = result?.post; // Assuming result has a 'post' property

  return (
    <div className='flex flex-col m-4 items-center justify-center'>
      <h1 className='text-slate-600 text-4xl font-bold'>Book Page</h1>

      <div className='flex w-full justify-center mt-10'>
        <div className='flex flex-col bg-gray-700 w-1/2 p-4 m-4 rounded-md text-white tex-xl font-bold'>
          
          <span className='text-center m-8'>{posts?.text}</span>
     
          <div className='flex flex-row w-full justify-between items-center'>
            <span>{posts?.userId}</span>
           
            <span>{posts?.createdAt.toLocaleString()}</span>
          </div> 
        
        </div>
      </div>

      <div className='flex flex-row justify-between items-center w-1/2'>
        <Link href={`/update/${id}`}>
          <button className='m-2 p-2 bg-slate-400 rounded-md hover:bg-slate-300 text-sm font-medium'>
           Update
          </button>
        </Link>
        
        <Link href={`/delete/${id}`}>
          <button className='m-2 p-2 bg-slate-400 rounded-md hover:bg-slate-300 text-sm font-medium'>
            Delete
          </button>
        </Link>
      </div>
      

    </div>
  );
}
