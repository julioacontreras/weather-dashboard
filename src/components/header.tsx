import Link from 'next/link'

export default function Header() {
  return (
    <div className='px-6 py-3 flex gap-4 items-center'>
      <Link href="/" className='text-shadow-sm'>
        Home
      </Link>
      <Link href="/favorites" className='text-shadow-sm'>
        Favorites
      </Link>
    </div>
  )
}
