import { LucideIcon } from 'lucide-react'

export interface IFeatureCard {
  title: string
  description: string
  icon: LucideIcon
}

export const FeatureCard = ({ title, description, icon: Icon }: IFeatureCard) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-purple-200 bg-white p-8 text-center">
      <div className="mb-4 rounded-full bg-purple-500 p-4 text-white">
        <Icon className="h-16 w-16" />
      </div>

      <h2 className="mt-4 text-xl font-light text-purple-500">{title}</h2>

      <p className="mt-2 italic text-gray-600">{description}</p>
    </div>
  )
}
