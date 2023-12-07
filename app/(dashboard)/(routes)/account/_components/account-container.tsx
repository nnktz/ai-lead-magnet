'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Account } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const AccountContainer = ({ account }: { account: Account }) => {
  const router = useRouter()

  const [username, setUsername] = useState(account.username)
  const [isSaving, setIsSaving] = useState(false)

  const updateUsername = async () => {
    setIsSaving(true)

    await axios
      .put('/api/account', { username })
      .then((response) => {
        if (!response.data.success) {
          return toast.error(response.data.message?.message || response.data.message)
        }

        const updateAccount = response.data.data
        if (updateAccount) {
          setUsername(updateAccount.username)
          toast.success('Username updated successfully.')
          router.refresh()
        }
      })
      .catch((error: any) => {
        toast.error('Something went wrong. Please try again.')
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="m-8 flex h-full flex-col gap-y-4">
      <h1 className="text-2xl font-semibold text-gray-700">Account Home</h1>

      <hr />

      <div className="w-fit">
        <label htmlFor="" className="mb-2 block to-gray-700 text-sm font-bold">
          Username
        </label>

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username here..."
        />
      </div>

      <div className="flex flex-row gap-x-4">
        <Button variant={'outline'} onClick={() => setUsername(account.username || '')}>
          Cancel
        </Button>

        <Button onClick={updateUsername} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
