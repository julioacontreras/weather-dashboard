import IconNight from "./icon-night";
import IconSun from "./icon-sun";
import IconFavorite from "./icon-favorite";

export enum TimeOfDay {
  Night = 0,
  Day
}

type CardWeatherProps = {
  localization: string;
  temperature: string;
  timeOfDay: TimeOfDay;
};

export default function CardWeather(props: CardWeatherProps) {

  const bgColor = {
    [TimeOfDay.Night]: 'bg-gradient-to-t from-[#0a0a0a] via-[#0835ea1b] to-[#0a0a0a]',
    [TimeOfDay.Day]: 'bg-gradient-to-t from-[#0a0a0a] via-[#eab2081b] to-[#0a0a0a]'
  }

  return (
    <div className={ bgColor[props.timeOfDay] + " flex flex-col items-between justify-center" }>
      <div className="flex gap-4 justify-end items-center">
        <IconFavorite />
      </div>
      <div className="flex flex-col gap-4 items-center justify-between">
        <h1 className="text-xl font-bold">
          { props.localization }
        </h1>          
        <h1 className="text-4xl">
           { props.temperature }
        </h1>
        {  props.timeOfDay === TimeOfDay.Night && <IconNight /> }
        {  props.timeOfDay === TimeOfDay.Day && <IconSun /> }
        <div className="text-center">
          <h1 className="text-1xl pb-4">
            Desplejado
          </h1>
          <p className="text-sm">
            Max. 2.1°C Min 12°C  
          </p>
        </div>
      </div>
    </div>
  );
}