import { useUser } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { PlusCircle } from '@phosphor-icons/react'
import { GetServerSideProps, type NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import DrawImage from '~/assets/who.png'
import { dayjs } from '~/lib/dayjs'
import { generateSSGHelper } from '~/server/helpers/ssgHelper'
import { api } from '~/utils/api'
import { formatCurrency } from '~/utils/formatters'

import { Pagination } from './Pagination'
import { ParticipantCard } from './ParticipantCard'

export const getGiftValueString = ({
  limitValue,
  startValue,
}: {
  limitValue?: number | null
  startValue?: number | null
}): string => {
  if (!limitValue) {
    return 'sem limite'
  }

  if (!startValue) {
    return `até ${formatCurrency(limitValue)}`
  }

  return `${formatCurrency(startValue)} - ${formatCurrency(limitValue)}`
}

const SingleGroupPage: NextPage = () => {
  const router = useRouter()
  const slug = router.query.slug as string
  const [page, setPage] = useState(1)
  const { user } = useUser()
  const trpcCtx = api.useContext()
  const groupQuery = api.groups.getBySlug.useQuery({
    slug,
  })
  const participantsQuery = api.participants.getAll.useQuery(
    {
      groupSlug: slug,
      page,
    },
    { keepPreviousData: true },
  )
  const giftsBaseUrl = useMemo(() => `/groups/${slug}/gifts`, [slug])
  const isAdministrator = user?.id === groupQuery.data?.group.administrator_id

  useEffect(() => {
    trpcCtx.participants.getAll.prefetch({ groupSlug: slug, page: page + 1 })
  }, [page, slug, trpcCtx.participants.getAll])

  return (
    <>
      <Head>
        <title>Nygma | {groupQuery.data?.group.name}</title>
      </Head>
      <div className="container flex flex-col gap-8 px-4 py-8 lg:mx-auto lg:flex-row lg:gap-20">
        <aside className="flex flex-col gap-6 lg:max-w-xs">
          <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-default">
            <h2 className="text-2xl font-bold">
              {groupQuery.data?.group.name}
            </h2>
            <div className="flex flex-col gap-2">
              <p className="text-base lining-nums">
                <strong className="font-semibold">Data do evento:</strong>{' '}
                {groupQuery.data?.group.event_date
                  ? dayjs(groupQuery.data?.group.event_date).format(
                      'DD/MM/YYYY',
                    )
                  : 'não informado'}
              </p>
              <p className="text-base lining-nums">
                <strong className="font-semibold">Data do sorteio:</strong>{' '}
                {groupQuery.data?.group.draw_date
                  ? dayjs(groupQuery.data?.group.draw_date).format('DD/MM/YYYY')
                  : 'não realizado'}
              </p>
              <p className="text-base lining-nums">
                <strong className="font-semibold">Valor do presente: </strong>
                {getGiftValueString({
                  limitValue: groupQuery.data?.group.limit_value,
                  startValue: groupQuery.data?.group.start_value,
                })}
              </p>
              <button className="mt-2 w-fit text-base font-bold text-primary-pureDark">
                Editar
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">
                Compartilhe o link do grupo:
              </p>
              <button className="w-full rounded-full bg-neutral-high-light px-2 py-1 text-base font-bold text-primary-pureDark">
                Copiar convite
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 shadow-default">
            <h2 className="text-base font-bold md:text-2xl">Quem eu tirei?</h2>
            <Image
              src={DrawImage}
              alt="Pessoa lendo um papel"
              width={279}
              height={186}
              data-testid="draw-participant-image"
            />
          </div>
        </aside>
        <main className="flex flex-1 flex-col items-center gap-8">
          <div className="flex w-full flex-col gap-8 lg:w-fit lg:flex-row">
            <button
              disabled={
                !!groupQuery.data?.group.draw_date ||
                (participantsQuery.isSuccess &&
                  participantsQuery.data.count < 3)
              }
              className="order-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary-pure px-2 py-4 text-base font-bold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-high-medium disabled:text-neutral-low-medium lg:order-2 lg:w-52"
            >
              Realizar sorteio
            </button>
            <button
              disabled={!!groupQuery.data?.group.draw_date}
              className="order-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-solid border-primary-pureDark px-2 py-4 text-base font-bold text-primary-pureDark transition-colors hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-pureDark lg:order-1 lg:w-64"
            >
              <PlusCircle size={24} weight="fill" />
              Adicionar participante
            </button>
          </div>
          <div className="flex w-full max-w-[703px] flex-col gap-2">
            {participantsQuery.data?.result.map((participant) => {
              return (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  administratorEmail={
                    groupQuery.data?.group.administrator_email
                  }
                  giftsBaseUrl={giftsBaseUrl}
                  isAdministrator={isAdministrator}
                />
              )
            })}
          </div>
          <Pagination
            totalCountOfResults={participantsQuery.data?.count}
            onPageChange={setPage}
            currentPage={page}
          />
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const user = getAuth(req)
  const ssg = generateSSGHelper(user.userId)
  const slug = params?.slug

  if (typeof slug !== 'string') throw new Error('no slug')

  try {
    await ssg.groups.getBySlug.fetch({ slug })

    await ssg.participants.getAll.prefetch({ groupSlug: slug, page: 1 })

    return {
      props: {
        trpcState: ssg.dehydrate(),
        slug,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}

export default SingleGroupPage
