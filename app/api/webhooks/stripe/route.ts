import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/utils/stripe'
import { prismaDb } from '@/lib/prismaDb'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string

    let event: Stripe.Event

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return new NextResponse('Stripe webhook secret not set.')
    }

    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)

    const session = event.data.object as Stripe.Checkout.Session

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

    if (event.type === 'checkout.session.completed') {
      if (!session?.metadata?.userId) {
        return new NextResponse('User Id is required.', { status: 400 })
      }

      await prismaDb.subscription.create({
        data: {
          userId: session?.metadata?.userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
    } else if (event.type === 'invoice.payment_succeeded') {
      const subscriptionFromDb = await prismaDb.subscription.findFirst({
        where: {
          stripeSubscriptionId: subscription.id,
        },
      })

      if (!subscriptionFromDb) {
        return new NextResponse('Subscription not found.', { status: 404 })
      }

      await prismaDb.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
    }
  } catch (error) {
    console.log('["POST_ERROR"]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
