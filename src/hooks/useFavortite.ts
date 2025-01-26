import { getJSONItem, setJSONItem, setStorage, hasStorage } from '../services/storage'
import { WeatherData } from '../types/weather'

export const useFavorite = (setWeather: (weather: WeatherData) => void) => {
  const KEY_FAVORITES = 'favorites'

  const updateIsFavorite = (weather: WeatherData) => {
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    const isFavorite = favorites.findIndex(item => item.localization === weather.localization) !== -1
    setWeather({ ...weather, isFavorite })
  }

  const addFavorite = (weather: WeatherData) => { 
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    setJSONItem(KEY_FAVORITES, [...favorites, weather])
    updateIsFavorite(weather)
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

  const removeFavorite = (weather: WeatherData) => {
    if (!hasStorage()) {
      return
    }
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    const index = favorites.findIndex(item => item.localization === weather.localization)
    if (index === -1) {
      return
    }
    favorites.splice(index, 1)
    setJSONItem(KEY_FAVORITES,favorites )
    updateIsFavorite(weather)
  }

  const getFavoritesWeathers = (): WeatherData[] => {
    return getJSONItem(KEY_FAVORITES) as WeatherData[] || []
  }

  return {
    toggleFavorite,
    removeFavorite,
    setStorage,
    updateIsFavorite,
    getFavoritesWeathers
  }
}