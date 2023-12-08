'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, Pencil, X } from 'lucide-react'

import { useLeadMagnetEditorContext } from '@/context/lead-magnet-editor-context'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useProfileEditorContext } from '@/context/profile-editor-context'

export const EditorNavbar = () => {
  const router = useRouter()
  const {
    editedLeadMagnet,
    setEditedLeadMagnet,
    save: saveLeadMagnet,
    publish,
    unpublish,
    remove,
  } = useLeadMagnetEditorContext()

  const { save: saveProfile, account } = useProfileEditorContext()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [unpublishing, setUnpublishing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const saveName = async () => {
    try {
      await saveLeadMagnet().then(() => router.refresh())
    } catch (error) {
      toast.error('Error saving name. Please try again.')
    } finally {
      setEditing(false)
    }
  }

  const cancelSaveName = () => {
    setEditing(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveLeadMagnet()
      await saveProfile()
      router.refresh()
    } catch (error) {
      toast.error('Error saving. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setPublishing(true)
    try {
      await publish().then(() => router.refresh())
    } catch (error) {
      toast.error('Error publishing. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  const handleUnpublish = async () => {
    setUnpublishing(true)
    try {
      await unpublish().then(() => router.refresh())
    } catch (error) {
      toast.error('Error unpublishing. Please try again.')
    } finally {
      setUnpublishing(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await remove().then(() => {
        router.push('/lead-magnets')
        router.refresh()
      })
    } catch (error) {
      toast.error('Error deleting. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex w-full items-center justify-between border-b-[1px] border-solid border-gray-200 bg-white p-3 text-gray-600">
      <div className="flex flex-row items-center">
        <ArrowLeft
          size={20}
          className="w-fit cursor-pointer pr-3"
          onClick={() => router.push('/lead-magnets')}
        />

        {editing ? (
          <Input
            value={editedLeadMagnet.name}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        ) : (
          <span className="text-xl font-bold">{editedLeadMagnet.name}</span>
        )}

        {editing ? (
          <div className="flex flex-row text-purple-500">
            <Check size={25} className="ml-2 cursor-pointer" onClick={saveName} />
            <span className="mx-2 select-none border-r-2 border-gray-300" />
            <X size={25} className="cursor-pointer" onClick={cancelSaveName} />
          </div>
        ) : (
          <div className="ml-3 cursor-pointer" onClick={() => setEditing((prev) => !prev)}>
            <Pencil size={20} />
          </div>
        )}
      </div>

      <div className="flex flex-row items-center gap-x-4">
        {editedLeadMagnet.id && (
          <Button variant={'destructive'} disabled={deleting} onClick={handleDelete}>
            {deleting ? 'Deleting' : 'Delete'}
          </Button>
        )}

        {editedLeadMagnet.status === 'published' && (
          <>
            {account && (
              <>
                <Button disabled={unpublishing} onClick={handleUnpublish}>
                  {unpublishing ? 'Unpublishing' : 'Unpublish'}
                </Button>
                <Link href={`/lm/${account?.username}/${editedLeadMagnet.slug}`}>
                  <Button variant={'outline'}>View Published</Button>
                </Link>
              </>
            )}
          </>
        )}

        <Button variant={'outline'} disabled={saving} onClick={handleSave}>
          {saving ? 'Saving...' : 'Save'}
        </Button>

        {editedLeadMagnet.status !== 'published' && (
          <Button disabled={publishing} onClick={handlePublish}>
            {publishing ? 'Publishing' : 'Publish'}
          </Button>
        )}
      </div>
    </div>
  )
}
