import { type GetServerSideProps, type NextPage } from 'next'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

import { api } from '~/utils/api'
import { STALE_TIME } from '~/utils/contants'
import { GroupCard } from '~/components/GroupCard'
import Head from 'next/head'
import { getAuth } from '@clerk/nextjs/server'
import { generateSSGHelper } from '~/server/helpers/ssgHelper'

const Groups: NextPage = () => {
  const { user } = useUser()
  const listGroupsQuery = api.groups.getAll.useQuery(
    {
      emails: user?.emailAddresses.map((email) => email.emailAddress),
    },
    { staleTime: STALE_TIME },
  )

  return (
    <>
      <Head>
        <title>Nygma | Meus Grupos</title>
      </Head>
      <main className="container flex h-full flex-col gap-6 px-4 py-8 md:mx-auto md:pb-[5.5rem] md:pt-14">
        <h2 className="text-2xl font-bold md:text-3.5xl">Meus grupos</h2>
        <p className="w-56 text-base font-normal md:w-[428px]">
          Confira os grupos que está participando ou crie um novo grupo para
          realizar um sorteio de nomes
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:items-start md:justify-start">
          <Link
            href="/groups/new"
            className="flex h-52 w-full items-center justify-center rounded-lg border border-dashed border-neutral-low-pure p-8 text-2xl font-bold transition-colors hover:border-primary-dark hover:bg-primary-light hover:text-primary-dark focus:border-primary-dark focus:text-primary-dark focus:outline-none md:h-[330px] md:w-[535px]"
          >
            Criar grupo
          </Link>

          {listGroupsQuery.data?.groups.map((group) => {
            return <GroupCard key={group.id} group={group} />
          })}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user, userId } = getAuth(req)
  const ssg = generateSSGHelper(userId)

  await ssg.groups.getAll.prefetch({
    emails: user?.emailAddresses.map((email) => email.emailAddress),
  })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

export default Groups
