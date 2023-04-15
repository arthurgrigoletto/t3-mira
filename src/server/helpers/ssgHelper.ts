import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import { prisma } from '~/server/db'
import superjson from 'superjson'

type GenerateSSGHelperProps = {
  userId: string | null
}

export const generateSSGHelper = ({ userId }: GenerateSSGHelperProps) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId },
    transformer: superjson,
  })
