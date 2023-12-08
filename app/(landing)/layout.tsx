import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex max-h-screen flex-col overflow-x-clip">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </section>
  )
}

export default LandingLayout
