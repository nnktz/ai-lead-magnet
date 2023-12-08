import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const CallToAction = () => {
  return (
    <div className="flex flex-col items-center bg-white px-6 py-16 text-center">
      <h2 className="text-3xl font-bold text-purple-500 sm:text-4xl md:text-5xl">
        Ready to Transform Your Content?
      </h2>

      <p className="mt-4 max-w-2xl text-lg text-gray-700 sm:text-xl md:text-2xl">
        Join the revolution in lead generation. Turn your content into interaction AI experiences
        and engage your audience like never before.
      </p>

      <Link href={'/lead-magnets'}>
        <Button className="mt-4 px-4 py-5 text-sm capitalize sm:text-lg">
          Create your first AI lead magnet
        </Button>
      </Link>
    </div>
  )
}
