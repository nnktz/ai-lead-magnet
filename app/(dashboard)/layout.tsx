import { Navbar } from '@/components/navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      {children}
    </div>
  )
}

export default DashboardLayout
