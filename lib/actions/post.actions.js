  'use server'

import Post from "../models/post.models";
import User from "../models/user.models";
import { connectDB } from "../mongoose";


/////////////////create post
  export const createPost = async(formData) => {
    const {userId, text, createdAt} = formData;
    try{
        await connectDB();

        const user = await User.findById({_id: userId});
        console.log('user:', user);

      if(user){
        const newPost = await Post.create({
          userId: user,
          text, 
          createdAt});   
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
      await connectDB();


      const posts = await Post.find()
       console.log('Fetched posts:', posts);
      return {
        posts, 
        message: 'Retrieved successfully',
        status: 200,
      };
    }catch(error){
        console.log('Error fetching posts', error.message);
         return { error: `Error creating post: ${error.message}`, status: 500 };
    }
  }
