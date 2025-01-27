import { useEffect, useState } from 'react'
import { useFavorite } from '../hooks/useFavortite'
import { CELCUIS, FAHRENHEIT, WeatherData } from '@/types/weather'
import CardWeatherFavortite from '@/components/card-weather-favorite'
import VideoBackground from '@/components/video-background'

export default function Favorite() {
  const setWeather = () => {
    setWeathers(getFavoritesWeathers())
  }
  const {removeFavorite, setStorage, storageWeather, getFavoritesWeathers} = useFavorite(setWeather)
  const [weathers, setWeathers] = useState<WeatherData[]>([])

  const handleToggleDegreeType = (weather: WeatherData) => {
    const index = weathers.findIndex(item => item.localization === weather.localization)
    weathers[index].degreeType = weather.degreeType === CELCUIS ? FAHRENHEIT : CELCUIS
    setWeathers([...weathers])  
    storageWeather({ ...weather })
  }
  
  // once is mounted DOM, call api to get weather information
  useEffect(() => {
    setStorage(localStorage)
    setWeathers(getFavoritesWeathers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return ( 
    <>
      <VideoBackground />
      <div className='px-6 flex gap-4 flex-col pt-6 container mx-auto max-w-[600px]'>
        <div className="text-lg text-shadow-sm">
          Managment favorite cities
        </div>
        {
          weathers && 
          weathers.length === 0 && 
          <div className="text-shadow-sm text-lg">
              You don't have any favorite cities
          </div>
        }
            
        {
          weathers && 
          weathers.map((weather, index) => (
            <CardWeatherFavortite
              key={index}
              weather={weather}
              onClickRemoveFavorite={() => {removeFavorite(weather)}}
              onClickToggleDegreeType={() => {handleToggleDegreeType(weather)}}
            ></CardWeatherFavortite>
          ))
        }
      </div>
    </>
  )
}
