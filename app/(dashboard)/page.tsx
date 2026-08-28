'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter()
  const [pending, setPending] = useState<boolean>(false)

  const handleLogOut = () => {
    setPending(true)
    authClient.signOut({
      fetchOptions : {
        onSuccess : () => {
          setPending(false)
          router.push("/sign-in")
        }
      }
    });
    
  }

  useEffect(()=>{
    if(!session && !isPending){
      router.push("/sign-in")
    }
  })
 
  if(isPending){
    return (
      <div>Loading...</div>
    )
  }

  if(!session){
    return null;
  }
  
  return (
    <>
      <h1 className='text-2xl font-medium'>Welcome To Home page</h1>
      
        <Button  disabled={pending} type='button' onClick={handleLogOut}>Logout</Button>
      
    </>
  )


}

export default Page;