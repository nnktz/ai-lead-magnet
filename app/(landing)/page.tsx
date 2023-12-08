import { CallToAction } from './_components/call-to-action'
import { Features } from './_components/features'
import { Hero } from './_components/hero'
import { HowItWorks } from './_components/how-it-works'
import { Pricing } from './_components/pricing'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CallToAction />
      </main>
    </div>
  )
}

export default LandingPage
