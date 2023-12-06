'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { FormEvent, useState } from 'react'

import { cn } from '@/lib/utils'

type EmailCapturePreviewProps = {
  leadMagnetId: string
  emailCapturePrompt: string
}

export const EmailCapturePreview = ({
  leadMagnetId,
  emailCapturePrompt,
}: EmailCapturePreviewProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isCreatingLead, setIsCreatingLead] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreatingLead(true)

    try {
      await axios
        .post('/api/lead', {
          name,
          email,
          leadMagnetId,
        })
        .then(() => {
          toast.success('You have successfully signed up!')
        })
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsCreatingLead(false)
    }
  }

  return (
    <div className="mt-3 text-center sm:mt-5">
      <h3 className="mb-6 text-xl font-normal leading-6 text-gray-900">{emailCapturePrompt}</h3>

      <div className="mt-2">
        <form action="" onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 mt-1 w-full rounded-md border border-gray-300 px-3 py-4"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-4"
          />

          <button
            type="submit"
            disabled={email.indexOf('@') === -1 || name === '' || isCreatingLead}
            className={cn(
              'mt-4 select-none rounded-lg border-2 border-purple-500 bg-white px-6 py-5 text-purple-500 transition hover:opacity-75',
              (email.indexOf('@') === -1 || name === '') && 'cursor-not-allowed opacity-50',
            )}
          >
            {isCreatingLead ? 'Signing up...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
