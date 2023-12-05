import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prismaDb } from '@/lib/prismaDb'
import { slugifyLeadMagnet } from '@/lib/utils'

const leadMagnetUnpublishRequest = z.object({
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

    const parsedPublishRequest = leadMagnetUnpublishRequest.safeParse(requestBody)

    if (!parsedPublishRequest.success) {
      return NextResponse.json(
        { message: parsedPublishRequest.error.message, data: null },
        { status: 400 },
      )
    }

    const unpublishRequest = parsedPublishRequest.data

    const leadMagnet = await prismaDb.leadMagnet.findUnique({
      where: {
        id: unpublishRequest.id,
      },
    })

    if (!leadMagnet) {
      return new NextResponse('Lead magnet not found.', { status: 404 })
    }

    const unpublishLeadMagnet = await prismaDb.leadMagnet.update({
      where: {
        id: unpublishRequest.id,
      },
      data: {
        ...leadMagnet,
        status: 'draft',
      },
    })

    return NextResponse.json(
      {
        message: 'Unpublished lead magnet successfully.',
        data: unpublishLeadMagnet,
        success: true,
      },
      { status: 203 },
    )
  } catch (error) {
    console.log('[POST_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
