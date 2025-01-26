export const kelvinToCelsius = (kelvin: number): number => {
  if (kelvin < 0) {
    throw new Error('Kelvin cannot be negative.')
  }
  return kelvin - 273.15
}