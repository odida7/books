'use server'

import User from "../models/user.models";
import { connectDB } from "../mongoose";
import bcrypt from 'bcrypt'

 
////////////create user

export const createUser = async(formData) =>{
    const {name, email, password} = formData;
    try{
        await connectDB();
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error('User already exists');
        }

    
        const hashedPassword = await bcrypt.hash(password, 5);

        await User.create({
            name,
            email, 
            password: hashedPassword,
        })
        return {message: 'New user created', status: 200};

    }catch(error){
        console.log(error.message);
        return { error: `Error creating user: ${error.message}`, status: 500 };
    }
}


///////////////////fetch user

export const fetchUser = async() => {
    try{
      await connectDB();
      const user = await User.findById(_id)
      console.log('user:', user);
      if(user){
        return {
            user, 
            message: 'user found', 
            status: 200
        }
      } else {
         return {
            error, 
            message: 'user not found', 
            status: 404
        }
      }
    }catch(error){
        console.log(error.message);
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}