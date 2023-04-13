import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const groupsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    console.log({ userId: ctx.userId })
    const groups = await ctx.prisma.group.findMany({
      where: {
        administrator_id: ctx.userId,
      },
    })

    return { groups }
  }),
})
