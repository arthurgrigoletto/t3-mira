import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const groupsRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(z.object({ email: z.string().email().optional() }))
    .query(async ({ ctx, input }) => {
      const groups = await ctx.prisma.group.findMany({
        where: {
          OR: [
            { administrator_id: ctx.userId },
            { participants: { some: { email: input.email } } },
          ],
        },
        include: {
          participants: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      return { groups }
    }),
  getBySlug: privateProcedure
    .input(z.object({ slug: z.string().nonempty() }))
    .query(async ({ ctx, input }) => {
      const group = ctx.prisma.group.findUnique({ where: { slug: input.slug } })

      if (!group) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      return { group }
    }),
})
