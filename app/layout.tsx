'use client';
import Burger from '@/components/burger/burger'
import Logo from '@/components/svg/logo'
import store from '@/lib/store/store'
import Link from 'next/link'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { CSSTransition, TransitionGroup } from "react-transition-group"
import './globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  const [burgerOpen, setBurgerOpen] = useState(false);
  
  return (
    <html lang="en">
      <Provider store = {store}>
        <body>  
          <Burger open={burgerOpen} setIsOpen={setBurgerOpen}/>
          <div className={`burger-icon ${burgerOpen && 'open'}`} onClick = {e => setBurgerOpen(prev => !prev)}>
            <div className="burger-line top-line"></div>
            <div className="burger-line middle-line"></div>
            <div className="burger-line bottom-line"></div>
          </div>
          <Link  href = '/'  >
            <Logo />
          </Link>
          <TransitionGroup>
          <CSSTransition
          key="about"
          appear={true}
          enter={true}
          leave={true}
          timeout={1000}
          className="fade-in"
        >
          {children}
          </CSSTransition>
          </TransitionGroup>
        </body>
      </Provider>
    </html>
  )
}
