import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { getLeadMagnets } from '@/actions/get-lead-magnets'
import { getLeads } from '@/actions/get-leads'

import { Container } from './_components/container'
import { getSubscription } from '@/actions/get-subscription'

const LeadMagnetsPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const leadMagnetsRequest = getLeadMagnets(userId)
  const leadsRequest = getLeads(userId)
  const subscriptionRequest = getSubscription(userId)

  const [leadMagnets, leads, subscription] = await Promise.all([
    leadMagnetsRequest,
    leadsRequest,
    subscriptionRequest,
  ])

  return <Container leadMagnets={leadMagnets} leads={leads} subscription={subscription} />
}

export default LeadMagnetsPage
