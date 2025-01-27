import { useEffect, useRef } from 'react'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 82; // 1 minute = 60 seconds + 22 seconds
        }
      })
    }
  }, [])
  
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full object-cover z-[-1] bg-[#0000006c]">
      </div>
      <video ref={videoRef} className="fixed top-0 left-0 w-full h-full object-cover z-[-2]" autoPlay loop muted>
        <source src="background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  )
}