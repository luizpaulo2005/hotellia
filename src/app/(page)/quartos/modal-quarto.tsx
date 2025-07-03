'use client'

import type React from 'react'
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
import { useQuartos } from '@/providers/quarto'
import type { Quarto, StatusQuarto, TipoQuarto } from '@/types'

interface ModalQuartoProps {
  isOpen: boolean
  onClose: () => void
  quarto?: Quarto | null
}

export function ModalQuarto({ isOpen, onClose, quarto }: ModalQuartoProps) {
  const { addQuarto, updateQuarto } = useQuartos()
  const [formData, setFormData] = useState({
    numero: '',
    tipo: 'solteiro' as TipoQuarto,
    status: 'disponível' as StatusQuarto,
    preco: '',
  })

  useEffect(() => {
    if (quarto) {
      setFormData({
        numero: quarto.numero,
        tipo: quarto.tipo,
        status: quarto.status,
        preco: quarto.preco.toString(),
      })
    } else {
      setFormData({
        numero: '',
        tipo: 'solteiro',
        status: 'disponível',
        preco: '',
      })
    }
  }, [quarto, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const quartoData = {
      numero: formData.numero,
      tipo: formData.tipo,
      status: formData.status,
      preco: Number.parseFloat(formData.preco),
    }

    if (quarto) {
      updateQuarto({ id: quarto.id, ...quartoData })
    } else {
      addQuarto({ ...quartoData, id: crypto.randomUUID() })
    }

    onClose()
  }

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{quarto ? 'Editar Quarto' : 'Novo Quarto'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="numero">Número do quarto</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={handleInputChange('numero')}
              placeholder="Ex: 101"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tipo">Tipo do quarto</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value: TipoQuarto) =>
                setFormData((prev) => ({ ...prev, tipo: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solteiro">Solteiro</SelectItem>
                <SelectItem value="casal">Casal</SelectItem>
                <SelectItem value="suíte">Suíte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: StatusQuarto) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponível">Disponível</SelectItem>
                <SelectItem value="reservado">Reservado</SelectItem>
                <SelectItem value="manutenção">Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preco">Preço por noite (R$)</Label>
            <Input
              id="preco"
              type="number"
              step="0.01"
              min="0"
              value={formData.preco}
              onChange={handleInputChange('preco')}
              placeholder="Ex: 250.00"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{quarto ? 'Salvar' : 'Adicionar'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
