import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const giftsRouter = createTRPCRouter({
  getAllByParticipantSlug: privateProcedure
    .input(
      z.object({
        groupSlug: z.string().nonempty(),
        participantSlug: z.string().nonempty(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const group = await ctx.prisma.group.findUnique({
        where: {
          slug: input.groupSlug,
        },
      })

      if (!group) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Group not found' })
      }

      const me = await ctx.prisma.participant.findFirst({
        where: {
          slug: input.participantSlug,
          group_id: group.id,
        },
      })

      if (!me) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Participant not found',
        })
      }

      const gifts = await ctx.prisma.gift.findMany({
        where: {
          group_id: input.groupSlug,
          participant_id: me.id,
        },
      })

      return { gifts }
    }),
})
