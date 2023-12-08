import Image from 'next/image'

import { HowItWorksStep } from './how-it-works-step'

export const HowItWorks = () => {
  return (
    <div className="py-24">
      <h2 className="mb-5 text-center text-5xl font-bold">How It Works</h2>

      <div className="mx-auto flex flex-col md:max-w-7xl md:space-y-12">
        {/* Step 1 */}
        <div className="flex flex-col justify-between sm:!flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image
              src={'/images/landing-page-step-1.png'}
              alt="Step 1: Create Your AI Lead Magnet"
              width={2732}
              height={1384}
              className="drop-shadow-2xl"
            />
          </div>

          <HowItWorksStep
            title="Step 1: Create Your AI Lead Magnet"
            description="Define the value proposition and train the AI to ask specific questions."
            checks={[
              'Go live in under 5 minutes',
              'Train with your own data',
              'Guide users to the desired outcome',
            ]}
          />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col justify-between sm:!flex-row-reverse sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image
              src={'/images/landing-page-step-2.png'}
              alt="Step 2: Share on Social Media"
              width={2282}
              height={1354}
              className="drop-shadow-2xl"
            />
          </div>

          <HowItWorksStep
            title="Step 2: Share on Social Media"
            description="Promote your AI Lead Magnet with a simple link at the end of your posts."
            checks={[
              'Share across multiple platforms',
              'Integrated with LinkedIn and Twitter',
              'Customize your LeadConvert link',
            ]}
          />
        </div>

        {/* Step 3 */}
        <div className="flex flex-col justify-between sm:!flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image
              src={'/images/landing-page-step-3.png'}
              alt="Step 3: Capture and Convert"
              width={2282}
              height={1354}
              className="drop-shadow-2xl"
            />
          </div>

          <HowItWorksStep
            title="Step 3: Capture and Convert"
            description="LeadConvert asks for the user's email address, providing you with engaged leads ready for follow-up."
            checks={[
              'Automated email capture',
              'Engage leads with dynamic content',
              'Seamless integration with CRM',
            ]}
          />
        </div>
      </div>
    </div>
  )
}
