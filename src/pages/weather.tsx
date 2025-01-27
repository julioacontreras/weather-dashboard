import { useEffect } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { useWeather } from '../hooks/useWeather'
import { CELCUIS, FAHRENHEIT, WeatherData } from '../types/weather'
import CardWeather from '../components/card-weather'
import { useFavorite } from '../hooks/useFavortite'

const getQueryLocalization = (router: NextRouter) => {
  // to works in react router
  if (router.query['localization']) {
    return router.query['localization']
  }
  // to works when force refresh the page
  const params = new URLSearchParams(window.location.search)
  if (params.has('localization')) {
    return params.get('localization')
  }
  return null
}

export default function Weather() {
  const router = useRouter()
  const callbackUpdatedWeather = (data: WeatherData) => {
    loadWeatherStoraged(data)
  }
  const { weather, setWeather, loading, error, setIsMounted, callApiWeather} = useWeather(callbackUpdatedWeather)
  const { toggleFavorite, setStorage, loadWeatherStoraged, storageWeather } = useFavorite(setWeather)
  const handleToggleDegreeType = (weather: WeatherData) => {
    setWeather({ ...weather, degreeType: weather.degreeType === CELCUIS ? FAHRENHEIT : CELCUIS })
    storageWeather({ ...weather, degreeType: weather.degreeType === CELCUIS ? FAHRENHEIT : CELCUIS })
  }
  // once is mounted DOM, call api to get weather information
  useEffect(() => {
    setStorage(localStorage)
    const localization = getQueryLocalization(router)
    callApiWeather(localization as string)
    return () => {
      setIsMounted(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (<div className='flex flex-col justify-center items-center h-[80vh]'>
    {loading && <div> Loading... </div>}
    {error && <div> Error: {error} </div>}
    {!loading && weather &&
      <div className='flex flex-col w-full gap-4 justify-center items-center'>
        <CardWeather
          weather={weather}
          isDay={weather.isDay}
          onClickToggleFavorite={() => {toggleFavorite(weather)}}
          onClickToggleDegreeType={() => {handleToggleDegreeType(weather)}}
        />  
      </div>
    }
  </div>)
}