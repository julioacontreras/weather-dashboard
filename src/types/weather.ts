export const CELCUIS = 0
export const KEVIN = 1
export const FAHRENHEIT = 2
  
export enum TypeWeather {
  Clear = 0,
  Clouds,
  Rain,
  Snow
}

export type WeatherData = {
  localization: string
  temperature: string[]
  tempMin: string[]
  tempMax: string[]
  description: string
  weather: TypeWeather
  degreeType: number
  isDay: boolean
  isFavorite: boolean
  humidity: number
  windSpeed: number
}