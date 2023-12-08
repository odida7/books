'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Home() {
  const {data: session, status} = useSession();
  const router = useRouter();

  if (status === "unauthenticated"){
    router.replace('/login')
  }

  return (
    <div>
      home
    </div>
  )
}
