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
      })

      return { groups }
    }),
})
