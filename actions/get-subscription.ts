import { prismaDb } from '@/lib/prismaDb'

export const getSubscription = async (userId: string) => {
  try {
    const subscription = await prismaDb.subscription.findUnique({
      where: {
        userId,
      },
    })

    return subscription
  } catch (error) {
    console.error(error)
    return null
  }
}
