'use client'
import validateToken from '@/lib/auth/validateToken'
import useSocket from '@/lib/hooks/useSocket'
import { IUser, login } from '@/lib/store/authSlice'
import { RootState } from '@/lib/store/store'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const dispatch = useDispatch()
	const router = useRouter()
	const messageToast = (message: string, username?: string) =>
		toast(
			username +
				': ' +
				(message.length > 15 ? `${message.slice(0, 14)}...` : message)
		)
	const { refresh, user } = useSelector((state: RootState) => state.auth)
	const { socket } = useSocket()

	useEffect(() => {
		const handler = async () => {
			const user: undefined | IUser = await validateToken()
			if (!user) {
				router.push('/auth')
				return
			}
			dispatch(login(user))
		}

		handler()
	}, [refresh])

	useEffect(() => {
		if (!socket || !user) return
		socket.on('connection', onConnection)
	}, [socket, user])

	const onConnection = async () => {
		if (!socket || !user) return
		const token = cookies.get('token')
		socket.emit('joinAllRooms', token)
		socket.on('message', (message: any) => {
			if (!message.content || !message.user) return
			messageToast(message.content, message.user?.username)
		})
	}

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
			<ToastContainer theme='dark' position='bottom-left' />
		</div>
	)
}
