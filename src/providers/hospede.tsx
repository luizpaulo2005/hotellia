'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

import { Hospede } from '@/types/hospede'

interface HospedeContextType {
  hospedes: Hospede[]
  setHospedes: (h: Hospede[]) => void
  addHospede: (h: Hospede) => void
  updateHospede: (h: Hospede) => void
  removeHospede: (id: string) => void
}

const HospedeContext = createContext<HospedeContextType | undefined>(undefined)

export const HospedeProvider = ({ children }: { children: ReactNode }) => {
  const [hospedes, setHospedes] = useState<Hospede[]>([])

  const addHospede = (hospede: Hospede) =>
    setHospedes((prev) => [...prev, hospede])
  const updateHospede = (updated: Hospede) =>
    setHospedes((prev) => prev.map((h) => (h.id === updated.id ? updated : h)))
  const removeHospede = (id: string) =>
    setHospedes((prev) => prev.filter((h) => h.id !== id))

  return (
    <HospedeContext.Provider
      value={{
        hospedes,
        setHospedes,
        addHospede,
        updateHospede,
        removeHospede,
      }}
    >
      {children}
    </HospedeContext.Provider>
  )
}

export const useHospedes = () => {
  const context = useContext(HospedeContext)
  if (!context)
    throw new Error('useHospedes must be used within a HospedeProvider')
  return context
}
