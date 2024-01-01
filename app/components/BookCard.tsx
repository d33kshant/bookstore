interface Prop {
  title: string;
  authors: string;
  thumbnail: string;
  average_rating: number;
  ratings_count: number;
  original_price: number;
  selling_price: number;
}

export default function BookCard({
  title,
  authors,
  thumbnail,
  average_rating,
  ratings_count,
  selling_price,
  original_price,
}: Prop) {
  return (
    <a href="/" className="flex flex-col gap-1 m-1 sm:m-2 bg-white px-2 py-2 rounded-sm shadow">
      <img src={thumbnail} className="rounded-sm w-full h-64 sm:h-80 object-cover" />
      <div className="flex-1">
        <div className="font-semibold truncate text-lg">{title} Lorem ipsum dolor sit.</div>
        <div className="text-zinc-500 truncate">{authors.replaceAll(';', ', ')}</div>
        <div className="flex justify-between items-center mt-2 text-lg">
          <div className="flex gap-1 font-semibold text-green-600">
            ${selling_price}
            { selling_price !== original_price && <p className="line-through text-zinc-500">${original_price}</p>}
          </div>
          <div className="flex items-center gap-1 font-semibold text-zinc-500">
          <span className="material-symbols-outlined mb-[2px]">star</span>
            {average_rating.toFixed(1)}
          </div>
        </div>
      </div>
    </a>
  )
}