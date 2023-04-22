import { createTRPCRouter } from '~/server/api/trpc'
import { groupsRouter } from '~/server/api/routers/groups'
import { participantsRouter } from './routers/participants'

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
