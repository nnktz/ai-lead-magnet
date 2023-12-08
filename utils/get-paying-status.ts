import { Subscription } from '@prisma/client'
import dayjs from 'dayjs'

export const getPayingStatus = (subscription: Subscription | null): boolean => {
  return (
    !!subscription &&
    !!subscription.stripeCurrentPeriodEnd &&
    dayjs(subscription.stripeCurrentPeriodEnd).isAfter(dayjs())
  )
}
