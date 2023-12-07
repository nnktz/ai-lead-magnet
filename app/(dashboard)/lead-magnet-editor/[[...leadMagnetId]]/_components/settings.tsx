import { useLeadMagnetEditorContext } from '@/context/lead-magnet-editor-context'
import { slugifyLeadMagnet } from '@/lib/utils'

import { Input } from '@/components/ui/input'

export const Settings = () => {
  const { editedLeadMagnet, setEditedLeadMagnet } = useLeadMagnetEditorContext()

  return (
    <div className="flex h-full w-full flex-row">
      <div className="m-8 flex h-full w-full flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">Lead Magnet Settings</h1>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-bold text-gray-700">
            Slug
          </label>

          <Input
            type="text"
            value={editedLeadMagnet.slug ?? slugifyLeadMagnet(editedLeadMagnet.draftTitle)}
            onChange={(e) => {
              const newSlug = slugifyLeadMagnet(e.target.value)

              setEditedLeadMagnet((prev) => ({
                ...prev,
                slug: newSlug,
              }))
            }}
            placeholder="What is the title of your lead magnet?"
          />

          <p className="mt-2 to-gray-500 text-sm">Slug can only contain numbers, letters, and -</p>
        </div>
      </div>
    </div>
  )
}
