import toast from 'react-hot-toast'

import { useProfileEditorContext } from '@/context/profile-editor-context'
import { UploadButton } from '@/utils/uploadthing'

import { Input } from '@/components/ui/input'
import { ProfilePreview } from './profile-preview'

export const ProfileEditor = () => {
  const { editedProfile, setEditedProfile } = useProfileEditorContext()

  return (
    <div className="flex h-full flex-row border-gray-200">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">Profile Editor</h1>

        <div className="mb-4">
          <UploadButton
            appearance={{
              button: 'bg-purple-500 focus-within:ring-purple-500 after:bg-purple-500',
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && (res.length ?? 0) > 0) {
                const file = res[0]
                file &&
                  setEditedProfile((prev) => ({
                    ...prev,
                    profileImageUrl: file.url,
                  }))
                toast.success('Uploaded successfully.')
              }
            }}
            onUploadError={(error: Error) => {
              toast.error('Something went wrong. Please try again.')
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-bold text-gray-700">
            Title
          </label>

          <Input
            value={editedProfile.title}
            onChange={(e) => setEditedProfile((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Your name here..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-bold text-gray-700">
            Welcome Message
          </label>

          <textarea
            name=""
            id=""
            cols={30}
            rows={15}
            value={editedProfile.description}
            placeholder="Type in your welcome message here..."
            onChange={(e) =>
              setEditedProfile((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
          />
        </div>
      </div>

      <div className="purple-dotted-pattern flex w-1/2 flex-col">
        <div className="mx-12 my-8 flex max-w-lg rounded-lg bg-white p-4 shadow-lg lg:mx-auto">
          <ProfilePreview profile={editedProfile} />
        </div>
      </div>
    </div>
  )
}
