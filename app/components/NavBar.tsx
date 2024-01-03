import Link from "next/link"

interface Props {
  title: string;
  itemCount: number;
}

export default function NavBar({ title, itemCount }: Props) {
  return (
    <>
    <div className="w-full px-4 py-3 fixed flex items-center justify-between bg-blue-600 text-white shadow-md">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Link href="/cart" className="relative flex justify-center items-center">
        { itemCount > 0 && <p className="absolute top-[-4px] right-[-4px] text-xs font-semibold bg-rose-600 text-white rounded-lg px-1 min-w-4 min-h-4 flex justify-center items-center">{itemCount}</p>}
        <span className="material-symbols-outlined">shopping_cart</span>
      </Link>
    </div>
    <div className="w-full px-4 py-3 text-lg">White Space</div>
    </>
  )
}