import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'
import { PAGE_LIMIT } from '~/utils/contants'

export const participantsRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(
      z.object({
        groupSlug: z.string(),
        page: z.number().optional().default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const group = await ctx.prisma.group.findUnique({
        where: {
          slug: input.groupSlug,
        },
      })

      if (!group) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const [participants, count] = await ctx.prisma.$transaction([
        ctx.prisma.participant.findMany({
          where: {
            group_id: group.id,
          },
          take: PAGE_LIMIT,
          skip: PAGE_LIMIT * (input.page - 1),
          orderBy: {
            name: 'asc',
          },
        }),
        ctx.prisma.participant.count({
          where: {
            group_id: group.id,
          },
        }),
      ])

      return {
        count,
        result: participants,
        currentPage: input.page,
        limit: PAGE_LIMIT,
        totalPages: Math.ceil(count / PAGE_LIMIT),
      }
    }),
})
