import { useEffect, useState } from 'react'
import Clock from './Clock'
import styles from './StopWatch.module.scss'

interface IProps {
   isRunning: boolean,
   reset: boolean
}

export default function StopWatch({ isRunning, reset }: IProps) {
   const [time, setTime] = useState(0)

   useEffect(() => {
      let interval: NodeJS.Timer

      if(isRunning) {
         interval = setInterval(()=>{
            setTime(prevTime => prevTime+1)
         }, 1000)
      }

      if(reset) {
         setTime(0)
      }

      return () => clearInterval(interval)
   }, [isRunning, reset])

   return (
      <div className={styles.stop_watch}>
         <Clock time={time} />
      </div>
   )
}
