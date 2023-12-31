'use client'

import { LeadMagnet } from '@prisma/client'
import { useSession } from '@clerk/nextjs'

import { LeadMagnetEditorContextProvider } from '@/context/lead-magnet-editor-context'
import { ProfileEditorProvider } from '@/context/profile-editor-context'

import { Editor } from './editor'
import { LoadingScreen } from '@/components/loading-screen'

export const Container = ({ leadMagnet }: { leadMagnet: LeadMagnet }) => {
  const { isLoaded } = useSession()

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <LeadMagnetEditorContextProvider leadMagnet={leadMagnet}>
      <ProfileEditorProvider>
        <Editor />
      </ProfileEditorProvider>
    </LeadMagnetEditorContextProvider>
  )
}
