import { createTRPCRouter } from '~/server/api/trpc'
import { groupsRouter } from '~/server/api/routers/groups'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  groups: groupsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
