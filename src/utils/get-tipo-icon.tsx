import { Bed, Settings, Users } from 'lucide-react'

import type { TipoQuarto } from '@/types'

export const getTipoIcon = (tipo: TipoQuarto) => {
  switch (tipo) {
    case 'solteiro':
      return <Bed className="size-4" />
    case 'casal':
      return <Users className="size-4" />
    case 'suíte':
      return <Settings className="size-4" />
  }
}
