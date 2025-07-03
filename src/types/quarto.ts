export type TipoQuarto = 'solteiro' | 'casal' | 'suíte'
export type StatusQuarto = 'disponível' | 'reservado' | 'manutenção'

export interface Quarto {
  id: string
  numero: string
  tipo: TipoQuarto
  status: StatusQuarto
  preco: number
}
