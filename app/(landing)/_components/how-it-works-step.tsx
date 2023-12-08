import { CheckIcon } from 'lucide-react'

interface IHowItWorksStep {
  title: string
  description: string
  checks: string[]
}

export const HowItWorksStep = ({ title, description, checks }: IHowItWorksStep) => {
  return (
    <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
      <h3 className="text-xl font-semibold text-purple-500">{title}</h3>

      <p className="mt-2 font-semibold text-gray-600">{description}</p>

      <ul className="mt-2">
        {checks.map((check, index) => (
          <li key={index} className="flex items-center font-normal text-gray-500">
            <CheckIcon className="mr-2 text-purple-500" />
            {check}
          </li>
        ))}
      </ul>
    </div>
  )
}
