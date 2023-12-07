import { Lead } from '@prisma/client'
import dayjs from 'dayjs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const LeadTable = ({ leads }: { leads: Lead[] }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">Name</TableHead>
            <TableHead className="text-lg">Email</TableHead>
            <TableHead className="text-lg">Sign-up Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{dayjs(lead.createdAt).format('MM-DD-YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        {leads.length === 0 && <div className="m-5 text-center font-bold">No Leads found</div>}
      </Table>
    </>
  )
}
