'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

import { cn } from '@/lib/utils'

const routes = [
  {
    name: 'Lead Magnets',
    path: '/lead-magnets',
  },
  {
    name: 'Account',
    path: '/account',
  },
]

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between border-b-2 p-4 text-purple-500">
      <Link href={'/'}>
        <h1 className="select-none text-2xl font-bold">LeadConvert</h1>
      </Link>

      <div className="flex items-center gap-x-6 text-lg">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={cn(
              'hover:text-purple-500/80',
              pathname === route.path && 'border-b-2 border-purple-300 ',
            )}
          >
            {route.name}
          </Link>
        ))}

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
