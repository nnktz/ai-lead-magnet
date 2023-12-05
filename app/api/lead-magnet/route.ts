import { z } from 'zod'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { leadMagnetCreateRequest, leadMagnetUpdateRequest } from './schema'
import { prismaDb } from '@/lib/prismaDb'

async function handleRequest(req: Request, schema: z.ZodType<any, any>, isUpdate = false) {
  try {
    const { userId } = auth()
    const requestBody = await req.json()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const parsed = schema.safeParse(requestBody)

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.message, data: null }, { status: 400 })
    }

    if (isUpdate && parsed.data.userId !== userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const data = {
      ...parsed.data,
      userId,
    }

    const updateLeadMagnet = isUpdate
      ? await prismaDb.leadMagnet.update({
          where: {
            id: data.id,
          },
          data,
        })
      : await prismaDb.leadMagnet.create({
          data,
        })

    return NextResponse.json(
      {
        message: isUpdate
          ? 'Updated lead magnet successfully.'
          : 'Created lead magnet successfully.',
        data: updateLeadMagnet,
        success: true,
      },
      { status: isUpdate ? 200 : 201 },
    )
  } catch (error) {
    console.log(isUpdate ? '[PUT_ERROR]' : '[POST_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export const POST = async (req: Request) => {
  return await handleRequest(req, leadMagnetCreateRequest)
}
export const PUT = async (req: Request) => {
  return await handleRequest(req, leadMagnetUpdateRequest, true)
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!userId) {
      return new NextResponse('Unauthenticated.', { status: 401 })
    }

    if (!id) {
      return new NextResponse('No Id provided.', { status: 400 })
    }

    const leadMagnet = await prismaDb.leadMagnet.findFirst({
      where: {
        id,
      },
    })

    if (!leadMagnet) {
      return new NextResponse('Lead magnet not found.', { status: 404 })
    }

    if (leadMagnet.userId !== userId) {
      return new NextResponse('Unauthorized.', { status: 403 })
    }

    await prismaDb.leadMagnet.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      { message: 'Deleted lead magnet successfully.', success: true },
      { status: 202 },
    )
  } catch (error) {
    console.log('[DELETE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
