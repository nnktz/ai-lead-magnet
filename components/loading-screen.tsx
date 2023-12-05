import RingLoader from 'react-spinners/RingLoader'

export const LoadingScreen = () => {
  return (
    <div className="z-50 flex h-screen w-screen items-center justify-center bg-white">
      <div className="relative flex flex-col items-center justify-center">
        <div className="z-10 mb-5 text-5xl font-bold text-purple-500">LeadConvert</div>

        <RingLoader color="rgba(168, 85, 247, 1)" speedMultiplier={1.5} />
      </div>
    </div>
  )
}
