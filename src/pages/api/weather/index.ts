import { CELCUIS, WeatherData } from '@/types/weather'
import { NextApiRequest, NextApiResponse } from 'next'
import { createArrayTemperature } from '@/services/temperature/create-array-temperature'
import { parseWeather } from '@/services/weather/parse-weather'
import { isDay } from '@/services/weather/is-day'

export default async function GET(req: NextApiRequest, res: NextApiResponse) { 
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  // request wheater information
  const { localization } = req.query
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${localization}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Invalid city')
  const result = await response.json()
  const data: WeatherData = {
    localization: result.name,
    temperature: createArrayTemperature(result.main.temp),
    tempMin: createArrayTemperature(result.main.temp_min),
    tempMax: createArrayTemperature(result.main.temp_max),
    weather: parseWeather(result.weather[0].main),
    description: result.weather[0].description,
    isDay: isDay(result.sys.sunrise, result.sys.sunset),
    degreeType: CELCUIS,
    isFavorite: false,
    humidity: result.main.humidity,
    windSpeed: result.wind.speed
  }
  return res.status(200).json(data)
}
