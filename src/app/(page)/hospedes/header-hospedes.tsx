'use client'

import { UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface HeaderHospedesProps {
  onNovoHospede: () => void
}

export function HeaderHospedes({ onNovoHospede }: HeaderHospedesProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hóspedes</h1>
        <p className="text-muted-foreground">
          Gerencie todos os hóspedes do hotel
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onNovoHospede}>
          <UserPlus className="size-4" />
          Novo Hóspede
        </Button>
      </div>
    </div>
  )
}
