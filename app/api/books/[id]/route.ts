import { NextRequest } from "next/server"
import prisma from "@/app/database"

export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
  const id = params.id
  const book = await prisma.book.findUnique({ where: { id } })
  if (book) {
    return Response.json(book)
  }
  return Response.json({ error: "Not found" })
}
