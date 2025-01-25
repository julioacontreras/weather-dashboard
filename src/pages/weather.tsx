import { useEffect } from 'react'
import CardWeather from '../components/card-weather'
import { useWeather } from '../hooks/useWeather'
import { CELCUIS, KEVIN } from '../types/weather'
import { useRouter } from 'next/router';

export default function Weather() {
  const router = useRouter()
  const { localization } = router.query
  const { data, loading, error, setIsMounted, callApiWeather, degreeType, setDegreeType } = useWeather(localization as string)
  const onClickChangeDegreeType = () => {
    setDegreeType(degreeType === CELCUIS ? KEVIN : CELCUIS)
  }
  useEffect(() => {
    callApiWeather()
    return () => {
      setIsMounted(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (<div>
    <div> Dashboard </div>
    {loading && <div> Loading... </div>}
    {error && <div> Error: {error} </div>}
    {!loading && data &&
      <div className='flex flex-col gap-4 justify-center items-center'>
        <CardWeather
          localization={data.localization}
          temperature={data.temperature[degreeType]}
          tempMin={data.tempMin[degreeType]}
          tempMax={data.tempMax[degreeType]}
          typeWeather={data.weather}
          description={data.description}
          isDay={data.isDay}
        />  
        <button className='text-sm' onClick={() => { onClickChangeDegreeType() }}>Change to {degreeType === CELCUIS ? 'Kelvin' : 'Celsius'}</button>
      </div>
    }
  </div>)
}