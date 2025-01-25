import { useState } from 'react'
import { WeatherData, CELCUIS } from '../types/weather'

type ErrorMessage = {
  message: string
}

export function useWeather(localization: string) {
  const url = `${process.env.NEXT_PUBLIC_WEATHER_URL}/api/weather?localization=${localization}`
  const [data, setData] = useState<WeatherData | null>(null)
  const [degreeType, setDegreeType] = useState(CELCUIS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState<boolean>(true)
  const callApiWeather = () => {
    setIsMounted(true)
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network error')
        const result = await response.json()
        if (isMounted) setData(result)
      } catch (err) {
        if (isMounted) setError((err as ErrorMessage).message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
  }
  return { data, loading, error, isMounted, setIsMounted, callApiWeather, degreeType, setDegreeType }
}