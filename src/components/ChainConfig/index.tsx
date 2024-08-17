import {
   Container,
   TextField,
   Box,
   Button,
   ToggleButtonGroup,
   ToggleButton,
   Alert,
} from '@mui/material'
import customHttp from 'components/httpConfig'
import { useEffect, useState } from 'react'
import { IConfig } from 'types/IConfigs'
import styles from './ChainConfig.module.scss'

export default function ChainConfig() {
   const [motorStart, setMotorStart] = useState(0)
   const [waterValves, setWaterValves] = useState(0)
   const [waitToStop, setWaitToStop] = useState(0)
   const [tempMax, setTempMax] = useState(0)
   const [frequency, setFrequency] = useState(60)

   useEffect(() => {
      customHttp
         .get<IConfig>('/config')
         .then((response) => {
            setWaterValves(response.data.water_valves | 0)
            setMotorStart(response.data.motor_start | 0)
            setWaitToStop(response.data.wait_to_stop | 0)
            setTempMax(response.data.temp_max | 0)
            setFrequency(response.data.frequencia_sp)
            console.log(response.data)
         })
         .catch((error) => console.log('Error on get configs: ', error))
   }, [])

   const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newFrequency: number
   ) => {
      setFrequency(newFrequency)
   }

   const saveConfigs = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const config = {
         frequencia_sp: frequency,
         motor_start: motorStart,
         water_valves: waterValves,
         wait_to_stop: waitToStop,
         temp_max: tempMax,
      } as IConfig

      customHttp
         .put('/config', config)
         .then(() => {
            <Alert severity='success'>Configurações salvas com sucesso!</Alert>
         })
         .catch((error) => {
            <Alert severity='error'>Error on save configs</Alert>
            console.log('Erro: ', error)
         })
   }

   return (
      <Container>
         <Box
            component='form'
            onSubmit={saveConfigs}
            sx={{
               width: '100%',
               height: '-webkit-fill-available',
               '& .MuiFormLabel-root': { color: 'white' },
               '& .MuiInputBase-input': { color: 'white' },
               '& .MuiButtonBase-root': { color: 'white' },
               '& .MuiTextField-root': { width: '45%' },
               display: 'inline-grid',
            }}>
            <div className={styles.config__toggle}>
               <h4>Frequência</h4>
               <ToggleButtonGroup
                  placeholder='Frenquência'
                  color='primary'
                  value={frequency}
                  exclusive
                  onChange={handleChange}
                  aria-label='frequency'>
                  <ToggleButton value={60}>60</ToggleButton>
                  <ToggleButton value={25}>25</ToggleButton>
               </ToggleButtonGroup>
            </div>
            <div className={styles.config__fields}>
               <TextField
                  value={motorStart}
                  type='number'
                  onChange={(event) =>
                     setMotorStart(parseInt(event.target.value))
                  }
                  label='Passo 1 [m]'
                  variant='standard'
                  fullWidth
                  margin='dense'
               />
               <TextField
                  value={waterValves}
                  type='number'
                  onChange={(event) =>
                     setWaterValves(parseInt(event.target.value))
                  }
                  label='Passo 2 [s]'
                  variant='standard'
                  fullWidth
                  margin='dense'
               />
            </div>
            <div className={styles.config__fields}>
               <TextField
                  value={waitToStop}
                  type='number'
                  onChange={(event) =>
                     setWaitToStop(parseInt(event.target.value))
                  }
                  label='Passo 3 [m]'
                  variant='standard'
                  fullWidth
                  margin='dense'
               />
               <TextField
                  value={tempMax}
                  type='number'
                  onChange={(event) => setTempMax(parseInt(event.target.value))}
                  label='Temp. Max °C'
                  variant='standard'
                  fullWidth
                  margin='dense'
               />
            </div>
            <Button
               sx={{ marginTop: 1 }}
               type='submit'
               variant='contained'
               fullWidth>
               Salvar
            </Button>
         </Box>
      </Container>
   )
}
