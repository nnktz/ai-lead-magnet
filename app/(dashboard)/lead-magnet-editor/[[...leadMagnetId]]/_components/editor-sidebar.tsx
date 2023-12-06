import { Dispatch, SetStateAction } from 'react'
import {
  BookOpenIcon,
  LucideIcon,
  MailIcon,
  UserIcon,
  SettingsIcon,
  TerminalIcon,
  PanelRightCloseIcon,
  PanelLeftCloseIcon,
} from 'lucide-react'

import { LeadMagnetSections } from './editor'
import { cn } from '@/lib/utils'

type EditorOptionsType = {
  label: string
  icon: LucideIcon
  value: LeadMagnetSections
}

const EDITOR_OPTIONS: EditorOptionsType[] = [
  {
    label: 'Content Editor',
    icon: BookOpenIcon,
    value: 'content',
  },
  {
    label: 'Prompt Editor',
    icon: TerminalIcon,
    value: 'prompt',
  },
  {
    label: 'Email Capture',
    icon: MailIcon,
    value: 'email',
  },
  {
    label: 'Profile Editor',
    icon: UserIcon,
    value: 'profile',
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    value: 'settings',
  },
]

type EditorSidebarProps = {
  isSidebarCollapsed: boolean
  setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>
  setSelectedEditor: Dispatch<SetStateAction<LeadMagnetSections>>
}

export const EditorSidebar = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  setSelectedEditor,
}: EditorSidebarProps) => {
  return (
    <div
      className="flex h-full w-fit flex-col border-r border-gray-200 bg-white transition-all duration-300"
      style={{
        height: 'calc(100vh - 131px)',
      }}
    >
      <div
        className={cn(
          'flex h-full flex-col px-4 pb-4',
          isSidebarCollapsed ? 'w-fit' : 'min-w-[210px]',
        )}
      >
        {EDITOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            className="mt-4 flex h-7 items-center text-xl font-semibold text-gray-600"
            onClick={() => setSelectedEditor(option.value)}
          >
            <span className=" text-purple-400">
              <option.icon />
            </span>

            {!isSidebarCollapsed && <span className="ml-2">{option.label}</span>}
          </button>
        ))}

        <button
          className="ml-auto mt-auto text-2xl text-purple-400"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? <PanelRightCloseIcon /> : <PanelLeftCloseIcon />}
        </button>
      </div>
    </div>
  )
}
