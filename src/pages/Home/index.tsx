import { useEffect, useMemo, useState } from 'react'
import { DeviceContent, DivContainer, Input } from './styles'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'
import { DataDevice } from '../../DTOs/dataDevice'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import data from '../../../data.json'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { defaultTheme } from '@/styles/theme'

//const id = '65c1267706b0ff9cb40357d0'

export function Home() {
  const [dataDevice, setDataDevice] = useState({} as DataDevice)
  const [dateInitial, setDateInitial] = useState('')

  const params = useParams()
  const { id } = params

  async function reqDataDevice() {
    try {
      const response = await api.get(`/installation-meter/${id}`, {
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
    setDateInitial(dayjs(new Date()).format('YYYY-MM-DD'))
  }, [])

  if (!dataDevice) {
    return
  }

  const dateFormatter = (date: number) => {
    const dateTimes = new Date(date)

    return dayjs(dateTimes).format('DD/MM/YYYY')
  }

  const selectedForDate = useMemo(() => {
    return data.map((selecteForDate) => {
      const date = dayjs(new Date(selecteForDate.date)).format('DD/MM/YYYY')
      return {
        date,
        temp_1: selecteForDate.temp_1,
        temp_2: selecteForDate.temp_2,
      }
    })
  }, [data])

  const dataFilter =
    selectedForDate.length > 0
      ? selectedForDate.filter((date) =>
          date.date.includes(dayjs(dateInitial).format('DD/MM/YYYY'))
        )
      : []

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
          <Input
            type="date"
            value={dateInitial}
            onChange={(e) => setDateInitial(e.target.value)}
          />
        </div>
        <div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={dataFilter}
              style={{ fontSize: 12 }}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={dateFormatter}
                minTickGap={5}
              />
              <YAxis stroke="#888" />
              <CartesianGrid className="stroke-muted" />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="temp_1"
                stroke={defaultTheme['red-500']}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="temp_2"
                stroke={defaultTheme['green-500']}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DivContainer>
    </main>
  )
}
