'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

import { Reserva } from '@/types'

interface ReservaContextType {
  reservas: Reserva[]
  setReservas: (r: Reserva[]) => void
  addReserva: (r: Reserva) => void
  updateReserva: (r: Reserva) => void
  removeReserva: (id: string) => void
  handleCheckIn: (id: string) => void
  handleCheckOut: (id: string, valorQuarto: number) => void
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined)

export const ReservaProvider = ({ children }: { children: ReactNode }) => {
  const [reservas, setReservas] = useState<Reserva[]>([])

  const addReserva = (reserva: Reserva) =>
    setReservas((prev) => [...prev, reserva])
  const updateReserva = (updated: Reserva) =>
    setReservas((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
  const removeReserva = (id: string) =>
    setReservas((prev) => prev.filter((r) => r.id !== id))
  const handleCheckIn = (id: string) => {
    const reserva = reservas.find((r) => r.id === id)
    if (reserva) {
      const nowUTC = new Date()
      updateReserva({
        ...reserva,
        status: 'check-in',
        dataCheckIn: new Date(
          Date.UTC(
            nowUTC.getUTCFullYear(),
            nowUTC.getUTCMonth(),
            nowUTC.getUTCDate(),
          ),
        ),
      })
    }
  }
  const handleCheckOut = (id: string, valorQuarto: number) => {
    const reserva = reservas.find((r) => r.id === id)
    if (!reserva || !reserva.dataCheckIn) return

    const nowUTC = new Date()
    const checkOutDate = new Date(
      Date.UTC(
        nowUTC.getUTCFullYear(),
        nowUTC.getUTCMonth(),
        nowUTC.getUTCDate(),
      ),
    )

    const checkInDate = new Date(reserva.dataCheckIn)
    const diffDias = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    )

    const valorTotal = valorQuarto * diffDias

    updateReserva({
      ...reserva,
      status: 'check-out',
      dataCheckOut: checkOutDate,
      valorTotal,
    })
  }

  return (
    <ReservaContext.Provider
      value={{
        reservas,
        setReservas,
        addReserva,
        updateReserva,
        removeReserva,
        handleCheckIn,
        handleCheckOut,
      }}
    >
      {children}
    </ReservaContext.Provider>
  )
}

export const useReservas = () => {
  const context = useContext(ReservaContext)
  if (!context)
    throw new Error('useReservas must be used within a ReservaProvider')
  return context
}
