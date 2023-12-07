import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { object, string } from 'zod'
import { User } from '@clerk/nextjs/server'
import { generateFromEmail } from 'unique-username-generator'

import { prismaDb } from '@/lib/prismaDb'

export async function PUT(req: Request) {
  try {
    const user: User | null = await currentUser()

    if (!user || !user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const reqBody = await req.json()

    const usernameSchema = object({
      username: string()
        .min(3, {
          message: 'A username must be at least 3 characters long.',
        })
        .max(20, {
          message: 'A username must be 20 characters long or less.',
        }),
    })

    const parsed = usernameSchema.safeParse(reqBody)

    if (!parsed.success) {
      return NextResponse.json({
        message: JSON.parse(parsed.error.message)[0],
        data: null,
        success: false,
      })
    }

    const newUsername = parsed.data.username

    const existingAccount = await prismaDb.account.findFirst({
      where: {
        username: newUsername,
      },
    })

    if (existingAccount) {
      return NextResponse.json({
        message: 'Username already exists',
        data: null,
        success: false,
      })
    }

    const account = await prismaDb.account.update({
      where: {
        userId: user.id,
      },
      data: {
        username: newUsername,
      },
    })

    return NextResponse.json(
      {
        message: 'Username updated.',
        data: account,
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log('[PUT_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const user: User | null = await currentUser()

    if (!user || !user.id) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    let account = await prismaDb.account.findFirst({
      where: {
        userId: user.id,
      },
    })

    if (!account) {
      const baseEmail = user.emailAddresses[0].emailAddress

      account = await prismaDb.account.create({
        data: {
          userId: user.id,
          username: generateFromEmail(baseEmail, 3),
          email: baseEmail,
        },
      })
    }

    return NextResponse.json({ message: 'Success', data: account, success: true }, { status: 200 })
  } catch (error) {
    console.log('["GET_ERROR"]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
