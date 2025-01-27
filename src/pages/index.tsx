import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [city, setCity] = useState('')
  const handleSearchWeatherByCity = () => {
    router.push(`/weather?localization=${city}`)
  }
  const handleUpdateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  } 
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
      <video ref={videoRef} className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" autoPlay loop muted>
        <source src="background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col gap-4 justify-center items-center h-[80vh]">
        <div className="text-lg lg:text-3xl text-shadow-sm">
          Search weather by city
        </div>
        <div className="flex ">
          <input type="text" placeholder='New York' className=" rounded-l-lg p-3 " onChange={ handleUpdateCity }></input>
          <button className="bg-slate-700 px-3 py-1 rounded-r-lg" onClick={() => { handleSearchWeatherByCity() } }>Search</button>
        </div>
      </div>
    </>
  )
}
