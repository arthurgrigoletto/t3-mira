import { createServerSideHelpers } from '@trpc/react-query/server'
import superjson from 'superjson'

import { appRouter } from '~/server/api/root'
import { prisma } from '~/server/db'

export const generateSSGHelper = (userId: string | null) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId },
    transformer: superjson,
  })
