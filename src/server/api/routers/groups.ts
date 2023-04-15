import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const groupsRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(
      z.object({ emails: z.array(z.string().email()).optional() }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const groups = await ctx.prisma.group.findMany({
        where: {
          OR: [
            { administrator_id: ctx.userId },
            {
              participants: { some: { email: { in: input?.emails || [] } } },
            },
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
  delete: privateProcedure
    .input(z.object({ groupId: z.string().cuid().nonempty() }))
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.prisma.group.findUnique({
        where: { id: input.groupId },
      })

      if (!group) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Group not found' })
      }

      if (group.administrator_id !== ctx.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Only administrators can delete groups',
        })
      }

      await ctx.prisma.group.delete({
        where: { id: group.id },
      })

      return {
        group,
      }
    }),
})
