

import Post from "@/components/Post";
import { fetchPosts } from '@/lib/actions/post.actions';

export default async function Home() {
  
  const result = await fetchPosts()
  console.log('result:', result);

 

  return (
    <div>
      {result?.posts?.map((post)=>(
        <Post
          key={post._id}
          text={post.text}
          userId={post.userId}      
          createdAt={post.createdAt.toLocaleString()}
        />
      ))}
     
    </div>
  )
}
