'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface HeaderQuartosProps {
  onNovoQuarto: () => void
}

export function HeaderQuartos({ onNovoQuarto }: HeaderQuartosProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quartos</h1>
        <p className="text-muted-foreground">
          Gerencie e visualize todos os quartos do hotel
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onNovoQuarto}>
          <Plus className="mr-2 size-4" />
          Novo Quarto
        </Button>
      </div>
    </div>
  )
}
