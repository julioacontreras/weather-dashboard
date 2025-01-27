import { useState } from 'react'
import { useRouter } from 'next/router'
import VideoBackground from '@/components/video-background'

export default function Home() {
  const router = useRouter()
  const [city, setCity] = useState('')
  const handleSearchWeatherByCity = () => {
    router.push(`/weather?localization=${city}`)
  }
  const handleUpdateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  } 

  return (
    <>
      <VideoBackground />

      <div className="flex flex-col gap-4 justify-center items-center h-[80vh]">
        <div className="text-lg lg:text-3xl text-shadow-sm">
          Search weather by city
        </div>
        <div className="flex ">
          <input id="search-city" type="text" placeholder='New York' className=" rounded-l-lg p-3 " onChange={ handleUpdateCity }></input>
          <button className="bg-slate-700 px-3 py-1 rounded-r-lg" onClick={() => { handleSearchWeatherByCity() } }>Search</button>
        </div>
      </div>
    </>
  )
}
