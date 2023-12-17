'use client'

import { createPost } from '@/lib/actions/post.actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {

  const router = useRouter();
  const { data: session, status } = useSession(); 

  if (status === "unauthenticated") {
    router.replace("/login");
  }

  const user = session?.user?._id;
  console.log('id:', user);
  
  const [formData, setFormData] = useState({
    text: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
     
    }));
  };


   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     if (user){
   
        setLoading(true);
        const res = await createPost({
          userId: user,   
          text: formData.text, 
          createdAt: new Date(),
        });
        if (res.status === 200) {
          // Clear the form and reset state
          setFormData({ text: '' });
          setError(null);
          router.replace('/');
        } else {
          setError('Failed to create post. Please try again.');
        }
    }
    } catch (error) {
      setError(`Error creating post: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <h1 className='text-center p-4 text-xl text-slate-700 font-semibold'>
        Create a new Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center m-2 p-4 shadow-xl bg-slate-300 w-1/2 rounded-sm gap-4'
      >
        <textarea
          name='text'
          placeholder='Publish a Book'
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
          {loading ? 'Creating...' : 'Create'}
        </button>

        {error && (
          <p className='text-red-500 text-sm mt-2'>{`Error: ${error}`}</p>
        )}
      </form>
    </div>
  )
}
