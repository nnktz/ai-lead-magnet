import Link from 'next/link'
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'
import type { User } from '@clerk/nextjs/api'

import { Button } from '@/components/ui/button'

export const Navbar = async () => {
  const user: User | null = await currentUser()

  return (
    <nav className="flex w-screen items-center justify-between p-6">
      <div>
        <Link href={'/'} className="text-2xl font-bold text-purple-500 no-underline">
          LeadConvert
        </Link>
      </div>

      <div className="text-lg font-semibold text-purple-500">
        {user ? (
          <div className="flex flex-row items-center gap-x-4">
            <Link href={'/lead-magnets'}>
              <Button variant={'outline'}>Open App</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  )
}
