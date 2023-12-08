import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Pricing = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-red-500 py-16">
      <h2 className="mb-8 text-center text-5xl font-bold text-white">Pricing</h2>

      <div className="mx-6 flex flex-col justify-center sm:!flex-row sm:space-x-8 sm:space-y-0">
        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">Free Plan</CardDescription>
            <CardTitle className="text-4xl">$0/Month</CardTitle>
          </CardHeader>

          <CardContent className="mt-4">
            <p className="mb-2 to-gray-600 text-center">Create up to 2 AI Lead Magnets</p>

            <Link href={'/lead-magnets'}>
              <Button variant={'outline'}>Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">Paid Plan</CardDescription>
            <CardTitle className="text-4xl">$10/Month</CardTitle>
          </CardHeader>

          <CardContent className="mt-4">
            <p className="mb-2 to-gray-600 text-center">Create Unlimited AI Lead Magnets</p>

            <Link href={'/lead-magnets'}>
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
