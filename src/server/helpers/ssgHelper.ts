import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '~/server/api/root'
import { prisma } from '~/server/db'
import superjson from 'superjson'

export const generateSSGHelper = (userId: string | null) =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId },
    transformer: superjson,
  })
