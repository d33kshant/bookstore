import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: undefined | PrismaClient
}

const prisma = globalThis.prisma ?? new PrismaClient()
export default prisma
