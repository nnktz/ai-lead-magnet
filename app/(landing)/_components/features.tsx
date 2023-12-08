import { MailIcon, Share2, SparkleIcon } from 'lucide-react'

import { FeatureCard, IFeatureCard } from './feature-card'

const features: IFeatureCard[] = [
  {
    title: 'Unique AI Lead Magnets',
    description:
      "Beyond ebooks and videos, offer dynamic AI solutions the speak directly to your audience's needs.",
    icon: SparkleIcon,
  },
  {
    title: 'Effortless Email Capture',
    description:
      'Let AI chatbot do all the hard work and capture leads for you, turing interactions into opportunities effortlessly.',
    icon: MailIcon,
  },
  {
    title: 'Easy Integration with Social Media',
    description:
      'Make your posts work for you; effortlessly share interactive content and boots your lead generation.',
    icon: Share2,
  },
]

export const Features = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center space-y-10 px-8 pb-12 pt-8 sm:py-12 md:flex-row md:space-x-10 md:space-y-0 md:py-20 lg:py-28 2xl:py-32">
      <div className="absolute inset-0 z-0 -skew-y-6 transform bg-gradient-to-r from-purple-100 to-purple-50" />

      <div className="relative z-10 flex flex-col justify-center space-y-10 md:!flex-row md:space-x-10 md:space-y-0">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  )
}
