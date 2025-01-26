import { useEffect } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { useWeather } from '../hooks/useWeather'
import { CELCUIS, KEVIN, WeatherData } from '../types/weather'
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
    updateIsFavorite(data)
  }
  const { weather, setWeather, loading, error, setIsMounted, callApiWeather} = useWeather(callbackUpdatedWeather)
  const { toggleFavorite, setStorage, updateIsFavorite } = useFavorite(setWeather)
  const handleChangeDegreeType = (weather: WeatherData) => {
    setWeather({ ...weather, degreeType: weather.degreeType === CELCUIS ? KEVIN : CELCUIS })
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
  
  return (<div>
    <div> Dashboard </div>
    {loading && <div> Loading... </div>}
    {error && <div> Error: {error} </div>}
    {!loading && weather &&
      <div className='flex flex-col gap-4 justify-center items-center'>
        <CardWeather
          localization={weather.localization}
          temperature={weather.temperature[weather.degreeType]}
          tempMin={weather.tempMin[weather.degreeType]}
          tempMax={weather.tempMax[weather.degreeType]}
          typeWeather={weather.weather}
          description={weather.description}
          isDay={weather.isDay}
          onClickToggleFavorite={() => {toggleFavorite(weather)}}
          isFavorite={weather.isFavorite}
        />  
        <button
          className='text-sm'
          onClick={() => {handleChangeDegreeType(weather)}}>Change to {weather.degreeType === CELCUIS ? 'Kelvin' : 'Celsius'}</button>
      </div>
    }
  </div>)
}