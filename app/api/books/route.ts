import { NextRequest } from "next/server"
import prisma from "@/app/database"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const page = params.get("page") || 1
  const query = params.get("query") || ''
  const sorting = params.get("sort") || ''

  const sortable = ["average_rating", "selling_price", "published_year"]
  let [sort, order] = sorting.split('-')
  if (!sortable.includes(sort)) sort = sortable[0]

  const take = 10
  const skip = (Math.max(+page, 1) - 1) * take
  const total = await prisma.book.count({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      }
    }
  })
  const count = Math.ceil(total / take)
  
  const books = await prisma.book.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      }
    },
    orderBy: {
      [sort]: order === 'asc' ? 'asc' : 'desc',    
    },
    skip,
    take,
  })

  return Response.json({ books, match_count: total, page_count: count, current_page: +page })
}
