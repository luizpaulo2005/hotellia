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

interface FiltrosQuartosProps {
  busca: string
  filtroTipo: string
  filtroStatus: string
  onBuscaChange: (busca: string) => void
  onTipoChange: (tipo: string) => void
  onStatusChange: (status: string) => void
}

export function FiltrosQuartos({
  busca,
  filtroTipo,
  filtroStatus,
  onBuscaChange,
  onTipoChange,
  onStatusChange,
}: FiltrosQuartosProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="size-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Buscar por número do quarto..."
                value={busca}
                onChange={(e) => onBuscaChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filtroTipo} onValueChange={onTipoChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tipo de quarto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="solteiro">Solteiro</SelectItem>
              <SelectItem value="casal">Casal</SelectItem>
              <SelectItem value="suíte">Suíte</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="disponível">Disponível</SelectItem>
              <SelectItem value="reservado">Reservado</SelectItem>
              <SelectItem value="manutenção">Manutenção</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
