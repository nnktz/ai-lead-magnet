import { getLeadMagnet } from '@/actions/get-lead-magnet'
import { getLeadsByLeadMagnet } from '@/actions/get-leads-by-lead-magnet'

import { NotFound } from '@/components/not-found'
import { LeadContainer } from './_components/lead-container'

const LeadMagnetIdPage = async ({ params }: { params: { leadMagnetId: string } }) => {
  const leadMagnetId = params.leadMagnetId

  if (!leadMagnetId) {
    return <NotFound returnUrl="/lead-magnets" />
  }

  const fetchLeadMagnet = await getLeadMagnet(leadMagnetId)

  const fetchLeads = await getLeadsByLeadMagnet(leadMagnetId)

  const [leadMagnet, leads] = await Promise.all([fetchLeadMagnet, fetchLeads])

  if (!leadMagnet || !leads) {
    return <NotFound returnUrl="/lead-magnets" />
  }

  return <LeadContainer leadMagnet={leadMagnet} leads={leads} />
}

export default LeadMagnetIdPage
