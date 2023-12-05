import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prismaDb } from '@/lib/prismaDb'
import { slugifyLeadMagnet } from '@/lib/utils'

const leadMagnetPublishRequest = z.object({
  id: z.string({
    required_error: 'Id is required',
  }),
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const requestBody = await req.json()

    if (!userId) {
      return new NextResponse('Unauthenticated.', { status: 401 })
    }

    const parsedPublishRequest = leadMagnetPublishRequest.safeParse(requestBody)

    if (!parsedPublishRequest.success) {
      return NextResponse.json(
        { message: parsedPublishRequest.error.message, data: null },
        { status: 400 },
      )
    }

    const publishRequest = parsedPublishRequest.data

    const leadMagnet = await prismaDb.leadMagnet.findUnique({
      where: {
        id: publishRequest.id,
      },
    })

    if (!leadMagnet) {
      return new NextResponse('Lead magnet not found.', { status: 404 })
    }

    const publishLeadMagnet = await prismaDb.leadMagnet.update({
      where: {
        id: publishRequest.id,
      },
      data: {
        ...leadMagnet,
        publishedBody: leadMagnet.draftBody,
        publishedEmailCapture: leadMagnet.draftEmailCapture,
        publishedFirstQuestion: leadMagnet.draftFirstQuestion,
        publishedPrompt: leadMagnet.draftPrompt,
        publishedSubtitle: leadMagnet.draftSubtitle,
        publishedTitle: leadMagnet.draftTitle,
        status: 'published',
        publishedAt: new Date(),
        slug: leadMagnet.slug ?? slugifyLeadMagnet(leadMagnet.draftTitle),
      },
    })

    return NextResponse.json(
      {
        message: 'Published lead magnet successfully.',
        data: publishLeadMagnet,
        success: true,
      },
      { status: 203 },
    )
  } catch (error) {
    console.log('[POST_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
