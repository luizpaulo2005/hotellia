'use client'

import { useMemo, useState } from 'react'

import { useHospedes } from '@/providers/hospede'
import { useQuartos } from '@/providers/quarto'
import { useReservas } from '@/providers/reserva'
import type { Reserva } from '@/types'

import { FiltrosReservas } from './filtros-reservas'
import { HeaderReservas } from './header-reservas'
import { ModalReserva } from './modal-reserva'
import { TabelaReservas } from './tabela-reservas'

export default function ReservasPage() {
  const { reservas } = useReservas()
  const { hospedes } = useHospedes()
  const { quartos } = useQuartos()

  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reservaEditando, setReservaEditando] = useState<Reserva | null>(null)

  const reservasFiltradas = useMemo(() => {
    return reservas.filter((reserva) => {
      const hospede = hospedes.find((h) => h.id === reserva.idHospoede)
      const quarto = quartos.find((q) => q.id === reserva.idQuarto)

      const matchStatus =
        filtroStatus === 'todos' || reserva.status === filtroStatus
      const matchBusca =
        busca === '' ||
        hospede?.nome.toLowerCase().includes(busca.toLowerCase()) ||
        quarto?.numero.includes(busca)

      return matchStatus && matchBusca
    })
  }, [reservas, hospedes, quartos, filtroStatus, busca])

  const handleNovaReserva = () => {
    setReservaEditando(null)
    setIsModalOpen(true)
  }

  const handleEditarReserva = (reserva: Reserva) => {
    setReservaEditando(reserva)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setReservaEditando(null)
  }

  return (
    <div className="mx-auto mt-6 w-full space-y-6">
      <HeaderReservas onNovaReserva={handleNovaReserva} />

      <FiltrosReservas
        busca={busca}
        filtroStatus={filtroStatus}
        onBuscaChange={setBusca}
        onStatusChange={setFiltroStatus}
      />

      <TabelaReservas
        reservasFiltradas={reservasFiltradas}
        onEditarReserva={handleEditarReserva}
      />

      <ModalReserva
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reserva={reservaEditando}
      />
    </div>
  )
}
