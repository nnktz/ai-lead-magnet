import { notFound } from 'next/navigation'

import { prismaDb } from '@/lib/prismaDb'

import { AIChatContainer } from '@/components/ai-chat-container'
import { NotFound } from '@/components/not-found'
import { LeadMagnetView } from './_components/lead-magnet-view'

interface LeadMagnetPageProps {
  params: {
    username: string
    leadMagnetSlug: string
  }
}

const LeadMagnetPage = async ({ params }: LeadMagnetPageProps) => {
  const { username, leadMagnetSlug } = params

  if (!username || !leadMagnetSlug) {
    return <NotFound returnUrl="/" />
  }

  const account = await prismaDb.account.findUnique({
    where: {
      username,
    },
  })

  if (!account) {
    return <NotFound returnUrl="/" />
  }

  const fetchProfile = await prismaDb.profile.findFirst({
    where: {
      userId: account.userId,
    },
  })

  const fetchLeadMagnet = await prismaDb.leadMagnet.findFirst({
    where: {
      userId: account.userId,
      slug: leadMagnetSlug,
    },
  })

  if (!fetchLeadMagnet) {
    return notFound()
  }

  const [profile, leadMagnet] = await Promise.all([fetchProfile, fetchLeadMagnet])

  if (!profile || !leadMagnet) {
    return <NotFound returnUrl="/" />
  }

  return (
    <div className="ai-dotted-pattern flex w-full flex-col justify-between p-6 md:max-h-screen md:min-h-screen md:!flex-row md:p-8 lg:p-12">
      <LeadMagnetView leadMagnet={leadMagnet} profile={profile} />

      <div
        id="ai-chat"
        className="mb-10 flex max-h-[85vh] flex-1 flex-col rounded-lg bg-white p-4 shadow-lg md:mb-0 md:ml-4
        md:overflow-y-hidden md:p-8"
      >
        <AIChatContainer
          emailCapturePrompt={leadMagnet.publishedEmailCapture}
          leadMagnetId={leadMagnet.id}
          firstQuestion={leadMagnet.publishedFirstQuestion}
          prompt={leadMagnet.publishedPrompt}
          captureEmail
        />
      </div>
    </div>
  )
}

export default LeadMagnetPage
