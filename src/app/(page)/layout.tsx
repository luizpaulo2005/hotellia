'use client'

import { useEffect } from 'react'

import { Header } from '@/components/header'
import { useHospedes } from '@/providers/hospede'
import { useQuartos } from '@/providers/quarto'
import { useReservas } from '@/providers/reserva'
import { gerarHospedes, gerarQuartos, gerarReservas } from '@/utils/mock'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { hospedes, addHospede } = useHospedes()
  const { quartos, addQuarto } = useQuartos()
  const { reservas, addReserva } = useReservas()

  useEffect(() => {
    if (hospedes.length === 0) {
      gerarHospedes(10).forEach(addHospede)
    }
  }, [])

  useEffect(() => {
    if (quartos.length === 0) {
      gerarQuartos(10).forEach(addQuarto)
    }
  }, [])

  useEffect(() => {
    if (hospedes.length === 0 || quartos.length === 0 || reservas.length > 0)
      return

    gerarReservas(hospedes, quartos, 10).forEach(addReserva)
  }, [hospedes, quartos])

  return (
    <div className="container mx-auto flex flex-1 flex-col gap-2 rounded-md p-4">
      <Header />
      {children}
    </div>
  )
}

export default AppLayout
