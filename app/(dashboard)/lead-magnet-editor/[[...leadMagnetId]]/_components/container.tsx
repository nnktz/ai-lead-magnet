import { LeadMagnet } from '@prisma/client'

import { LeadMagnetEditorContextProvider } from '@/context/lead-magenet-editor-context'

import { Editor } from './editor'

export const Container = ({ leadMagnet }: { leadMagnet: LeadMagnet }) => {
  return (
    <LeadMagnetEditorContextProvider leadMagnet={leadMagnet}>
      <Editor />
    </LeadMagnetEditorContextProvider>
  )
}
