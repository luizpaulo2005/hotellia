'use client'

import { Bed } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import type { Quarto } from '@/types'

import { QuartoCard } from './quarto-card'

interface GridQuartosProps {
  quartosFiltrados: Quarto[]
  onEditarQuarto: (quarto: Quarto) => void
}

export function GridQuartos({
  quartosFiltrados,
  onEditarQuarto,
}: GridQuartosProps) {
  if (quartosFiltrados.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Bed className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-semibold">
            Nenhum quarto encontrado
          </h3>
          <p className="text-muted-foreground text-center">
            Tente ajustar os filtros para encontrar os quartos desejados.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {quartosFiltrados.map((quarto) => (
        <QuartoCard
          key={quarto.id}
          quarto={quarto}
          onEdit={() => onEditarQuarto(quarto)}
        />
      ))}
    </div>
  )
}
