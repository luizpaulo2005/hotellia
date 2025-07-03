'use client'

import { Calendar } from 'lucide-react'
import { useMemo } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useReservas } from '@/providers/reserva'

export function EstatisticasReservas() {
  const { reservas } = useReservas()

  const estatisticas = useMemo(() => {
    const total = reservas.length
    const confirmadas = reservas.filter((r) => r.status === 'confirmada').length
    const checkIn = reservas.filter((r) => r.status === 'check-in').length
    const checkOut = reservas.filter((r) => r.status === 'check-out').length
    const canceladas = reservas.filter((r) => r.status === 'cancelada').length

    return { total, confirmadas, checkIn, checkOut, canceladas }
  }, [reservas])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Estatísticas das Reservas
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
            <span className="font-semibold">{estatisticas.confirmadas}</span>
            <span className="ml-1">Confirmadas</span>
          </Badge>
          <Badge className="bg-green-100 px-3 py-1 text-sm text-green-800 hover:bg-green-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            <span className="font-semibold">{estatisticas.checkIn}</span>
            <span className="ml-1">Check-in</span>
          </Badge>
          <Badge className="bg-purple-100 px-3 py-1 text-sm text-purple-800 hover:bg-purple-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
            <span className="font-semibold">{estatisticas.checkOut}</span>
            <span className="ml-1">Check-out</span>
          </Badge>
          <Badge className="bg-red-100 px-3 py-1 text-sm text-red-800 hover:bg-red-200">
            <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
            <span className="font-semibold">{estatisticas.canceladas}</span>
            <span className="ml-1">Canceladas</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
