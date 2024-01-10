import prisma from "@/app/database"

export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: [
      {
        ratings_count: "desc",
      },
      {
        average_rating: "desc",
      },
    ],
    take: 10,
  })
  return Response.json({ books })
}
