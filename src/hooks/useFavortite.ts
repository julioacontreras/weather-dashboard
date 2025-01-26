import { getJSONItem, setJSONItem, setStorage, hasStorage } from '../services/storage'
import { WeatherData } from '../types/weather'

export const useFavorite = (setWeather: (weather: WeatherData) => void) => {
  const KEY_FAVORITES = 'favorites'

  const updateIsFavorite = (weather: WeatherData) => {
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    const isFavorite = favorites.findIndex(item => item.localization === weather.localization) !== -1
    // console.log('updateIsFavorite', favorites)
    setWeather({ ...weather, isFavorite })
  }

  const addFavorite = (weather: WeatherData) => { 
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    console.log('addFavorite', favorites)
    setJSONItem(KEY_FAVORITES, [...favorites, weather])
  }

  const toggleFavorite = (weather: WeatherData) => {
    if (!hasStorage()) {
      return
    }
    const favorites = getJSONItem(KEY_FAVORITES) as WeatherData[] || []
    const index = favorites.findIndex(item => item.localization.toLowerCase() === weather.localization.toLowerCase())
    if (index === -1) {
      addFavorite(weather)
      updateIsFavorite(weather)
    } else {
      removeFavorite(weather)
      updateIsFavorite(weather)
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
    console.log('removeFavorite', favorites)
    setJSONItem(KEY_FAVORITES, favorites.splice(index, 0))
  }

  return {
    toggleFavorite,
    removeFavorite,
    setStorage,
    updateIsFavorite
  }
}