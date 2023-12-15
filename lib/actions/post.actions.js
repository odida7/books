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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    try {
        await connectDB();

        const totalPosts = await Post.countDocuments(); // Count total number of posts
        const totalPages = Math.ceil(totalPosts / pageSize);

        if (pageNumber < 1 || pageNumber > totalPages) {
            return { error: 'Invalid page number', status: 400 };
        }

        const skipAmount = (pageNumber - 1) * pageSize;

        const posts = await Post.find()
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize);
           

        return { posts, totalPages, currentPage: pageNumber, message: 'Success', status: 200 };
    } catch (err) {
        console.error(`Error fetching posts: ${err.message}`);
        return { error: `Error fetching posts: ${err.message}`, status: 500 };
    }
}


//////////////////////////fetch a post

export const fetchPost = async (id) => {
  
  try {
    await connectDB();

    const post = await Post.findById(id);
    console.log('post:', post);

    if (post) {
      return {
        post,
        message: 'Post found',
        status: 200,
      };
    } else {
      return {
        error: 'Post not found',
        message: 'Post not found',
        status: 404,
      };
    }
  } catch (err) {
    console.error(`Error fetching post: ${err.message}`);
    return { error: `Error fetching post: ${err.message}`, status: 500 };
  }
};