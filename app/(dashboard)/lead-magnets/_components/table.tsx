import Link from 'next/link'
import { Lead, LeadMagnet } from '@prisma/client'

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

type TableProps = {
  leadMagnets: LeadMagnet[]
  leads: Lead[]
}

export const Table = ({ leadMagnets, leads }: TableProps) => {
  const getLeadsForLeadMagnet = (leadMagnetId: string): number => {
    const leadsForLeadMagnet = leads.filter((lead) => lead.leadMagnetId === leadMagnetId)

    return leadsForLeadMagnet.length
  }

  const getConversationRate = (leadMagnetId: string, pageViews: number): number => {
    if (pageViews === 0) {
      return 0
    }

    const conversationRate = Math.round((getLeadsForLeadMagnet(leadMagnetId) / pageViews) * 100)

    return conversationRate
  }

  return (
    <TableUI>
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg">Name</TableHead>
          <TableHead className="text-lg">Page Visits</TableHead>
          <TableHead className="text-lg">Leads</TableHead>
          <TableHead className="text-lg">Conversation Rate</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {leadMagnets.map((leadMagnet) => (
          <TableRow key={leadMagnet.id}>
            <TableCell>
              <Link href={`/lead-magnet-editor/${leadMagnet.id}`} className="text-lg">
                {leadMagnet.name}
              </Link>
            </TableCell>
            <TableCell>{leadMagnet.pageViews}</TableCell>
            <TableCell>{getLeadsForLeadMagnet(leadMagnet.id)}</TableCell>
            <TableCell>{getConversationRate(leadMagnet.id, leadMagnet.pageViews)}%</TableCell>
            <TableCell>
              <Link href={`/leads/${leadMagnet.id}`}>
                <Button className="font-normal" variant={'link'}>
                  View Leads
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableUI>
  )
}
