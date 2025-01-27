import '@testing-library/jest-dom'
import { kelvinToCelsius } from '../../../../src/services/temperature/kelvin-to-celsius'

describe('Kelvin to celsius Service', () => {
  test("check if the celsius is correct", () => {
    const celsius = kelvinToCelsius(300)
    expect(celsius).toBe(26.850000000000023)
  })
})