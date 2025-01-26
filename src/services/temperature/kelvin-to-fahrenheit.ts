export const kelvinToFahrenheit = (kelvin: number): number => {
  if (kelvin < 0) {
    throw new Error("Kelvin temperature cannot be negative.");
  }
  return (kelvin - 273.15) * 9/5 + 32;
}