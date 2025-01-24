import CardWeather from '../components/card-weather'
import { TimeOfDay } from '../components/card-weather'

export default function Dashboard() {
  return (<div>
    <div> Dashboard </div>

    <CardWeather
      localization='Valencia, Spain'
      temperature='13°C ' 
      timeOfDay={TimeOfDay.Day} />
  </div>)
}