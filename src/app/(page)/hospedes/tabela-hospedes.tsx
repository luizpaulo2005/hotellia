'use client'

import {
  Edit,
  Eye,
  FileText,
  Mail,
  MoreHorizontal,
  Phone,
  Trash2,
  Users,
} from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useHospedes } from '@/providers/hospede'
import type { Hospede } from '@/types'

interface TabelaHospedesProps {
  hospedesFiltrados: Hospede[]
  onEditarHospede: (hospede: Hospede) => void
}

export function TabelaHospedes({
  hospedesFiltrados,
  onEditarHospede,
}: TabelaHospedesProps) {
  const { removeHospede } = useHospedes()
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null)

  const confirmarExclusao = () => {
    if (idParaExcluir) {
      removeHospede(idParaExcluir)
      setIdParaExcluir(null)
    }
  }

  const formatarDocumento = (documento: string) => {
    return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatarTelefone = (telefone: string) => {
    const numbers = telefone.replace(/\D/g, '')
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return telefone
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Hóspedes ({hospedesFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospedesFiltrados.map((hospede) => (
                  <TableRow key={hospede.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <span className="text-sm font-semibold text-blue-600">
                            {hospede.nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {hospede.nome}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="text-muted-foreground h-4 w-4" />
                        {hospede.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="text-muted-foreground h-4 w-4" />
                        {hospede.telefone
                          ? formatarTelefone(hospede.telefone)
                          : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="text-muted-foreground h-4 w-4" />
                        {formatarDocumento(hospede.documento)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 size-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditarHospede(hospede)}
                          >
                            <Edit className="mr-2 size-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setIdParaExcluir(hospede.id)}
                          >
                            <Trash2 className="mr-2 size-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {hospedesFiltrados.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Nenhum hóspede encontrado
              </h3>
              <p className="text-muted-foreground text-center">
                Tente ajustar sua busca ou adicione o primeiro hóspede.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!idParaExcluir}
        onOpenChange={(open) => !open && setIdParaExcluir(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir este hóspede?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarExclusao}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
