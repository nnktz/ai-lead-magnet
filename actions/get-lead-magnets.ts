import { prismaDb } from '@/lib/prismaDb'

export const getLeadMagnets = async (userId: string) => {
  try {
    const leadMagnets = await prismaDb.leadMagnet.findMany({
      where: {
        userId,
      },
    })

    return leadMagnets
  } catch (error) {
    console.error(error)
    return []
  }
}
