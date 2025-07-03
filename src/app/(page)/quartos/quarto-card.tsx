'use client'

import { DollarSign, Edit, Loader2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQuartos } from '@/providers/quarto'
import type { Quarto } from '@/types'
import { getStatusColor } from '@/utils/get-status-color'
import { getTipoIcon } from '@/utils/get-tipo-icon'

interface QuartoCardProps {
  quarto: Quarto
  onEdit: () => void
}

const QuartoCard = ({ quarto, onEdit }: QuartoCardProps) => {
  const { removeQuarto } = useQuartos()
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(isAlertOpen)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    try {
      removeQuarto(quarto.id)
      setIsAlertOpen(false)
    } catch (error) {
      console.error('Erro ao excluir o quarto:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Quarto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir este quarto? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center justify-end gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="animate-spin" />}
              Excluir
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <Card key={quarto.id} className="transition-shadow hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Quarto {quarto.numero}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(quarto.status)}>
                {quarto.status}
              </Badge>
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="mr-2 size-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                    <Trash2 className="mr-2 size-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            {getTipoIcon(quarto.tipo)}
            <span className="capitalize">{quarto.tipo}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="size-4 text-green-600" />
            <span className="text-lg font-semibold text-green-600">
              R$ {quarto.preco.toFixed(2)}
            </span>
            <span className="text-muted-foreground text-sm">/noite</span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              Ver Detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export { QuartoCard }
