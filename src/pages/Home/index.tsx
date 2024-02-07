import { useEffect, useState } from 'react'
import { DivContainer, Input } from './styles'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'
import { DataDevice } from '../../DTOs/dataDevice'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'

import { InfoDevice } from './components/InfoDevice'
import { GraphLine } from './components/GraphLine'

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
      setDataDevice(response.data)
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

  return (
    <main>
      <DivContainer>
        <InfoDevice data={dataDevice} />
        <div>
          <Input
            type="date"
            value={dateInitial}
            onChange={(e) => setDateInitial(e.target.value)}
          />
        </div>
        <div>
          <GraphLine dateInitial={dateInitial} />
        </div>
      </DivContainer>
    </main>
  )
}
