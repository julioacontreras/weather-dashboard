
import IconClear from './icon-clear'
import IconCloud from './icon-cloud'
import IconRain from './icon-rain'
import IconSnow from './icon-snow'
import IconFavorite from './icon-favorite'
import { CELCUIS, TypeWeather, WeatherData } from '@/types/weather'

type CardWeatherProps = {
  weather: WeatherData
  isDay: boolean
  onClickToggleFavorite: () => void
  onClickToggleDegreeType: () => void
}

export default function CardWeather(props: CardWeatherProps) {

  const bgColor = props.isDay ? 'bg-gradient-to-t from-[#0a0a0a] via-[#eab2081b] to-[#0a0a0a]' : 'bg-gradient-to-t from-[#0a0a0a] via-[#0835ea1b] to-[#0a0a0a]'

  return (
    <div className={ `p-3 flex flex-col items-between justify-center ${bgColor}` }>
      <div className="flex gap-4 justify-end items-center pb-2">
        <button onClick={props.onClickToggleFavorite}  >
          <IconFavorite isFavorite={props.weather.isFavorite} />
        </button>
      </div>
      <div className="flex flex-col gap-4 items-center justify-between">
        <div className="flex gap-4">
          <div>
            <h1 className="text-xl font-bold">
              { props.weather.localization }
            </h1>
            <div className='flex'>
              <h1 className="text-4xl">
                <button onClick={props.onClickToggleDegreeType} className='hover:text-yellow-100' >
                  { props.weather.temperature[props.weather.degreeType] } 
                </button>
              </h1>
              <h1 className="text-4xl text-slate-500 px-1">|</h1>
              <h1 className="text-4xl">
                <button onClick={props.onClickToggleDegreeType} className='hover:text-yellow-100 text-slate-500' >
                  {props.weather.degreeType === CELCUIS ? '°F' : '°C'}
                </button>
              </h1>
            </div>
          </div>
          <div>
            <p className='text-sm text-slate-500'>Humidity: { props.weather.humidity }%</p>
            <p className='text-sm text-slate-500'>Wind speed: {props.weather.windSpeed}%</p>
            <p className="text-sm text-slate-500">Max.: {props.weather.tempMax[props.weather.degreeType]}</p>
            <p className="text-sm text-slate-500">Min.: {props.weather.tempMin[props.weather.degreeType]}</p>
          </div>
        </div>

        {  props.weather.weather === TypeWeather.Clear && <IconClear isDay={ props.isDay } /> }
        {  props.weather.weather === TypeWeather.Clouds && <IconCloud isDay={ props.isDay } /> }
        {  props.weather.weather === TypeWeather.Rain && <IconRain isDay={ props.isDay } /> }
        {  props.weather.weather === TypeWeather.Snow && <IconSnow isDay={ props.isDay } /> }
        <div className="text-center">
          <h1 className="text-1xl pb-4 text-slate-500 capitalize">
            { props.weather.description }
          </h1>
        </div>
      </div>
    </div>
  )
}