import { useLeadMagnetEditorContext } from '@/context/lead-magnet-editor-context'

import { Input } from '@/components/ui/input'
import { EmailCapturePreview } from '@/components/email-capture-preview'

export const EmailEditor = () => {
  const { editedLeadMagnet, setEditedLeadMagnet } = useLeadMagnetEditorContext()

  return (
    <div className="flex h-full flex-row border-t-2 border-gray-200">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">Email Capture Editor</h1>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-bold text-gray-700">
            Email Capture Editor
          </label>

          <Input
            value={editedLeadMagnet.draftEmailCapture}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({ ...prev, draftEmailCapture: e.target.value }))
            }
            placeholder="How do ask users for their email to chat with the AI?"
          />
        </div>
      </div>

      <div className="purple-dotted-pattern flex w-1/2 flex-col">
        <div className="mx-12 my-8 flex max-w-lg rounded-lg bg-white p-4 shadow-lg lg:mx-auto">
          <EmailCapturePreview
            leadMagnetId={editedLeadMagnet.id}
            emailCapturePrompt={editedLeadMagnet.draftEmailCapture}
          />
        </div>
      </div>
    </div>
  )
}
