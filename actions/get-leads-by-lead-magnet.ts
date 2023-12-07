import { prismaDb } from '@/lib/prismaDb'

export const getLeadsByLeadMagnet = async (leadMagnetId: string) => {
  return await prismaDb.lead.findMany({
    where: {
      leadMagnetId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
