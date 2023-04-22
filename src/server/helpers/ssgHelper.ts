import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import { prisma } from '~/server/db'
import superjson from 'superjson'

export const generateSSGHelper = (userId: string | null) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId },
    transformer: superjson,
  })
