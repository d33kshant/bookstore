import { NextRequest } from "next/server"
import prisma from "@/app/database"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams  
  const page = params.get("page") || 1
  
  const id = params.get("id")
  if (!id) return Response.json({ error: "Field id is missing"})

  const book = await prisma.book.findUnique({ where: { id }})
  if (!book) return Response.json({ error: "Book not found" })

  const respose = await fetch(process.env.RECOMMENDATION_SERVER! + book.isbn + `?page=${page}`)
  const data = await respose.text()
  if (!data) return Response.json({ error: "Failed to get recommendations" })

  const isbns = data.split('\n')

  const books = await prisma.book.findMany({
    where: {
      isbn: {
        in: isbns
      }
    }
  })

  return Response.json({ books })
}
