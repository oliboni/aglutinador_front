import info from 'data/info.json'
import styles from './Home.module.scss'
import Temperatures from 'components/Temperatures'
import { useState } from 'react'
import { IDataProccess } from 'types/IDataProccess'
import { Button, Typography } from '@mui/material'
import MyGauge from 'components/MyGauge'
import ChainConfig from 'components/ChainConfig'
import StopWatch from 'components/StopWatch'
import socket from 'config/socket'

// #097479

export default function Home() {
   const [data, setData] = useState<IDataProccess>(info)
   const [startTimer, setStartTime] = useState(false)
   const [resetTime, setResetTime] = useState(false)

   socket.on('aglutinador', (data) => {
      console.log(data)
      setData(data)
   })

   function startManualProccess(){
      setStartTime(true)
      setResetTime(false)
   }

   function stopManualProccess(){
      setStartTime(false)
      setResetTime(false)
   }

   function resetProccess(){
      setStartTime(false)
      setResetTime(true)
   }

   return (
      <>
         <section className={styles.chain}>
            <h1 className={styles.chain__title}>INFORMAÇÕES DO PROCESSO</h1>
            <div className={styles.chain__base}>
               <div className={styles.chain__info}>
                  <div className={styles.chain__info__item}>
                     <MyGauge
                        score={data.data.frequency_pv}
                        textComplement='Hz'
                        strokeColor='##3e98c7'
                        maxValue={100}
                     />
                     <MyGauge
                        score={data.data.frequency_sp}
                        textComplement='Hz'
                        strokeColor='##3e98c7'
                        maxValue={100}
                     />
                     <MyGauge
                        score={data.data.chain}
                        textComplement='A'
                        strokeColor='##3e98c7'
                        maxValue={100}
                     />
                  </div>
               </div>
               <div className={styles.chain__status}>
                  <div className={styles.chain__status__info}>
                     <Typography
                        component='h1'
                        variant='h6'
                        textAlign={'center'}
                        margin={2}>
                        Status
                     </Typography>
                     <Typography
                        component='h1'
                        variant='h6'
                        textAlign={'center'}
                        margin={2}>
                        {data.data.inverter_status ? 'LIGADO' : 'DESLIGADO'}
                     </Typography>
                  </div>
                  <div className={styles.chain__status__timer}>
                     <Typography
                        component='h1'
                        variant='h6'
                        textAlign={'center'}
                        margin={'4% 0'}>
                        Tempo de execução
                     </Typography>
                     <div className={styles.chain__status__timer__wrapper}>
                        <StopWatch isRunning={startTimer} reset={resetTime} />
                     </div>
                  </div>
               </div>
               <div className={styles.chain__button}>
                  <Button
                     variant='contained'
                     color='success'
                     sx={{ my: 2 }}
                     onClick={startManualProccess}>
                     Ligar
                  </Button>
                  <Button 
                     variant='contained' 
                     color='secondary'
                     onClick={resetProccess}
                  >
                     Reset
                  </Button>
                  <Button
                     variant='contained'
                     color='error'
                     sx={{ my: 2 }}
                     onClick={stopManualProccess}>
                     Desligar
                  </Button>
               </div>
            </div>
         </section>
         <section className={styles.first}>
            <div className={styles.first__temperatures}>
               <Typography
                  component='h1'
                  variant='h5'
                  textAlign={'center'}
                  margin={2}>
                  Temperaturas
               </Typography>
               <div className={styles.first__temperatures__items}>
                  {data.data.temperatures.map((temp, index) => (
                     <Temperatures
                        className={styles.first__temperatures__item}
                        temp={temp}
                        key={index}
                     />
                  ))}
               </div>
            </div>
            <div className={styles.first__config}>
               <Typography
                  component='h1'
                  variant='h5'
                  textAlign={'center'}
                  margin={2}>
                  Configuração Tempos/Temperatura
               </Typography>
               <ChainConfig />
            </div>
         </section>
      </>
   )
}
