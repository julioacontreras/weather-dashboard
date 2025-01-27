import Link from 'next/link'
import IconRemove from './icon-remove'
import { CELCUIS, WeatherData } from '@/types/weather'

type Props = {
  weather: WeatherData
  onClickRemoveFavorite: () => void
  onClickToggleDegreeType: () => void
}

export default function CardWeatherFavortite(props: Props) {
  return (
    <div className='flex bg-slate-800 rounded-lg p-3 gap-4 justify-between min-w-[290px]'>
      <div className="flex">
        <Link href={`/weather?localization=${props.weather.localization}`} className="text-xl lg:text-3xl hover:text-slate-400">
          { props.weather.localization }
        </Link>          
      </div>
      <div className="flex flex-1 gap-4 justify-end">
        <button onClick={props.onClickToggleDegreeType} className='hover:text-slate-400'>
          {props.weather.degreeType === CELCUIS ? 'Celsius' : 'Fahrenheit'}
        </button>
        <button onClick={props.onClickRemoveFavorite} >
          <IconRemove />
        </button>
      </div>
    </div>
  )
}