import { useState } from 'react'
import { WeatherData } from '../types/weather'

type ErrorMessage = {
  message: string
}

export function useWeather(callback: (data: WeatherData) => void) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState<boolean>(true)

  const callApiWeather = (localization: string) => {
    const url = `${process.env.NEXT_PUBLIC_WEATHER_URL}/api/weather?localization=${localization}`
    setIsMounted(true)
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network error')
        const weather = await response.json()
        if (isMounted) {
          setWeather(weather)
          callback(weather)
        }

      } catch (err) {
        if (isMounted) setError((err as ErrorMessage).message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
  }
  return { weather, setWeather, loading, error, isMounted, setIsMounted, callApiWeather }
}