import { useEffect, useState } from 'react'
import { useFavorite } from '../hooks/useFavortite'
import { WeatherData } from '@/types/weather'
import CardWeatherFavortite from '@/components/card-weather-favorite'

export default function Favorite() {
  const setWeather = () => {
    setWeathers(getFavoritesWeathers())
  }
  const {removeFavorite, setStorage, getFavoritesWeathers} = useFavorite(setWeather)
  const [weathers, setWeathers] = useState<WeatherData[]>([])

  // once is mounted DOM, call api to get weather information
  useEffect(() => {
    setStorage(localStorage)
    setWeathers(getFavoritesWeathers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return ( 
    <>
      <div className="text-lg">
          Managment favorite cities
      </div>
      {
        weathers && 
        weathers.map((weather, index) => (
          <CardWeatherFavortite
            key={index}
            localization={weather.localization}
            isFavorite={weather.isFavorite}
            onClickRemoveFavorite={() => {removeFavorite(weather)}}
          ></CardWeatherFavortite>
        ))
      }
    </>
  )
}
