export const CELCUIS = 0
export const KEVIN = 1
  
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
}