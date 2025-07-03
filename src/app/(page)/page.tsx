import { EstatisticasHospedes } from './hospedes/estatisticas-hospedes'
import { EstatisticasQuartos } from './quartos/estatisticas-quartos'
import { EstatisticasReservas } from './reservas/estatisticas-reservas'

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <EstatisticasHospedes />
      <EstatisticasQuartos />
      <EstatisticasReservas />
    </div>
  )
}

export default Page
