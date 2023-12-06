import { Profile } from '@prisma/client'
import Image from 'next/image'

export const ProfilePreview = ({ profile }: { profile: Profile }) => {
  return (
    <div className="mb-10 flex max-h-[85vh] flex-col overflow-y-hidden rounded-lg text-center md:mb-0 md:p-8">
      {profile.profileImageUrl && (
        <Image
          src={profile.profileImageUrl}
          alt="profile image"
          height={300}
          width={300}
          className="mx-auto mb-3 drop-shadow-lg"
        />
      )}

      <h1 className="text-center text-2xl font-semibold text-gray-800">{profile.title}</h1>

      <h2 className="text-center text-gray-500">{profile.description}</h2>
    </div>
  )
}
