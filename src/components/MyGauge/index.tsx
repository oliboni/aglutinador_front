import styles from './MyGauge.module.scss'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface IProps {
   score: number
   textComplement: string
   strokeColor: string,
   maxValue: number
}

export default function MyGauge({
   score,
   textComplement,
   strokeColor,
   maxValue
}: IProps) {
   return (
      <div className={styles.module}>
         <CircularProgressbar
            maxValue={maxValue}
            value={score}
            text={`${score}${textComplement}`}
            circleRatio={0.7}
            styles={{
               trail:{
                  strokeLinecap: 'butt',
                  transform: 'rotate(-126deg)',
                  transformOrigin: 'center center'
               },
               path: {
                  strokeLinecap: 'butt',
                  transform: 'rotate(-126deg)',
                  transformOrigin: 'center center',
                  stroke: strokeColor,
               },
               text: {
                  fill: '#FFF',
               },
            }}
            strokeWidth={10}
         />
      </div>
   )
}
