import { initTRPC } from '@trpc/server'
import { prisma } from './prisma'
import superjson from 'superjson'

const t = initTRPC.create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

export type AppRouter = typeof appRouter

export const appRouter = router({
  // Residents
  getResidents: publicProcedure.query(async () => {
    return await prisma.resident.findMany({
      include: {
        home: true,
        interviews: true,
        chapters: true,
        assignments: true,
      }
    })
  }),
  
  // Retirement Homes
  getRetirementHomes: publicProcedure.query(async () => {
    return await prisma.retirementHome.findMany({
      include: {
        residents: true,
      }
    })
  }),
})