'use client'

import {
  Bed,
  Calendar,
  DollarSign,
  Edit,
  LogIn,
  LogOut,
  MoreHorizontal,
  Trash2,
  User,
} from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useHospedes } from '@/providers/hospede'
import { useQuartos } from '@/providers/quarto'
import { useReservas } from '@/providers/reserva'
import type { Reserva, StatusReserva } from '@/types'

interface TabelaReservasProps {
  reservasFiltradas: Reserva[]
  onEditarReserva: (reserva: Reserva) => void
}

type AcaoConfirmada = {
  tipo: 'excluir' | 'checkin' | 'checkout'
  reservaId: string
  quartoId?: string
} | null

export function TabelaReservas({
  reservasFiltradas,
  onEditarReserva,
}: TabelaReservasProps) {
  const { removeReserva, handleCheckIn, handleCheckOut } = useReservas()
  const { hospedes } = useHospedes()
  const { quartos } = useQuartos()

  const [acaoConfirmada, setAcaoConfirmada] = useState<AcaoConfirmada>(null)

  const executarAcaoConfirmada = () => {
    if (!acaoConfirmada) return

    const { tipo, reservaId, quartoId } = acaoConfirmada

    if (tipo === 'excluir') {
      removeReserva(reservaId)
    } else if (tipo === 'checkin') {
      handleCheckIn(reservaId)
    } else if (tipo === 'checkout' && quartoId) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const preco = getQuarto(quartoId)?.preco!
      handleCheckOut(reservaId, preco)
    }

    setAcaoConfirmada(null)
  }

  const getStatusColor = (status: StatusReserva) => {
    switch (status) {
      case 'confirmada':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      case 'check-in':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      case 'check-out':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200'
      case 'cancelada':
        return 'bg-red-100 text-red-800 hover:bg-red-200'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }

  const formatarData = (data: Date) => {
    return data.toISOString().slice(0, 10).split('-').reverse().join('/')
  }

  const getHospede = (id: string) => {
    return hospedes.find((h) => h.id === id)
  }

  const getQuarto = (id: string) => {
    return quartos.find((q) => q.id === id)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reservas ({reservasFiltradas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hóspede</TableHead>
                  <TableHead>Quarto</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservasFiltradas.map((reserva) => {
                  const hospede = getHospede(reserva.idHospoede)
                  const quarto = getQuarto(reserva.idQuarto)

                  return (
                    <TableRow key={reserva.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="text-muted-foreground h-4 w-4" />
                          {hospede?.nome || 'Hóspede não encontrado'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Bed className="text-muted-foreground h-4 w-4" />
                          Quarto {quarto?.numero || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="text-muted-foreground h-4 w-4" />
                          {reserva.dataCheckIn
                            ? formatarData(reserva.dataCheckIn)
                            : 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="text-muted-foreground h-4 w-4" />
                          {reserva.dataCheckOut
                            ? formatarData(reserva.dataCheckOut)
                            : 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(reserva.status)}>
                          {reserva.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            R${' '}
                            {reserva.dataCheckOut &&
                              reserva.valorTotal.toFixed(2)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {reserva.status === 'confirmada' && (
                              <DropdownMenuItem
                                onClick={() =>
                                  setAcaoConfirmada({
                                    tipo: 'checkin',
                                    reservaId: reserva.id,
                                  })
                                }
                              >
                                <LogIn className="mr-2 size-4" />
                                Check-in
                              </DropdownMenuItem>
                            )}
                            {reserva.status === 'check-in' && (
                              <DropdownMenuItem
                                onClick={() =>
                                  setAcaoConfirmada({
                                    tipo: 'checkout',
                                    reservaId: reserva.id,
                                    quartoId: reserva.idQuarto,
                                  })
                                }
                              >
                                <LogOut className="mr-2 size-4" />
                                Check-out
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => onEditarReserva(reserva)}
                            >
                              <Edit className="mr-2 size-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setAcaoConfirmada({
                                  tipo: 'excluir',
                                  reservaId: reserva.id,
                                })
                              }
                            >
                              <Trash2 className="mr-2 size-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {reservasFiltradas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Nenhuma reserva encontrada
              </h3>
              <p className="text-muted-foreground text-center">
                Tente ajustar os filtros ou adicione a primeira reserva.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <AlertDialog
        open={!!acaoConfirmada}
        onOpenChange={(open) => !open && setAcaoConfirmada(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {acaoConfirmada?.tipo === 'excluir' &&
                'Deseja realmente excluir esta reserva?'}
              {acaoConfirmada?.tipo === 'checkin' &&
                'Confirmar check-in do hóspede?'}
              {acaoConfirmada?.tipo === 'checkout' &&
                'Confirmar check-out do hóspede?'}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={executarAcaoConfirmada}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
