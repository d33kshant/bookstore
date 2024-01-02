import BookGrid from "@/app/components/BookGrid"
import { books } from "@/app/database/data"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <BookGrid books={books} />
    </div>
  )
}
