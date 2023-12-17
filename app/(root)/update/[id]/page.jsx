'use client'

import { updatePost } from '@/lib/actions/post.actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default async function page({params}) {
  const router = useRouter();
  const id = params?.id;

   const [formData, setFormData] = useState({
    text: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 


  const handleChange = (e) => {
    setFormData((prevFormData)=>({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleUpdate = async(e)=>{
    e.preventDefault();

    try{
        setLoading(true);

      const res = await updatePost(id, formData)
      if (res.status === 200){
          setError(null);
        router.replace('/')
      }
    }catch(err){
      console.log(err.message);
      setError(`Error creating post: ${err.message}`);
      

    }
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <h1 className='text-center p-4 text-xl text-slate-700 font-semibold'>
        Upadte your book
      </h1>

      <form
        onSubmit={handleUpdate}
        className='flex flex-col items-center justify-center m-2 p-4 shadow-xl bg-slate-300 w-1/2 rounded-sm gap-4'
      >
        <textarea
          name='text'
          placeholder='update a Book'
        
          onChange={handleChange}
          value={formData.text}
          rows={5}
          cols={20}
          className='w-full outline-none'
        />

        <button
          type='submit'
          className='w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-300'
          disabled={loading}
        >
          {loading ? 'updating...' : 'update'}
        </button>

        {error && (
          <p className='text-red-500 text-sm mt-2'>{`Error: ${error}`}</p>
        )}
      </form>
    </div>
  )
}
