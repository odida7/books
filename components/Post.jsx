
import { fetchAllUsers } from '@/lib/actions/user.actions';
import React from 'react';


export default async function Post({_id, userId, text, createdAt}) {

  const users = await fetchAllUsers();
  console.log(users)
   

  return (
    <div className='flex w-full justify-center '>
      <div className='flex flex-col bg-gray-700 p-4 m-4 rounded-md text-white tex-xl font-bold w-1/2'>

       <span className='text-center m-8'>{text}</span>

       <div className='flex flex-row w-full justify-between items-center'>
        <span>{userId}</span>
        <span>{createdAt}</span>
       </div> 
    </div>
    </div>
    
  );
}