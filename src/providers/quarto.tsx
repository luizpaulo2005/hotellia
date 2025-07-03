'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

import { Quarto } from '@/types/quarto'

interface QuartoContextType {
  quartos: Quarto[]
  setQuartos: (q: Quarto[]) => void
  addQuarto: (q: Quarto) => void
  updateQuarto: (q: Quarto) => void
  removeQuarto: (id: string) => void
}

const QuartoContext = createContext<QuartoContextType | undefined>(undefined)

export const QuartoProvider = ({ children }: { children: ReactNode }) => {
  const [quartos, setQuartos] = useState<Quarto[]>([])

  const addQuarto = (quarto: Quarto) => setQuartos((prev) => [...prev, quarto])
  const updateQuarto = (updated: Quarto) =>
    setQuartos((prev) => prev.map((q) => (q.id === updated.id ? updated : q)))
  const removeQuarto = (id: string) =>
    setQuartos((prev) => prev.filter((q) => q.id !== id))

  return (
    <QuartoContext.Provider
      value={{ quartos, setQuartos, addQuarto, updateQuarto, removeQuarto }}
    >
      {children}
    </QuartoContext.Provider>
  )
}

export const useQuartos = () => {
  const context = useContext(QuartoContext)
  if (!context)
    throw new Error('useQuartos must be used within a QuartoProvider')
  return context
}
