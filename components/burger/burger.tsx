'use client';

import Link from 'next/link'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import style from './burger.module.scss'

export default ({open, setIsOpen} : {open: boolean, setIsOpen:any}) => {
	const state = useSelector((state:any)=>state.auth)
	useEffect(() => {
		console.log(state);
	}, [state])
	return (
		<aside className = {`${style.burger} ${open && style.active}`}>

			<nav className= {style.sidebar}>
			{state.isAuthenticated && <div className={style.profile}>
				<img className = 'avatar'/>
				<p>{state.user.username}</p>
				<p>{state.user.email}</p>
			</div>}
				<ul> 
					<li><Link href = '/'>На главную</Link></li>
					{state.isAuthenticated ? <li><Link href='/profile'>Профиль</Link></li> : <li><Link href ='/auth'>Вход</Link></li>}
					<li>Чаты</li>
				</ul>
			</nav>
		</aside>
	)
}