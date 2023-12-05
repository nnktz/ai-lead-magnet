import { Navbar } from './_components/navbar'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex max-h-screen flex-col overflow-x-clip">
      <Navbar />
      <div className="flex-grow">{children}</div>
    </section>
  )
}

export default LandingLayout
