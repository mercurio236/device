import { DataDevice } from '@/DTOs/dataDevice'
import { DeviceContent } from './styles'
import dayjs from 'dayjs'

type Props = {
  data: DataDevice
}
export function InfoDevice({ data }: Props) {
  
  
  if(!data.installationMeter){
    return
  }

  return (
    <DeviceContent>
      <h4>ID do dispositivo: {data.installationMeter?.meter} </h4>
      <h4>Nome: {data.installationMeter.name}</h4>
      <h4>Data de ativação: {dayjs(data.installationMeter.createdAt).format('DD/MM/YYYY')}</h4>
      <h4>
        Data de instalação: {dayjs(data.installationMeter.installDate).format('DD/MM/YYYY')}
      </h4>
      <h4>Local: {data.installationMeter.comment}</h4>
      <h4>Versão do firmare: {data.installationMeter.fwVer?.version}</h4>
      <h4>
        Força do compressor:{' '}
        {data.installationMeter.compressor_power ? data.installationMeter.compressor_power : '-'}
      </h4>
      <h4>Descongelar: {data.installationMeter.defrost_power ? data.installationMeter.defrost_power : '-'}</h4>
    </DeviceContent>
  )
}
