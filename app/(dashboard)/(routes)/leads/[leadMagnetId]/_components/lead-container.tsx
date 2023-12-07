import { Lead, LeadMagnet } from '@prisma/client'

import { LeadTable } from './lead-table'

interface LeadContainerProps {
  leadMagnet: LeadMagnet
  leads: Lead[]
}

export const LeadContainer = ({ leadMagnet, leads }: LeadContainerProps) => {
  return (
    <div className="my-6 w-full px-6 lg:mx-auto lg:max-w-5xl lg:p-0">
      <div className="mb-3 flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">{leadMagnet.publishedTitle}</h2>

        <span className="text-xl font-bold text-purple-500">{leads.length} Leads</span>
      </div>

      <LeadTable leads={leads} />
    </div>
  )
}
