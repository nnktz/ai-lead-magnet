'use client'

import { useEffect, useState } from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import OrderedList from '@tiptap/extension-ordered-list'
import History from '@tiptap/extension-history'

import { useLeadMagnetEditorContext } from '@/context/lead-magnet-editor-context'

import { Input } from '@/components/ui/input'
import { ContentPreview } from './content-preview'

export const ContentEditor = () => {
  const { editedLeadMagnet, setEditedLeadMagnet } = useLeadMagnetEditorContext()

  const [editor, setEditor] = useState<Editor | null>(null)

  useEffect(() => {
    if (!editor) {
      setEditor(
        new Editor({
          extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            Heading.configure({
              levels: [1, 2, 3],
            }),
            CodeBlock,
            BulletList,
            OrderedList,
            ListItem,
            History,
          ],
          content: editedLeadMagnet.draftBody,
          onUpdate: ({ editor }) => {
            setEditedLeadMagnet((prev) => ({
              ...prev,
              draftBody: editor.getHTML(),
            }))
          },
        }),
      )
    }

    return () => {
      if (editor) {
        editor.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-full flex-row">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">Content Editor</h1>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-bold text-gray-700">
            Title
          </label>

          <Input
            value={editedLeadMagnet.draftTitle}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({ ...prev, draftTitle: e.target.value }))
            }
            placeholder="What is the title of your lead magnet?"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-bold text-gray-700">
            Subtitle
          </label>

          <Input
            value={editedLeadMagnet.draftSubtitle}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({ ...prev, draftSubtitle: e.target.value }))
            }
            placeholder="What is the subtitle of your lead magnet?"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-bold text-gray-700">
            Body
          </label>

          {editor && (
            <EditorContent
              className="focus:shadow-outline h-[50vh] w-full appearance-none overflow-y-hidden rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none"
              editor={editor}
            />
          )}
        </div>
      </div>

      <div className="purple-dotted-pattern flex h-full w-1/2 flex-col overflow-y-auto">
        <div className="mx-12 my-8 flex h-full max-w-lg lg:mx-auto">
          <ContentPreview
            title={editedLeadMagnet.draftTitle}
            body={editedLeadMagnet.draftBody}
            subtitle={editedLeadMagnet.draftSubtitle}
          />
        </div>
      </div>
    </div>
  )
}
