'use client'

import RiseLoader from 'react-spinners/RingLoader'
import { useChat } from 'ai/react'
import { FormEvent, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { EmailCaptureModal } from './email-capture-modal'

type AIChatContainerProps = {
  leadMagnetId: string
  emailCapturePrompt: string
  firstQuestion: string
  prompt: string
  captureEmail: boolean
}

export const AIChatContainer = ({
  captureEmail,
  emailCapturePrompt,
  firstQuestion,
  leadMagnetId,
  prompt,
}: AIChatContainerProps) => {
  const [showEmailCaptureModal, setShowEmailCaptureModal] = useState(false)
  const [hasCaptureUserInfo, setHasCaptureUserInfo] = useState(false)

  const {
    messages,
    handleSubmit: handleOpenAIChatSubmit,
    input,
    handleInputChange,
    isLoading,
    setMessages,
  } = useChat({ api: '/api/openai' })

  useEffect(() => {
    setMessages([
      {
        role: 'system',
        content: prompt,
        id: '1',
      },
      {
        role: 'assistant',
        content: firstQuestion,
        id: '2',
      },
    ])
  }, [firstQuestion, prompt, setMessages])

  const hasUserEnteredInfo = () => {
    if (captureEmail && !hasCaptureUserInfo) {
      setShowEmailCaptureModal(true)
      return false
    }

    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hasUserEnteredInfo()) {
      return
    }

    handleOpenAIChatSubmit(e)
  }

  return (
    <div className="flex h-full max-w-3xl flex-col">
      <div className="flex-grow space-y-4 overflow-y-auto rounded-md border-2 border-solid p-4">
        {messages.length === 0 && <div>No messages yet. Start chatting below!</div>}

        {messages
          .filter((message) => message.role !== 'system')
          .map((message, index) => (
            <div
              key={index}
              className={cn('flex items-end', message.role === 'user' && 'justify-end')}
            >
              <div
                className={cn(
                  'rounded-lg px-4 py-2',
                  message.role === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-800',
                )}
              >
                {message.content.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <form action="" onSubmit={handleSubmit} className="my-4 flex">
        <textarea
          name=""
          id=""
          cols={30}
          rows={1}
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message"
          style={{ resize: 'none' }}
          className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:outline-none
          focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="ml-4 mt-auto h-10 flex-shrink-0 rounded-md bg-purple-500 px-4 text-white hover:bg-purple-500/90"
        >
          {isLoading ? <RiseLoader color="white" size={4} /> : <span>Send</span>}
        </button>
      </form>

      {showEmailCaptureModal && (
        <EmailCaptureModal
          emailCapturePrompt={emailCapturePrompt}
          leadMagnetId={leadMagnetId}
          setHasCaptureUserInfo={setHasCaptureUserInfo}
          setShowEmailCaptureModal={setShowEmailCaptureModal}
        />
      )}
    </div>
  )
}
