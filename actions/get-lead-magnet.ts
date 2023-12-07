import { prismaDb } from '@/lib/prismaDb'

export const getLeadMagnet = async (leadMagnetId: string) => {
  return await prismaDb.leadMagnet.findUnique({
    where: {
      id: leadMagnetId,
    },
  })
}
