import { useUser } from '@clerk/nextjs'
import { DotsThree } from '@phosphor-icons/react'
import Link from 'next/link'
import { api } from '~/utils/api'
import { STALE_TIME } from '~/utils/contants'

type GroupCardProps = {
  group: {
    id: string
    name: string
    slug: string
    event_date: Date | null
    draw_date: Date | null
    limit_value: number | null
    start_value: number | null
    administrator_id: string
    participants: Array<{
      id: string
      name: string
    }>
  }
}

export function GroupCard({ group }: GroupCardProps) {
  const { user } = useUser()
  const trpcCtx = api.useContext()
  const deleteGroupMutation = api.groups.delete.useMutation({
    onMutate({ groupId }) {
      const oldGroups = trpcCtx.groups.getAll.getData()

      trpcCtx.groups.getAll.setData(
        { email: user?.primaryEmailAddress?.emailAddress },
        (data) => {
          if (!data) {
            return oldGroups
          }

          return {
            groups: data.groups.filter((group) => group.id !== groupId),
          }
        },
      )

      return function rollback() {
        trpcCtx.groups.getAll.setData(
          { email: user?.primaryEmailAddress?.emailAddress },
          oldGroups,
        )
      }
    },
    onError(_error, _variables, rollback) {
      rollback && rollback()
    },
    async onSettled() {
      await trpcCtx.groups.invalidate(undefined, { exact: true })
    },
  })

  return (
    <Link
      key={group.id}
      href={`/groups/${group.slug}`}
      className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-default focus:outline-none focus:ring-2 focus:ring-primary-dark md:min-h-[330px] md:w-[534px]"
      onMouseEnter={() => {
        trpcCtx.groups.getBySlug.prefetch(
          { slug: group.slug },
          { staleTime: STALE_TIME },
        )
      }}
    >
      <h3 className="text-2xl font-bold leading-9">{group.name}</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold">Data do evento:</span>
          <span className="text-base lining-nums">25/12/2023</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold">Data do sorteio:</span>
          <span className="text-base lining-nums">não realizado</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold">Valor do presente:</span>
          <span className="text-base lining-nums">R$ 40 - 50</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold">Participantes:</span>
          <span className="text-base lining-nums">
            {group.participants?.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
        {group.participants.slice(0, 3).map((participant) => {
          return (
            <span
              key={participant.id}
              className="w-fit rounded-lg bg-primary-light px-2 py-[0.125rem] text-sm font-bold text-primary-dark"
            >
              {participant.name}
            </span>
          )
        })}
        {group.participants.length > 3 ? (
          <DotsThree size={24} weight="bold" />
        ) : null}
      </div>

      {group.administrator_id === user?.id ? (
        <button
          type="button"
          className="decoration-none w-fit text-base font-bold text-primary-pure transition-colors hover:text-primary-dark focus:underline focus:decoration-dotted focus:underline-offset-4 focus:shadow-none focus:outline-none"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            deleteGroupMutation.mutate({ groupId: group.id })
          }}
        >
          Apagar grupo
        </button>
      ) : null}
    </Link>
  )
}
