'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface HeaderReservasProps {
  onNovaReserva: () => void
}

export function HeaderReservas({ onNovaReserva }: HeaderReservasProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
        <p className="text-muted-foreground">
          Gerencie reservas e realize check-in/check-out
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onNovaReserva}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Reserva
        </Button>
      </div>
    </div>
  )
}
