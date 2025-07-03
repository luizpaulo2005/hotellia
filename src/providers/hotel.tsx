'use client'

import { HospedeProvider } from './hospede'
import { QuartoProvider } from './quarto'
import { ReservaProvider } from './reserva'

const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HospedeProvider>
      <QuartoProvider>
        <ReservaProvider>{children}</ReservaProvider>
      </QuartoProvider>
    </HospedeProvider>
  )
}

export { HotelProvider }
