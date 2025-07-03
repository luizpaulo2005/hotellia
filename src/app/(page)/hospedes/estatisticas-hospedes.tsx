'use client'

import { Users } from 'lucide-react'
import { useMemo } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useHospedes } from '@/providers/hospede'

export function EstatisticasHospedes() {
  const { hospedes } = useHospedes()

  const estatisticas = useMemo(() => {
    const total = hospedes.length
    const comReservas = Math.floor(total * 0.6) // Simulando
    const novos = Math.floor(total * 0.2) // Simulando hóspedes novos
    const vips = Math.floor(total * 0.1) // Simulando hóspedes VIP

    return { total, comReservas, novos, vips }
  }, [hospedes])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Estatísticas dos Hóspedes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <span className="font-semibold">{estatisticas.total}</span>
            <span className="text-muted-foreground ml-1">Total</span>
          </Badge>
          <Badge className="bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
            <span className="font-semibold">{estatisticas.comReservas}</span>
            <span className="ml-1">Com Reservas</span>
          </Badge>
          <Badge className="bg-green-100 px-3 py-1 text-sm text-green-800 hover:bg-green-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            <span className="font-semibold">{estatisticas.novos}</span>
            <span className="ml-1">Novos</span>
          </Badge>
          <Badge className="bg-purple-100 px-3 py-1 text-sm text-purple-800 hover:bg-purple-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
            <span className="font-semibold">{estatisticas.vips}</span>
            <span className="ml-1">VIP</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
