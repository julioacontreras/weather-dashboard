export const prepareTemperature = (temperature: number): number => {
  if (temperature < 0) {
    throw new Error('Temperature cannot be negative.')
  }
  return Math.round(temperature)
}