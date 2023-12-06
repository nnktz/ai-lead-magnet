import axios from 'axios'
import toast from 'react-hot-toast'
import { Profile } from '@prisma/client'
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
}

const ProfileEditorContext = createContext<ProfileEditorContextState | null>(null)

export const ProfileEditorProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth()

  const [editedProfile, setEditedProfile] = useState<Profile>(DEFAULT_PROFILE)

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
    <ProfileEditorContext.Provider value={{ editedProfile, setEditedProfile, save }}>
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
