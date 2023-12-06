import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prismaDb } from '@/lib/prismaDb'
import { profileCreateRequest, profileUpdateRequest } from './schema'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return new NextResponse('User Id is required.', { status: 400 })
    }

    let profile = await prismaDb.profile.findFirst({
      where: {
        userId,
      },
    })

    if (!profile) {
      profile = await prismaDb.profile.create({
        data: {
          userId,
          description: '',
          profileImageUrl: '',
          title: '',
        },
      })
    }

    return NextResponse.json({ message: 'Success', data: profile })
  } catch (error) {
    console.log('[GET_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

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

    const updateProfile = isUpdate
      ? await prismaDb.profile.update({
          where: {
            id: data.id,
          },
          data,
        })
      : await prismaDb.profile.create({
          data,
        })

    return NextResponse.json(
      {
        message: isUpdate ? 'Updated profile successfully.' : 'Created profile successfully.',
        data: updateProfile,
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
  return await handleRequest(req, profileCreateRequest)
}
export const PUT = async (req: Request) => {
  return await handleRequest(req, profileUpdateRequest, true)
}
