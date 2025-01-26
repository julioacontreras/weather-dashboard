
import IconClear from './icon-clear'
import IconCloud from './icon-cloud'
import IconRain from './icon-rain'
import IconSnow from './icon-snow'
import IconFavorite from './icon-favorite'
import { TypeWeather } from '@/types/weather'

type CardWeatherProps = {
  localization: string
  temperature: string
  tempMin: string
  tempMax: string
  typeWeather: TypeWeather
  description: string
  isDay: boolean
  onClickToggleFavorite: () => void,
  isFavorite: boolean
};

export default function CardWeather(props: CardWeatherProps) {

  const bgColor = {
    [TypeWeather.Clear]: 'bg-gradient-to-t from-[#0a0a0a] via-[#0835ea1b] to-[#0a0a0a]',
    [TypeWeather.Clouds]: 'bg-gradient-to-t from-[#0a0a0a] via-[#eab2081b] to-[#0a0a0a]',
    [TypeWeather.Rain]: 'bg-gradient-to-t from-[#0a0a0a] via-[#eab2081b] to-[#0a0a0a]',
    [TypeWeather.Snow]: 'bg-gradient-to-t from-[#0a0a0a] via-[#eab2081b] to-[#0a0a0a]'
  }

  return (
    <div className={ bgColor[props.typeWeather] + " flex flex-col items-between justify-center" }>
      <div className="flex gap-4 justify-end items-center">
        <button onClick={props.onClickToggleFavorite}  >
          <IconFavorite isFavorite={props.isFavorite} />
        </button>
      </div>
      <div className="flex flex-col gap-4 items-center justify-between">
        <h1 className="text-xl font-bold">
          { props.localization }
        </h1>          
        <h1 className="text-4xl">
           { props.temperature }
        </h1>
        {  props.typeWeather === TypeWeather.Clear && <IconClear isDay={ props.isDay } /> }
        {  props.typeWeather === TypeWeather.Clouds && <IconCloud isDay={ props.isDay } /> }
        {  props.typeWeather === TypeWeather.Rain && <IconRain isDay={ props.isDay } /> }
        {  props.typeWeather === TypeWeather.Snow && <IconSnow isDay={ props.isDay } /> }
        <div className="text-center">
          <h1 className="text-1xl pb-4">
            { props.description }
          </h1>
          <p className="text-sm">
            Max. {props.tempMax} Min. {props.tempMax}  
          </p>
        </div>
      </div>
    </div>
  )
}