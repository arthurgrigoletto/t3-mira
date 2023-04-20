import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import NotFoundImage from '~/assets/404.png'

const NotFound: NextPage = () => {
  return (
    <div className="container flex h-full flex-col items-center justify-center lg:flex-row lg:gap-12">
      <main className="flex flex-col items-center gap-6 pb-6 md:items-start">
        <h2 className="text-8xl font-bold">404</h2>
        <h2 className="text-center text-3.5xl font-bold md:text-left">
          Ops! Página não encontrada!
        </h2>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-solid border-primary-pureDark px-3 py-6 text-base font-bold text-primary-pureDark transition-colors hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-pureDark"
        >
          Voltar para a página inicial
        </Link>
      </main>
      <Image
        src={NotFoundImage}
        alt="Código 404 pulando de uma caixa"
        width={647}
        height={408}
      />
    </div>
  )
}

export default NotFound
