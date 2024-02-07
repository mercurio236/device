import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { defaultTheme } from '@/styles/theme'
import dayjs from 'dayjs'
import data from '../../../../../data.json'
import { useMemo } from 'react'

type GraphLineProps = {
  dateInitial: string
}

export function GraphLine({ dateInitial }: GraphLineProps) {
  const selectedForDate = useMemo(() => {
    return data.map((selecteForDate) => {
      const date = dayjs(new Date(selecteForDate.date)).format(
        'DD/MM/YYYY HH:mm'
      )
      return {
        date: date,
        temp_1: selecteForDate.temp_1,
        temp_2: selecteForDate.temp_2,
      }
    })
  }, [data])

  const dataFilter =
    selectedForDate.length > 0
      ? selectedForDate.filter((date) => {
          return date.date.includes(dayjs(dateInitial).format('DD/MM/YYYY'))
        })
      : []

  const dateFormatter = (date: number) => {
    const dateTimes = new Date(date)

    return dayjs(dateTimes).format('DD/MM/YYYY HH:mm')
  }

  return (
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
        <Brush dataKey="0" height={30} stroke="#8884d8" />
        <XAxis dataKey="date" tickFormatter={dateFormatter} minTickGap={5} />
        <YAxis stroke="#888" />
        <CartesianGrid strokeDasharray="3 3" />
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
  )
}
