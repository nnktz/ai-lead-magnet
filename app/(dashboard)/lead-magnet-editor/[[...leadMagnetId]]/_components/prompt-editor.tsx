import { useLeadMagnetEditorContext } from '@/context/lead-magnet-editor-context'

import { AIChatContainer } from './ai-chat-container'

export const PromptEditor = () => {
  const { editedLeadMagnet, setEditedLeadMagnet } = useLeadMagnetEditorContext()

  return (
    <div className="flex h-full flex-row">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 w-fit bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
          AI Prompt Editor
        </h1>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block to-gray-700 text-sm font-bold">
            Prompt
          </label>

          <textarea
            name=""
            id=""
            cols={30}
            rows={15}
            value={editedLeadMagnet.draftPrompt}
            placeholder="Type in your Prompt Engineering here..."
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({
                ...prev,
                draftPrompt: e.target.value,
              }))
            }
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
          />
        </div>
      </div>

      <div className="ai-dotted-pattern flex w-1/2 flex-col">
        <div className="mx-12 my-8 flex max-w-lg rounded-lg bg-white p-4 shadow-lg lg:mx-auto">
          <AIChatContainer
            leadMagnetId={editedLeadMagnet.id}
            emailCapturePrompt={editedLeadMagnet.draftEmailCapture}
            firstQuestion={editedLeadMagnet.draftFirstQuestion}
            prompt={editedLeadMagnet.draftPrompt}
            captureEmail={false}
          />
        </div>
      </div>
    </div>
  )
}
