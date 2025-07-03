'use client'

import { useMemo, useState } from 'react'

import { useHospedes } from '@/providers/hospede'
import type { Hospede } from '@/types'

import { FiltrosHospedes } from './filtros-hospedes'
import { HeaderHospedes } from './header-hospedes'
import { ModalHospede } from './modal-hospede'
import { TabelaHospedes } from './tabela-hospedes'

export default function HospedesPage() {
  const { hospedes } = useHospedes()
  const [busca, setBusca] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hospedeEditando, setHospedeEditando] = useState<Hospede | null>(null)

  const hospedesFiltrados = useMemo(() => {
    return hospedes.filter((hospede) => {
      const searchTerm = busca.toLowerCase()
      return (
        hospede.nome.toLowerCase().includes(searchTerm) ||
        hospede.email.toLowerCase().includes(searchTerm) ||
        hospede.telefone?.includes(busca) ||
        hospede.documento.includes(busca)
      )
    })
  }, [hospedes, busca])

  const handleNovoHospede = () => {
    setHospedeEditando(null)
    setIsModalOpen(true)
  }

  const handleEditarHospede = (hospede: Hospede) => {
    setHospedeEditando(hospede)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setHospedeEditando(null)
  }

  return (
    <div className="mt-6 space-y-6">
      <HeaderHospedes onNovoHospede={handleNovoHospede} />

      <FiltrosHospedes busca={busca} onBuscaChange={setBusca} />

      <TabelaHospedes
        hospedesFiltrados={hospedesFiltrados}
        onEditarHospede={handleEditarHospede}
      />

      <ModalHospede
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        hospede={hospedeEditando}
      />
    </div>
  )
}
