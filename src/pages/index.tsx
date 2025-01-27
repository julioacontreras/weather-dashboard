import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import VideoBackground from '@/components/video-background'

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [city, setCity] = useState('')
  const handleSearchWeatherByCity = () => {
    router.push(`/weather?localization=${city}`)
  }
  const handleUpdateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  } 
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchWeatherByCity()
    }
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  
  return (
    <>
      <VideoBackground />

      <div className="flex flex-col gap-4 justify-center items-center h-[80vh]">
        <div className="text-lg lg:text-3xl text-shadow-sm">
          Search weather by city
        </div>
        <div className="flex ">
          <input ref={inputRef} onKeyDown={handleKeyDown} id="search-city" type="text" placeholder='New York' className="text-black rounded-l-lg p-3 focus:ring-0 outline-none" onChange={ handleUpdateCity }></input>
          <button className="bg-slate-700 px-3 py-1 rounded-r-lg" onClick={() => { handleSearchWeatherByCity() } }>Search</button>
        </div>
      </div>
    </>
  )
}
