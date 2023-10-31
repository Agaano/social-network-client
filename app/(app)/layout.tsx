'use client'
import validateToken from '@/lib/auth/validateToken'
import { IUser, login } from '@/lib/store/authSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const dispatch = useDispatch()
	const router = useRouter()
	const [textOpacity, setTextOpacity] = useState(0)
	const { refresh } = useSelector((state: any) => state.auth)

	// useEffect(() => {
	// 	setTextOpacity(1)
	// 	const hideTextTimeout = setTimeout(() => {
	// 		setTextOpacity(0)
	// 	}, 2000)

	// 	return () => {
	// 		clearTimeout(hideTextTimeout)
	// 	}
	// }, [])

	useEffect(() => {
		const handler = async () => {
			const user: undefined | IUser = await validateToken()
			console.log(user)
			if (!user) {
				router.push('/auth')
				return
			}
			dispatch(login(user))
		}

		handler()
	}, [refresh])

	return (
		<div>
			{/* <h1
				className='welcome_message'
				style={{
					opacity: textOpacity,
					transition: 'opacity 0.5s',
					display: textOpacity > 0 ? 'block' : 'none',
				}}
			>
				Добро пожаловать на <span style={{ color: 'blue' }}>EtruxS</span>!
			</h1> */}
			{children}
		</div>
	)
}
