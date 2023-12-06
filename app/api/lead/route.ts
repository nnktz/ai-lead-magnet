import { NextResponse } from 'next/server'
import { object, string } from 'zod'

import { prismaDb } from '@/lib/prismaDb'

const createLeadRequestSchema = object({
  name: string(),
  email: string(),
  leadMagnetId: string(),
})

export async function POST(req: Request) {
  try {
    const reqBody = await req.json()

    const parsedRequest = createLeadRequestSchema.safeParse(reqBody)

    if (!parsedRequest.success) {
      return new NextResponse(`${parsedRequest.error.message}`, { status: 400 })
    }

    const leadMagnet = await prismaDb.leadMagnet.findUnique({
      where: {
        id: parsedRequest.data.leadMagnetId,
      },
    })

    if (!leadMagnet) {
      return new NextResponse('Lead magnet not found.', { status: 404 })
    }

    await prismaDb.lead.create({
      data: {
        name: parsedRequest.data.name,
        email: parsedRequest.data.email,
        leadMagnetId: parsedRequest.data.leadMagnetId,
        userId: leadMagnet.userId,
      },
    })

    return NextResponse.json({ message: 'Lead created.' }, { status: 200 })
  } catch (error) {
    console.log('[POST_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
