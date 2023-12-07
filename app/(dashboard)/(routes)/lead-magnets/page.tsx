import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { getLeadMagnets } from '@/actions/get-lead-magnets'
import { getLeads } from '@/actions/get-leads'

import { Container } from './_components/container'

const LeadMagnetsPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const leadMagnetsRequest = getLeadMagnets(userId)
  const leadsRequest = getLeads(userId)

  const [leadMagnets, leads] = await Promise.all([leadMagnetsRequest, leadsRequest])

  return <Container leadMagnets={leadMagnets} leads={leads} />
}

export default LeadMagnetsPage
