import prisma from "@/app/database"

export async function GET() {
  const offers = await prisma.offer.findMany()
  return Response.json({ offers })
}