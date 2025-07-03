'use client'

import { Filter, Search } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FiltrosReservasProps {
  busca: string
  filtroStatus: string
  onBuscaChange: (busca: string) => void
  onStatusChange: (status: string) => void
}

export function FiltrosReservas({
  busca,
  filtroStatus,
  onBuscaChange,
  onStatusChange,
}: FiltrosReservasProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Buscar por hóspede ou quarto..."
                value={busca}
                onChange={(e) => onBuscaChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filtroStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="check-in">Check-in</SelectItem>
              <SelectItem value="check-out">Check-out</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
