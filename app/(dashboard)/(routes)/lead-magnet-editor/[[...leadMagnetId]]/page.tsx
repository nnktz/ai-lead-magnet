import { LeadMagnet } from '@prisma/client'

import { prismaDb } from '@/lib/prismaDb'
import { DEFAULT_LEAD_MAGNET } from './constants'

import { NotFound } from '@/components/not-found'
import { Container } from './_components/container'

type LeadMagnetEditorParams = {
  params: {
    leadMagnetId: string[]
  }
}

const LeadMagnetEditorPage = async ({ params }: LeadMagnetEditorParams) => {
  const leadMagnetId =
    (params?.leadMagnetId as string[])?.length > 0 ? params.leadMagnetId[0] : null

  let leadMagnet: LeadMagnet | null = null

  if (!leadMagnetId) {
    leadMagnet = DEFAULT_LEAD_MAGNET
  } else {
    leadMagnet = await prismaDb.leadMagnet.findUnique({
      where: {
        id: leadMagnetId,
      },
    })
  }

  if (!leadMagnet) {
    return <NotFound returnUrl="/lead-magnets" />
  }

  return <Container leadMagnet={leadMagnet} />
}

export default LeadMagnetEditorPage
