import { useEffect, useState } from 'react'
import { DivContainer, Input } from './styles'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'
import { DataDevice } from '../../DTOs/dataDevice'
import dayjs from 'dayjs'

type Telemetry = {
  mac: string // Identificador do dispositivo
  temp_1: number
  temp_2: number
  rssi: number
  date: number
  compressor_buffer: string
  evap_fan_buffer: string
  defrost_buffer: string
  open_door_buffer: string
  name: string
}

const id = '65c1267706b0ff9cb40357d0'

export function Home() {
  const [dataDevice, setDataDevice] = useState({} as DataDevice)

  async function reqDataDevice() {
    try {
      const response = await api.get(`/installation-meter/${id}`, {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTU3YTA5YWY5ODFiYTUyODc3ZjAzNiIsImlhdCI6MTY3ODgzODgxM30.F5Icoma-bOswkRmKpjYjmAQrXE32CM9kAQ0D2S0JgPY',
        },
      })

      setDataDevice(response.data.installationMeter)
      //setAllDataDevice(response.data.installationMeter)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    reqDataDevice()
  }, [])

  return (
    <main>
      <div>
        <div style={{gap: 20 }}>
          <h4>ID do dispositivo: {dataDevice.meter} </h4>
          <h4>Nome: {dataDevice.name}</h4>
          <h4>Data de ativação: {dayjs(dataDevice.createdAt).format('DD/MM/YYYY')}</h4>
        <h4>Data de instalação: {dayjs(dataDevice.installDate).format('DD/MM/YYYY')}</h4>
          <h4>Local: {dataDevice.comment}</h4>
          <h4>Versão do firmare: {dataDevice.fwVer?.version}</h4>
          <h4>Força do compressor: {dataDevice.compressor_power ? dataDevice.compressor_power : '-'}</h4>
          <h4>Descongelar: {dataDevice.defrost_power ? dataDevice.defrost_power : '-'}</h4>

        </div>
        <div>
         
        </div>
      </div>
    </main>
  )
}
