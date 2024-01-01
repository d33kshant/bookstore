import BookCard from "./BookCard";

interface Prop {
  books: {
    isbn: number;
    title: string;
    authors: string;
    categories: string;
    thumbnail: string;
    description: string;
    published_year: number;
    average_rating: number;
    num_pages: number;
    ratings_count: number;
    original_price: number;
    selling_price: number;
  }[],
}

export default function BookGrid({ books }: Prop) {
  return (
    <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 p-2">
      {books.map(book => <BookCard key={book.isbn} {...book} />)}
    </div>
  )
}