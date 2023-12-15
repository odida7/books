
//import { fetchAllUsers } from '@/lib/actions/user.actions';
import Link from 'next/link';
import React from 'react';


export default async function Post({_id, userId, text, createdAt}) {

 // const users = await fetchAllUsers();
    

  return (
    <div className='flex w-full justify-center'>
      <Link href={`/book/${_id}`} className='w-1/2'>
        <div className='flex flex-col bg-gray-700 p-4 m-4 rounded-md text-white tex-xl font-bold'>
          
          <span className='text-center m-8'>{text}</span>
     
          <div className='flex flex-row w-full justify-between items-center'>
            <span>{userId}</span>
           
            <span>{createdAt}</span>
          </div> 
        
        </div>
      </Link>
    </div>
    
  );
}