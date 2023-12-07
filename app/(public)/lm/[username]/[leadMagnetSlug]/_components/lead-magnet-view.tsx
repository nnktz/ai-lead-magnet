import { LeadMagnet, Profile } from '@prisma/client'
import Image from 'next/image'

type LeadMagnetViewProps = {
  leadMagnet: LeadMagnet
  profile: Profile
}

export const LeadMagnetView = ({ leadMagnet, profile }: LeadMagnetViewProps) => {
  return (
    <div className="mb-10 flex max-h-[85vh] flex-1 flex-col overflow-y-hidden rounded-lg bg-white p-4 shadow-lg md:mb-0 md:p-8">
      {profile.profileImageUrl && (
        <Image
          src={profile.profileImageUrl}
          alt="profile image"
          height={275}
          width={275}
          className="mx-auto mb-3 drop-shadow-lg"
        />
      )}

      <h1 className="text-center text-2xl font-semibold text-gray-800">{profile.title}</h1>

      <h2 className="text-center text-gray-500">{profile.description}</h2>

      <hr className="my-6" />

      <h1 className="mb-4 text-xl font-semibold text-gray-700 md:text-2xl">
        {leadMagnet.publishedTitle}
      </h1>

      {leadMagnet.publishedSubtitle && (
        <h2 className="mb-6 text-gray-500 md:text-2xl">{leadMagnet.publishedSubtitle}</h2>
      )}

      <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: leadMagnet.publishedBody }} />
    </div>
  )
}
