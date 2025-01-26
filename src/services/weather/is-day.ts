export const isDay = (sunrise: number, sunset: number): boolean => {
  return sunrise > sunset
}