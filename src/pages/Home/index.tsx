import { useEffect, useState } from 'react'
import { DeviceContent, DivContainer } from './styles'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'
import { DataDevice } from '../../DTOs/dataDevice'
import dayjs from 'dayjs'
import { useSearchParams } from 'react-router-dom'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { defaultTheme } from '@/styles/theme'

//const id = '65c1267706b0ff9cb40357d0' para consultar o device pela url basta colocar o ?id=65c1267706b0ff9cb40357d0 depois da barra de pesquisa

export function Home() {
  const [dataDevice, setDataDevice] = useState({} as DataDevice)
  const [searchParams, setSearchParams] = useSearchParams()

  const idDevice = searchParams.get('id')

  async function reqDataDevice() {
    try {
      const response = await api.get(`/installation-meter/${idDevice}`, {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTU3YTA5YWY5ODFiYTUyODc3ZjAzNiIsImlhdCI6MTY3ODgzODgxM30.F5Icoma-bOswkRmKpjYjmAQrXE32CM9kAQ0D2S0JgPY',
        },
      })

      setDataDevice(response.data.installationMeter)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    reqDataDevice()
  }, [])

  return (
    <main>
      <DivContainer>
        <DeviceContent>
          <h4>ID do dispositivo: {dataDevice.meter} </h4>
          <h4>Nome: {dataDevice.name}</h4>
          <h4>
            Data de ativação: {dayjs(dataDevice.createdAt).format('DD/MM/YYYY')}
          </h4>
          <h4>
            Data de instalação:{' '}
            {dayjs(dataDevice.installDate).format('DD/MM/YYYY')}
          </h4>
          <h4>Local: {dataDevice.comment}</h4>
          <h4>Versão do firmare: {dataDevice.fwVer?.version}</h4>
          <h4>
            Força do compressor:{' '}
            {dataDevice.compressor_power ? dataDevice.compressor_power : '-'}
          </h4>
          <h4>
            Descongelar:{' '}
            {dataDevice.defrost_power ? dataDevice.defrost_power : '-'}
          </h4>
        </DeviceContent>
        <div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={[dataDevice]} style={{ fontSize: 12 }}>
              <XAxis dataKey="compressor_power" />
              <YAxis stroke="#888" />
              <CartesianGrid className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="compressor_power"
                stroke={defaultTheme['red-500']}
              />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="defrost_power"
                stroke={defaultTheme['green-500']}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DivContainer>
    </main>
  )
}
