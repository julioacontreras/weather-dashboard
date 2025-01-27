import '../assets/globals.css'
import { ReactNode } from 'react'
import Header from './header'
import Head from 'next/head'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Weather application</title>
      </Head>   
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
