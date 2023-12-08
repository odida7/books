  'use server'

import Post from "../models/post.models";
import User from "../models/user.models";
import { connectDB } from "../mongoose";


/////////////////create post
  export const createPost = async(formData) => {
    const {userId, text, createdAt} = formData;
    try{
        await connectDB();

        const user = await User.findByid({_id: userId})
        console.log('user:', user);

      if(user){
        const newPost = await Post.create(userId, text, createdAt);
        return{
            newPost,
            message: 'Post created',
            status: 200
        };
    }else{
        return{ 
            error,
            message: 'Login to post a book',
            status: 401,
        }
    } 

    }catch(error){
        console.log('Error creating post',error.message)
         return { error: `Error creating post: ${error.message}`, status: 500 };
    }
  }


/////////////////fetch posts
  export const fetchPosts = async() => {
    try{

    }catch(error){
        console.log('Error fetching posts', error.message);
    }
  }
