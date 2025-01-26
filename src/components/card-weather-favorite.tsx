
import IconRemove from './icon-remove'

type Props = {
  localization: string
  isFavorite: boolean
  onClickRemoveFavorite: () => void
}

export default function CardWeatherFavortite(props: Props) {
  return (
    <div className='flex'>
      <div className="flex">
        <h1 className="text-xl lg:text-3xl ">
          { props.localization }
        </h1>          
      </div>
      <div className="flex flex-1 gap-4 justify-end">
        <button onClick={props.onClickRemoveFavorite} >
          <IconRemove />
        </button>
      </div>
    </div>
  )
}