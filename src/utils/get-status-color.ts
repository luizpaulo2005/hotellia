import type { StatusQuarto } from '@/types'

export const getStatusColor = (status: StatusQuarto) => {
  switch (status) {
    case 'disponível':
      return 'bg-green-100 text-green-800 hover:bg-green-200'
    case 'reservado':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    case 'manutenção':
      return 'bg-red-100 text-red-800 hover:bg-red-200'
  }
}
