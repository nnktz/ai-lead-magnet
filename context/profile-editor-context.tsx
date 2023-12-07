import axios from 'axios'
import toast from 'react-hot-toast'
import { Account, Profile } from '@prisma/client'
import {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react'
import { useAuth } from '@clerk/nextjs'

const DEFAULT_PROFILE: Profile = {
  id: '',
  userId: '',
  title: '',
  description: '',
  profileImageUrl: '',
  createdAt: new Date(),
  updatedAt: new Date(),
}

interface ProfileEditorContextState {
  editedProfile: Profile
  setEditedProfile: Dispatch<SetStateAction<Profile>>
  save: () => Promise<void>
  account: Account | null
}

const ProfileEditorContext = createContext<ProfileEditorContextState | null>(null)

export const ProfileEditorProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth()

  const [editedProfile, setEditedProfile] = useState<Profile>(DEFAULT_PROFILE)
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios
        .get(`/api/profile?userId=${userId}`)
        .then((res) => {
          const retchedProfile = res.data.data
          return retchedProfile
        })
        .catch((error) => {
          console.log(error)
          toast.error('Failed to fetch profile.')
          return DEFAULT_PROFILE
        })

      setEditedProfile(response)
    }

    fetchProfile()
  }, [userId])

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await axios
        .get('/api/account')
        .then((res) => {
          if (res.data) {
            const retchedAccount = res.data.data
            return retchedAccount
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Failed to fetch account.')
          return null
        })

      setAccount(response)
    }

    fetchAccount()
  }, [])

  const save = async () => {
    const response = await axios.request({
      method: editedProfile.id ? 'PUT' : 'POST',
      url: '/api/profile',
      data: editedProfile,
    })

    const updateProfile = response.data.data

    if (updateProfile) {
      setEditedProfile(updateProfile)
      toast.success('Profile saved successfully.')
    } else {
      toast.error('Failed to save profile.')
    }
  }

  return (
    <ProfileEditorContext.Provider value={{ editedProfile, setEditedProfile, save, account }}>
      {children}
    </ProfileEditorContext.Provider>
  )
}

// Custom hook to use the context
export const useProfileEditorContext = () => {
  const context = useContext(ProfileEditorContext)

  if (!context) {
    throw new Error('useProfileEditorContext must be used within a ProfileEditorProvider')
  }

  return context
}
