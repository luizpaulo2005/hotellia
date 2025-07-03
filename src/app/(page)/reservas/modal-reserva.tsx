'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useHospedes } from '@/providers/hospede'
import { useQuartos } from '@/providers/quarto'
import { useReservas } from '@/providers/reserva'
import type { Reserva, StatusReserva } from '@/types'

interface ModalReservaProps {
  isOpen: boolean
  onClose: () => void
  reserva?: Reserva | null
}

export function ModalReserva({ isOpen, onClose, reserva }: ModalReservaProps) {
  const { addReserva, updateReserva } = useReservas()
  const { hospedes } = useHospedes()
  const { quartos } = useQuartos()

  const [formData, setFormData] = useState({
    idHospoede: '',
    idQuarto: '',
    dataCheckIn: '',
    dataCheckOut: '',
    status: 'confirmada' as StatusReserva,
  })

  useEffect(() => {
    if (reserva) {
      setFormData({
        idHospoede: reserva.idHospoede,
        idQuarto: reserva.idQuarto,
        dataCheckIn: reserva.dataCheckIn
          ? new Date(reserva.dataCheckIn).toISOString().slice(0, 10)
          : '',
        dataCheckOut: reserva.dataCheckOut
          ? new Date(reserva.dataCheckOut).toISOString().slice(0, 10)
          : '',
        status: reserva.status,
      })
    } else {
      setFormData({
        idHospoede: '',
        idQuarto: '',
        dataCheckIn: '',
        dataCheckOut: '',
        status: 'confirmada',
      })
    }
  }, [reserva, isOpen])

  const toUTCDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(Date.UTC(year, month - 1, day)) // Note: month é 0-based
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const dataCheckIn =
      formData.dataCheckIn.trim() === ''
        ? null
        : toUTCDate(formData.dataCheckIn)
    const dataCheckOut =
      formData.dataCheckOut.trim() === ''
        ? null
        : toUTCDate(formData.dataCheckOut)

    let valorTotal = 0

    if (dataCheckIn && dataCheckOut) {
      const dias = Math.ceil(
        (dataCheckOut.getTime() - dataCheckIn.getTime()) /
          (1000 * 60 * 60 * 24),
      )
      const quarto = quartos.find((q) => q.id === formData.idQuarto)
      valorTotal = quarto ? dias * quarto.preco : 0
    }

    let status: StatusReserva = 'confirmada'

    if (dataCheckIn && dataCheckOut) {
      status = 'check-out'
    } else if (dataCheckIn && !dataCheckOut) {
      status = 'check-in'
    } else if (!dataCheckIn && dataCheckOut) {
      alert('Não é possível salvar com data de check-out sem data de check-in.')
      return
    }

    const reservaData = {
      idHospoede: formData.idHospoede,
      idQuarto: formData.idQuarto,
      dataCheckIn,
      dataCheckOut,
      status,
      valorTotal,
    }

    if (reserva) {
      updateReserva({ id: reserva.id, ...reservaData })
    } else {
      addReserva({ id: crypto.randomUUID(), ...reservaData })
    }

    onClose()
  }

  const quartosDisponiveis = quartos.filter(
    (q) => q.status === 'disponível' || (reserva && q.id === reserva.idQuarto),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {reserva ? 'Editar Reserva' : 'Nova Reserva'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="hospede">Hóspede</Label>
            <Select
              value={formData.idHospoede}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, idHospoede: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o hóspede" />
              </SelectTrigger>
              <SelectContent>
                {hospedes.map((hospede) => (
                  <SelectItem key={hospede.id} value={hospede.id}>
                    {hospede.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quarto">Quarto</Label>
            <Select
              value={formData.idQuarto}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, idQuarto: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o quarto" />
              </SelectTrigger>
              <SelectContent>
                {quartosDisponiveis.map((quarto) => (
                  <SelectItem key={quarto.id} value={quarto.id}>
                    Quarto {quarto.numero} - {quarto.tipo} (R${' '}
                    {quarto.preco.toFixed(2)}/noite)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dataCheckIn">Check-in</Label>
              <Input
                id="dataCheckIn"
                type="date"
                value={formData.dataCheckIn}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dataCheckIn: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataCheckOut">Check-out</Label>
              <Input
                id="dataCheckOut"
                type="date"
                value={formData.dataCheckOut}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dataCheckOut: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: StatusReserva) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="check-in">Check-in</SelectItem>
                <SelectItem value="check-out">Check-out</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{reserva ? 'Salvar' : 'Adicionar'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
