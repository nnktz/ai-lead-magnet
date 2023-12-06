'use client'

import { useState } from 'react'

import { EditorNavbar } from './editor-navbar'
import { ContentEditor } from './content-editor'
import { EditorSidebar } from './editor-sidebar'
import { PromptEditor } from './prompt-editor'

export type LeadMagnetSections = 'content' | 'prompt' | 'email' | 'profile' | 'settings'

export const Editor = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [selectedEditor, setSelectedEditor] = useState<LeadMagnetSections>('content')

  return (
    <div
      className="flex h-screen w-full flex-col overflow-y-hidden"
      style={{
        height: 'calc(100vh- 66px)',
      }}
    >
      <EditorNavbar />

      <div className="flex h-full flex-row">
        <EditorSidebar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          setSelectedEditor={setSelectedEditor}
        />

        <div className="h-full flex-grow">
          {selectedEditor === 'content' && <ContentEditor />}
          {selectedEditor === 'prompt' && <PromptEditor />}
          {/* {selectedEditor === 'email' && <EmailEditor />} */}
          {/* {selectedEditor === 'profile' && <ProfileEditor />} */}
          {/* {selectedEditor === 'settings' && <Settings />} */}
        </div>
      </div>
    </div>
  )
}
