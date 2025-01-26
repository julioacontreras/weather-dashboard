import { CELCUIS, TypeWeather, WeatherData } from '@/types/weather'
import { NextApiRequest, NextApiResponse } from 'next'

const kelvinToCelsius = (kelvin: number): number => {
  if (kelvin < 0) {
    throw new Error('Kelvin cannot be negative.')
  }
  return kelvin - 273.15
}

const prepareTemperature = (temperature: number): number => {
  if (temperature < 0) {
    throw new Error('Temperature cannot be negative.')
  }
  return Math.round(temperature)
}

const createArrayTemperature = (temperatureKevin: number): string[] => {
  return [prepareTemperature(kelvinToCelsius(temperatureKevin)) + ' °C', prepareTemperature(temperatureKevin) + ' °K']
}

const parseWeather = (weather: string): TypeWeather => {
  if (weather === 'Clear') return TypeWeather.Clear
  if (weather === 'Clouds') return TypeWeather.Clouds
  if (weather === 'Rain') return TypeWeather.Rain
  if (weather === 'Snow') return TypeWeather.Snow
  return TypeWeather.Clear
}

const isDay = (sunrise: number, sunset: number): boolean => {
  return sunrise > sunset
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) { 
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  // request wheater information
  const { localization } = req.query
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${localization}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Network error')
  const result = await response.json()
  const data: WeatherData = {
    localization: result.name,
    temperature: createArrayTemperature(result.main.temp),
    tempMin: createArrayTemperature(result.main.temp_min),
    tempMax: createArrayTemperature(result.main.temp_max),
    weather: parseWeather(result.weather[0].main),
    description: result.weather[0].description,
    isDay: isDay(result.sys.sunrise, result.sys.sunset),
    degreeType: CELCUIS
  }
  return res.status(200).json(data)
}
