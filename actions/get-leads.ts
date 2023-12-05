import { prismaDb } from '@/lib/prismaDb'

export const getLeads = async (userId: string) => {
  try {
    const leads = await prismaDb.lead.findMany({
      where: {
        userId,
      },
    })

    return leads
  } catch (error) {
    console.error(error)
    return []
  }
}
