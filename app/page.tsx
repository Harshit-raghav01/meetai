'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const Page = () => {
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

  return (
    <>
      <h1 className='text-4xl'>Welcome To Home page</h1>
      <div>
        <Button disabled={pending} type='button' onClick={handleLogOut}>Logout</Button>
      </div>
    </>
  )


}

export default Page;