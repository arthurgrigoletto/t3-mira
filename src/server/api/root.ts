import { groupsRouter } from '~/server/api/routers/groups'
import { participantsRouter } from '~/server/api/routers/participants'
import { createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  groups: groupsRouter,
  participants: participantsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
