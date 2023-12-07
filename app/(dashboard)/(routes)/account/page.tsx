import { auth, currentUser } from '@clerk/nextjs'
import { generateFromEmail } from 'unique-username-generator'
import { redirect } from 'next/navigation'

import { prismaDb } from '@/lib/prismaDb'

import { AccountContainer } from './_components/account-container'

const AccountPage = async () => {
  const fetchAccount = async (userId: string) => {
    let account = await prismaDb.account.findUnique({
      where: {
        userId,
      },
    })

    if (!account) {
      const user = await currentUser()

      if (!user) {
        throw new Error('User not found.')
      }

      const baseEmail = user.emailAddresses[0].emailAddress
      account = await prismaDb.account.create({
        data: {
          userId,
          email: baseEmail,
          username: generateFromEmail(baseEmail, 3),
        },
      })
    }

    return account
  }

  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const account = await fetchAccount(userId)

  return <AccountContainer account={account} />
}

export default AccountPage
