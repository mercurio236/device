import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DivContainer } from './styles'
import pt from 'date-fns/locale/pt-BR';

registerLocale('pt', pt)
setDefaultLocale('pt')

type Props = {
  from: Date | undefined
  to: Date | undefined
  onChangeDateInitial: (date: Date) => void
  onChangeDateFinal: (date: Date) => void
}

export function DateRange({
  from,
  to,
  onChangeDateInitial,
  onChangeDateFinal,
}: Props) {
 
  return (
    <DivContainer>
      <DatePicker locale={pt} dateFormat="dd/MM/yyyy" selected={from} onChange={onChangeDateInitial} startDate={from}/>
      <DatePicker locale={pt} dateFormat="dd/MM/yyyy" selected={to} onChange={onChangeDateFinal} />
    </DivContainer>
  )
}
