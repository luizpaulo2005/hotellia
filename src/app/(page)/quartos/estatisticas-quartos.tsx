'use client'

import { Bed } from 'lucide-react'
import { useMemo } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuartos } from '@/providers/quarto'

export function EstatisticasQuartos() {
  const { quartos } = useQuartos()

  const estatisticas = useMemo(() => {
    const total = quartos.length
    const disponiveis = quartos.filter((q) => q.status === 'disponível').length
    const reservados = quartos.filter((q) => q.status === 'reservado').length
    const manutencao = quartos.filter((q) => q.status === 'manutenção').length

    return { total, disponiveis, reservados, manutencao }
  }, [quartos])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bed className="h-5 w-5" />
          Estatísticas dos Quartos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <span className="font-semibold">{estatisticas.total}</span>
            <span className="text-muted-foreground ml-1">Total</span>
          </Badge>
          <Badge className="bg-green-100 px-3 py-1 text-sm text-green-800 hover:bg-green-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            <span className="font-semibold">{estatisticas.disponiveis}</span>
            <span className="ml-1">Disponíveis</span>
          </Badge>
          <Badge className="bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
            <span className="font-semibold">{estatisticas.reservados}</span>
            <span className="ml-1">Reservados</span>
          </Badge>
          <Badge className="bg-red-100 px-3 py-1 text-sm text-red-800 hover:bg-red-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
            <span className="font-semibold">{estatisticas.manutencao}</span>
            <span className="ml-1">Manutenção</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
