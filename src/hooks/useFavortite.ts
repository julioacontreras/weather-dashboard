import { getJSONItem, setJSONItem, setStorage, hasStorage } from '../services/storage'
import { WeatherData } from '../types/weather'

export const useFavorite = (setWeather: (weather: WeatherData) => void) => {
  const KEY_FAVORITES = 'favorites'

  const loadWeatherStoraged = (weather: WeatherData) => {
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    const index = favorites.findIndex(item => item.localization === weather.localization)
    const isFavorite = index !== -1
    const degreeType = favorites[index].degreeType
    setWeather({ ...weather, isFavorite, degreeType })
  }

  const storageWeather = (weather: WeatherData) => {
    const noUpdate = true
    removeFavorite(weather, noUpdate)
    addFavorite(weather, noUpdate)
  }

  const addFavorite = (weather: WeatherData, noUpdate?: boolean) => { 
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    setJSONItem(KEY_FAVORITES, [...favorites, weather])
    if (noUpdate) {
      return
    }
    loadWeatherStoraged(weather)
  }

  const toggleFavorite = (weather: WeatherData) => {
    if (!hasStorage()) {
      return
    }
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    const index = favorites.findIndex(item => item.localization.toLowerCase() === weather.localization.toLowerCase())
    if (index === -1) {
      addFavorite(weather)
    } else {
      removeFavorite(weather)
    }
  }

  const removeFavorite = (weather: WeatherData, noUpdate?: boolean) => {
    if (!hasStorage()) {
      return
    }
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    const index = favorites.findIndex(item => item.localization === weather.localization)
    if (index === -1) {
      return
    }
    favorites.splice(index, 1)
    setJSONItem(KEY_FAVORITES, favorites)
    if (noUpdate) {
      return
    }
    loadWeatherStoraged(weather)
  }

  const getFavoritesWeathers = (): WeatherData[] => {
    return getJSONItem(KEY_FAVORITES) as WeatherData[] || []
  }

  return {
    toggleFavorite,
    removeFavorite,
    setStorage,
    loadWeatherStoraged,
    storageWeather,
    getFavoritesWeathers
  }
}