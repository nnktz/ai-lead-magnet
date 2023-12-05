import Link from 'next/link'
import { Button } from './ui/button'

export const NotFound = ({ returnUrl }: { returnUrl: string }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
      <h1 className="text-2xl">Lead Magnet Not Found</h1>

      <Link href={returnUrl}>
        <Button variant={'outline'}>Go Back</Button>
      </Link>
    </div>
  )
}
