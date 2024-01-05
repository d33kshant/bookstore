import { NextRequest } from "next/server"
import prisma from "@/app/database"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
    
  const page = params.get("page") || 1
  const query = params.get("query") || ''

  const take = 10
  const skip = (Math.max(+page, 1) - 1) * take
  
  const books = await prisma.book.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      }
    },
    skip,
    take,
  })

  return Response.json({ books })
}
