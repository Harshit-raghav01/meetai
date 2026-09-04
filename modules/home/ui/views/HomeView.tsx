"use client"

import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const HomeView = () => {
    const router = useRouter()
    const session = authClient.useSession()

    

  const trpc = useTRPC();
  const { data } = useQuery(trpc.test.queryOptions({
    name : "Harshit Raghav",
    age: 19
  }))

  
    if(!session.data && !session.isPending){
     router.replace("/sign-in")
  }
  
  

  
  return (
    <div className="flex flex-col p-4">{data?.data.name}. My age is {data?.data.age}.</div>
  )
}

export default HomeView