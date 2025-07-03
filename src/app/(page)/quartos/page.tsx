'use client'

import { useMemo, useState } from 'react'

import { useQuartos } from '@/providers/quarto'
import type { Quarto } from '@/types'

import { FiltrosQuartos } from './filtros-quartos'
import { GridQuartos } from './grid-quartos'
import { HeaderQuartos } from './header.quartos'
import { ModalQuarto } from './modal-quarto'

export default function QuartosPage() {
  const { quartos } = useQuartos()
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [busca, setBusca] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quartoEditando, setQuartoEditando] = useState<Quarto | null>(null)

  const quartosFiltrados = useMemo(() => {
    return quartos.filter((quarto) => {
      const matchTipo = filtroTipo === 'todos' || quarto.tipo === filtroTipo
      const matchStatus =
        filtroStatus === 'todos' || quarto.status === filtroStatus
      const matchBusca = quarto.numero
        .toLowerCase()
        .includes(busca.toLowerCase())

      return matchTipo && matchStatus && matchBusca
    })
  }, [quartos, filtroTipo, filtroStatus, busca])

  const handleNovoQuarto = () => {
    setQuartoEditando(null)
    setIsModalOpen(true)
  }

  const handleEditarQuarto = (quarto: Quarto) => {
    setQuartoEditando(quarto)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setQuartoEditando(null)
  }

  return (
    <div className="mt-6 space-y-6">
      <HeaderQuartos onNovoQuarto={handleNovoQuarto} />

      <FiltrosQuartos
        busca={busca}
        filtroTipo={filtroTipo}
        filtroStatus={filtroStatus}
        onBuscaChange={setBusca}
        onTipoChange={setFiltroTipo}
        onStatusChange={setFiltroStatus}
      />

      <GridQuartos
        quartosFiltrados={quartosFiltrados}
        onEditarQuarto={handleEditarQuarto}
      />

      <ModalQuarto
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quarto={quartoEditando}
      />
    </div>
  )
}
