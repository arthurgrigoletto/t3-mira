import Link from 'next/link'

import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-8 bg-white p-8 md:p-4">
      <nav className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <ul>
          <li>
            <Link
              href="/#como-funciona"
              className="p-o inline-flex h-full w-full items-center justify-center gap-2 rounded-2xl text-base font-bold text-primary-pureDark transition-all hover:text-primary-dark focus:underline focus:decoration-dotted focus:underline-offset-4 focus:shadow-none focus:outline-none"
            >
              Como funciona
            </Link>
          </li>
        </ul>
      </nav>
      <Logo />
    </footer>
  )
}
