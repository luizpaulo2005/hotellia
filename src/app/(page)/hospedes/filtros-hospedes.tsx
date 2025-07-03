'use client'

import { Search } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface FiltrosHospedesProps {
  busca: string
  onBuscaChange: (busca: string) => void
}

export function FiltrosHospedes({
  busca,
  onBuscaChange,
}: FiltrosHospedesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Buscar Hóspedes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Buscar por nome, e-mail, telefone ou CPF..."
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardContent>
    </Card>
  )
}
