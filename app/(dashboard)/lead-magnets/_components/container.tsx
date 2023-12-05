import Link from 'next/link'
import { Lead, LeadMagnet } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Table } from './table'

type ContainerProps = {
  leadMagnets: LeadMagnet[]
  leads: Lead[]
}

export const Container = ({ leadMagnets, leads }: ContainerProps) => {
  return (
    <div className="w-full p-6 lg:mx-auto lg:max-w-5xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Lead Magnets</h2>
        <Button variant={'default'}>
          <Link href={'/lead-magnet-editor'}>Create</Link>
        </Button>
      </div>

      <Table leadMagnets={leadMagnets} leads={leads} />
    </div>
  )
}
