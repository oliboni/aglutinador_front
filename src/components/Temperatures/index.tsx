import MyGauge from 'components/MyGauge'
import styles from './Temperatures.module.scss'

interface IProps {
   temp: number
   className: string
}

export default function Temperatures({temp, className}: IProps) {
   return (
      <div className={className}>
         <MyGauge
            score={temp}
            textComplement='°C'
            strokeColor='#c62a2a'
            maxValue={250}
         />
      </div>
   )
}
