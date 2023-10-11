'use client';
import Burger from '@/components/burger/burger'
import Logo from '@/components/svg/logo'
import store from '@/lib/store/store'
import Link from 'next/link'
import { useState } from 'react'
import { Provider } from 'react-redux'
import './globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  const [burgerOpen, setBurgerOpen] = useState(false);
  
  return (
    <html lang="en">
    <Provider store={store}>
      <body className='simple'>
        <Burger open={burgerOpen} setIsOpen={setBurgerOpen} />
        <div className={`burger-icon ${burgerOpen && 'open'}`} onClick={(e) => setBurgerOpen((prev) => !prev)}>
          <div className="burger-line top-line"></div>
          <div className="burger-line middle-line"></div>
          <div className="burger-line bottom-line"></div>
        </div>
        <Link style={{ width: 'fit-content', display: 'block' }} href="/">
          <Logo />
        </Link>
        {children}
      </body>
    </Provider>
  </html>
  )
}
