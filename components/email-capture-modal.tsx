import { X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { EmailCapturePreview } from './email-capture-preview'

interface EmailCaptureModalProps {
  leadMagnetId: string
  emailCapturePrompt: string
  setHasCaptureUserInfo: Dispatch<SetStateAction<boolean>>
  setShowEmailCaptureModal: Dispatch<SetStateAction<boolean>>
}

export const EmailCaptureModal = ({
  leadMagnetId,
  emailCapturePrompt,
  setHasCaptureUserInfo,
  setShowEmailCaptureModal,
}: EmailCaptureModalProps) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-hidden">
      <div className="flex min-h-screen items-center justify-center bg-black/20">
        <div className="transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-2xl sm:w-full sm:max-w-lg sm:p-6">
          <button
            onClick={() => setShowEmailCaptureModal(false)}
            className="absolute right-2 top-2 rounded-full hover:opacity-75"
          >
            <X className="text-2xl" />
          </button>

          <EmailCapturePreview
            emailCapturePrompt={emailCapturePrompt}
            leadMagnetId={leadMagnetId}
            setHasCaptureUserInfo={setHasCaptureUserInfo}
            setShowEmailCaptureModal={setShowEmailCaptureModal}
          />
        </div>
      </div>
    </div>
  )
}
