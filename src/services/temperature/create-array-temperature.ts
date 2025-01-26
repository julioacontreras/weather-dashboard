import { kelvinToCelsius } from './kelvin-to-celsius'
import { kelvinToFahrenheit } from './kelvin-to-fahrenheit'
import { prepareTemperature } from './prepare-temperature'

export const createArrayTemperature = (temperatureKevin: number): string[] => {
  return [
    prepareTemperature(kelvinToCelsius(temperatureKevin)) + ' °C',
    prepareTemperature(temperatureKevin) + ' °K',
    prepareTemperature(kelvinToFahrenheit(temperatureKevin)) + ' °F'
  ]
}