import { TypeWeather } from '@/types/weather'

export const parseWeather = (weather: string): TypeWeather => {
  if (weather === 'Clear') return TypeWeather.Clear
  if (weather === 'Clouds') return TypeWeather.Clouds
  if (weather === 'Rain') return TypeWeather.Rain
  if (weather === 'Snow') return TypeWeather.Snow
  return TypeWeather.Clear
}