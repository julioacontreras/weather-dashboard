import '../assets/globals.css'
import { ReactNode } from 'react'
import Header from './header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main>{children}</main>
    </div>
  )
}
