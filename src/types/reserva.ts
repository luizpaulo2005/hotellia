import type { Hospede } from './hospede'
import type { Quarto } from './quarto'

export type StatusReserva =
  | 'confirmada'
  | 'cancelada'
  | 'check-in'
  | 'check-out'

export interface Reserva {
  id: string
  idQuarto: Quarto['id']
  idHospoede: Hospede['id']
  dataCheckIn: Date | null
  dataCheckOut: Date | null
  status: StatusReserva
  valorTotal: number
}
