import { useUser } from '@clerk/nextjs'
import { DotsThree, Gift } from '@phosphor-icons/react'
import { Participant } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'

type ParticipantCardProps = {
  participant: Participant
  isAdministrator: boolean
  administratorEmail?: string
  giftsBaseUrl: string
}

export function ParticipantCard({
  participant,
  administratorEmail,
  isAdministrator,
  giftsBaseUrl,
}: ParticipantCardProps) {
  const { user } = useUser()
  const isMe = useMemo(
    () =>
      user?.emailAddresses.some(
        (email) => email.emailAddress === participant.email,
      ),
    [user, participant.email],
  )

  return (
    <div
      key={participant.id}
      className="flex flex-col rounded-2xl bg-white p-6 shadow-default md:flex-row md:items-center md:justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2 md:flex-row">
            {participant.email === administratorEmail ? (
              <span className="order-1 w-fit rounded-lg bg-primary-light px-2 py-[0.125rem] text-sm font-bold text-primary-dark md:order-2">
                Administrador
              </span>
            ) : null}
            <h2 className="order-2 text-base font-bold md:order-1">
              {participant.name}
            </h2>
          </div>
          <span className="text-base font-semibold">{participant.email}</span>
        </div>

        {isAdministrator || isMe ? (
          <button className="hidden w-fit text-base font-bold text-primary-pureDark hover:text-primary-dark focus:underline focus:decoration-dotted focus:underline-offset-4 focus:shadow-none focus:outline-none md:flex">
            Editar participante
          </button>
        ) : null}
      </div>

      {isMe ? (
        <Link
          href={`${giftsBaseUrl}/${participant.slug}`}
          className="mt-4 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-2xl border-2 border-solid border-primary-pureDark px-2 py-4 text-base font-bold text-primary-pureDark transition-colors hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-pureDark md:mt-0"
        >
          <Gift size={24} className="hidden md:block" />
          Adicionar lista de presentes
        </Link>
      ) : null}

      <button className="mt-4 inline-flex w-fit items-center gap-[0.875rem] text-base font-bold text-primary-pureDark hover:text-primary-dark focus:underline focus:decoration-dotted focus:underline-offset-4 focus:shadow-none focus:outline-none md:hidden">
        <DotsThree size={32} />
        Mais opções
      </button>
    </div>
  )
}
