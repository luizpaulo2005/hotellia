import { faker } from '@faker-js/faker'

import { Hospede, Quarto, Reserva, StatusQuarto, TipoQuarto } from '@/types'

export function gerarHospedes(qtd = 20): Hospede[] {
  return Array.from({ length: qtd }).map(() => ({
    id: faker.string.uuid(),
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    telefone: faker.phone.number(),
    documento: faker.string.numeric(11),
  }))
}

export function gerarQuartos(qtd = 10): Quarto[] {
  const tipos: TipoQuarto[] = ['solteiro', 'casal', 'suíte']
  const status: StatusQuarto[] = ['disponível', 'reservado', 'manutenção']

  return Array.from({ length: qtd }).map((_, i) => ({
    id: faker.string.uuid(),
    numero: (100 + i).toString(),
    tipo: faker.helpers.arrayElement(tipos),
    status: faker.helpers.arrayElement(status),
    preco: faker.number.float({ min: 150, max: 500, fractionDigits: 2 }),
  }))
}

export function gerarReservas(
  hospedes: Hospede[],
  quartos: Quarto[],
  qtd = 30,
): Reserva[] {
  return Array.from({ length: qtd }).map(() => {
    const hospede = faker.helpers.arrayElement(hospedes)
    const quarto = faker.helpers.arrayElement(quartos)

    return {
      id: faker.string.uuid(),
      idHospoede: hospede.id,
      idQuarto: quarto.id,
      dataCheckIn: null,
      dataCheckOut: null,
      status: 'confirmada',
      valorTotal: 0,
    }
  })
}
