import { useState } from 'react'
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
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="text-lg">
        Search weather by city
      </div>
      <div className="flex gap-4">
        <input type="text" className="dark:text-black rounded-sm p-1" onChange={ handleUpdateCity }></input>
        <button className="dark:bg-slate-50 dark:text-black px-2 py-1 rounded-sm" onClick={() => { handleSearchWeatherByCity() } }>Search</button>
      </div>
    </div>
  )
}
