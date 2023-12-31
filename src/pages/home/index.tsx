import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Draw from '~/assets/draw.png'
import FriendSelfie from '~/assets/friend-selfie.png'
import Highfive from '~/assets/highfive.png'
import SwitchPresents from '~/assets/switch-presents.png'
import { Logo } from '~/components/Logo'

const Home: NextPage = () => {
  return (
    <div className="px-4 py-8 md:pb-[5.5rem] md:pt-28">
      <div className="mx-auto w-full md:px-6 lg:max-w-[90rem] lg:px-32">
        <div className="flex pb-12 md:hidden">
          <Logo />
        </div>

        <main className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-4">
              <h2 className="w-[263px] text-3.5xl font-bold md:w-[536px] md:text-5xl md:font-extrabold md:leading-[4rem]">
                Sorteie nomes para qualquer ocasião
              </h2>
              <p className="w-[263px] text-base md:w-[462px] md:text-2xl md:leading-9">
                Crie um grupo, adicione os participantes e faça o sorteio de
                amigo secreto para o natal ou outras festividades
              </p>
              <Link
                href="/groups/new"
                className="mt-2 inline-flex h-12 w-48 items-center justify-center gap-2 rounded-2xl bg-primary-pure px-2 py-4 text-base font-bold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
              >
                Criar um grupo
              </Link>
            </div>
            <Image
              className="mx-auto"
              alt="Pessoas trocando presentes"
              src={SwitchPresents}
            />
          </div>
          <section
            id="como-funciona"
            className="flex w-full flex-col gap-6 text-center md:gap-8 md:text-left"
          >
            <h3 className="mt-2 text-2xl font-bold">Como funciona</h3>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <article className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-white p-6 lg:h-[354px] lg:max-w-sm">
                <Image
                  src={FriendSelfie}
                  alt="Amigos tirando selfie"
                  className="h-[135px] w-[239px] lg:h-[159px] lg:w-[306px]"
                />
                <h4 className="text-base font-bold text-primary-pure">
                  1. Crie um grupo
                </h4>
                <p className="max-w-[239px] text-center text-base">
                  Crie um grupo sem precisar preencher muitas informações
                </p>
              </article>
              <article className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-white p-6 lg:h-[354px] lg:max-w-sm">
                <Image
                  src={Highfive}
                  alt="Amigos se cumprimentando"
                  className="h-[135px] w-[239px] lg:h-[159px] lg:w-[306px]"
                />
                <h4 className="text-base font-bold text-primary-pure">
                  2. Adicione participantes
                </h4>
                <p className="max-w-[239px] text-center text-base">
                  Após criar um grupo adicione as pessoas que irão participar do
                  sorteio informando nome e email
                </p>
              </article>
              <article className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-white p-6 lg:h-[354px] lg:max-w-sm">
                <Image
                  src={Draw}
                  alt="Amigos tirando selfie"
                  className="h-[135px] w-[239px] lg:h-[159px] lg:w-[306px]"
                />
                <h4 className="text-base font-bold text-primary-pure">
                  3. Realize o sorteio
                </h4>
                <p className="max-w-[239px] text-center text-base">
                  Após realizar o sorteio todos os participantes do grupo
                  receberão quem tirou por email ou através do link do grupo
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home
