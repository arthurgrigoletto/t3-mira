import { UserProfile, useUser } from '@clerk/nextjs'
import { CaretLeft } from '@phosphor-icons/react'
import { type NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Profile from '~/assets/profile.png'
import { GroupCard } from '~/components/GroupCard'
import { api } from '~/utils/api'
import { STALE_TIME } from '~/utils/contants'

const Me: NextPage = () => {
  const { back } = useRouter()
  const { user } = useUser()
  const groupsQuery = api.groups.getAll.useQuery(
    {
      emails: user?.emailAddresses.map((email) => email.emailAddress),
    },
    { staleTime: STALE_TIME },
  )

  return (
    <div className="flex flex-col gap-8 px-4 py-14 lg:pl-32 lg:pr-20">
      <button
        className="group inline-flex w-fit items-center gap-2 focus:outline-none"
        onClick={back}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-white transition-all  group-hover:border-primary-pureDark group-hover:text-primary-pureDark group-focus:border-primary-pureDark group-focus:text-primary-pureDark">
          <CaretLeft size={16} />
        </div>
        <span className="text-base font-semibold group-hover:text-primary-pureDark group-focus:text-primary-pureDark">
          Voltar
        </span>
      </button>
      <h2 className="text-2xl font-bold md:text-3.5xl">Meu perfil</h2>
      <h2 className="text-base font-bold md:text-2xl">Dados</h2>
      <div className="grid justify-center gap-20 md:justify-start xl:grid-cols-2">
        <UserProfile
          appearance={{
            elements: {
              navbarMobileMenuRow: 'hidden',
              navbar: 'hidden',
              header: 'hidden',
              profileSection__activeDevices: 'hidden',
              card: 'shadow-default lg:max-w-[600px]',
            },
          }}
        />
        <Image
          src={Profile}
          alt="Garota olhando sua rede social no celular"
          className="hidden h-[500px] flex-1 xl:block"
          width={647}
          height={500}
        />
      </div>

      <div className="mt-12 flex flex-col gap-6">
        <h2 className="text-base font-bold md:text-2xl">
          Grupos que participo
        </h2>
        <div className="flex flex-col flex-wrap gap-6 lg:flex-row lg:items-center">
          {groupsQuery.data?.groups.map((group) => {
            return <GroupCard key={group.id} group={group} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Me
