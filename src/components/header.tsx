'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ModeToggle } from './toggle-theme'
import { Button } from './ui/button'

const Header = () => {
  const pathname = usePathname()

  if (['/sign-in'].includes(pathname)) {
    return null
  }

  return (
    <div className="flex w-full items-center justify-between rounded-md border p-3">
      <Link href="/" className="text-xl font-semibold hover:underline">
        Hotellia
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="link" asChild>
          <Link href="/quartos">Quartos</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/reservas">Reservas</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/hospedes">Hóspedes</Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="secondary">
          <img
            src="https://github.com/luizpaulo2005.png"
            className="size-6 rounded-full"
          />
          Luiz Paulo
        </Button>
      </div>
    </div>
  )
}

export { Header }
