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
import { useHospedes } from '@/providers/hospede'
import type { Hospede } from '@/types'

interface ModalHospedeProps {
  isOpen: boolean
  onClose: () => void
  hospede?: Hospede | null
}

export function ModalHospede({ isOpen, onClose, hospede }: ModalHospedeProps) {
  const { addHospede, updateHospede } = useHospedes()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    documento: '',
  })

  useEffect(() => {
    if (hospede) {
      setFormData({
        nome: hospede.nome,
        email: hospede.email,
        telefone: hospede.telefone || '',
        documento: hospede.documento,
      })
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        documento: '',
      })
    }
  }, [hospede, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (hospede) {
      updateHospede({
        ...hospede,
        ...formData,
      })
    } else {
      addHospede({
        id: crypto.randomUUID(),
        ...formData,
      })
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
          <DialogTitle>
            {hospede ? 'Editar Hóspede' : 'Novo Hóspede'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={handleInputChange('nome')}
              placeholder="Digite o nome completo"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="Digite o e-mail"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={handleInputChange('telefone')}
              placeholder="Digite o telefone"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documento">CPF</Label>
            <Input
              id="documento"
              value={formData.documento}
              onChange={handleInputChange('documento')}
              placeholder="Digite o CPF"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{hospede ? 'Salvar' : 'Adicionar'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
