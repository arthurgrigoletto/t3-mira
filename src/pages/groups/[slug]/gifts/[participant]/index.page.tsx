import { useUser } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { CaretLeft } from '@phosphor-icons/react'
import { Gift } from '@prisma/client'
import isEqual from 'lodash/isEqual'
import { type GetServerSideProps, type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useReducer, useState } from 'react'

import { generateSSGHelper } from '~/server/helpers/ssgHelper'

import { giftReducer } from './store/reducer'

type GiftsProps = {
  gifts: Gift[]
  participant: {
    email: string
    name: string
  }
  groupSlug: string
  participantSlug: string
}

const Gifts: NextPage<GiftsProps> = ({ gifts, participant }) => {
  const [compareGifts, setCompareGifts] = useState(gifts)
  const [giftState, dispatch] = useReducer(giftReducer, { gifts: compareGifts })
  const router = useRouter()
  const { user } = useUser()

  const isMe = user?.emailAddresses.some(
    (email) => email.emailAddress === participant.email,
  )

  return (
    <>
      <Head>
        <title>Nygma | {participant.name} Presentes</title>
      </Head>
      <div className="flex flex-col gap-8 px-4 py-14 lg:pl-32 lg:pr-20">
        <button
          className="group inline-flex w-fit items-center gap-2 focus:outline-none"
          onClick={router.back}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-white transition-all  group-hover:border-primary-pureDark group-hover:text-primary-pureDark group-focus:border-primary-pureDark group-focus:text-primary-pureDark">
            <CaretLeft size={16} />
          </div>
          <span className="text-base font-semibold group-hover:text-primary-pureDark group-focus:text-primary-pureDark">
            Voltar
          </span>
        </button>
        <h2 className="hidden text-2xl font-bold md:block md:text-3.5xl">
          {participant.name}
        </h2>
        <div className="flex max-w-[534px] flex-col gap-6 md:pt-16">
          <h2 className="text-2xl font-bold leading-9">Lista de presentes</h2>

          {/* {!isMe &&
          participantQuery.isSuccess &&
          participantQuery.data.participant.gifts.length === 0 ? (
            <p className="text-base">
              {participantQuery.data.participant.name} não informou o que deseja
              ganhar
            </p>
          ) : null} */}

          {isMe ? (
            <div className="grid grid-rows-2 gap-6 md:grid-cols-2">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-solid border-primary-pureDark px-2 py-4 text-base font-bold text-primary-pureDark transition-colors hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-pureDark">
                Adicionar opção de presente
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary-pure px-2 py-4 text-base font-bold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-high-medium disabled:text-neutral-low-medium"
                disabled={
                  giftState.gifts.length === 0 ||
                  isEqual(giftState.gifts, compareGifts)
                }
              >
                Salvar
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { userId } = getAuth(req)
  const ssg = generateSSGHelper(userId)

  const groupSlug = params!.slug as string
  const participantSlug = params!.participant as string

  try {
    const giftsQuery = await ssg.gifts.getAllByParticipantSlug.fetch({
      groupSlug,
      participantSlug,
    })
    const { participant } = await ssg.participants.getBySlug.fetch({
      participantSlug,
      groupSlug,
    })

    return {
      props: {
        gifts: giftsQuery.gifts,
        participant: {
          name: participant.name,
          email: participant.email,
        },
        groupSlug,
        participantSlug,
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/groups/${params!.slug}`,
      },
    }
  }
}

export default Gifts
