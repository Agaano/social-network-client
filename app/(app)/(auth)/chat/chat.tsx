'use client'
import useSocket from '@/lib/hooks/useSocket'
import { RootState } from '@/lib/store/store'
import axios from 'axios'
import cookies from 'js-cookie'
import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import style from './chat.module.scss'
export default ({ chatId }: { chatId: string }) => {
	const [message, setMessage] = useState('')
	const { user } = useSelector((state: RootState) => state.auth)
	const token = cookies.get('token')
	const [state, setState] = useState(false)
	const [messages, setMessages] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const messagesRef = useRef<HTMLUListElement>(null)
	const { socket } = useSocket()
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''

	const onMessageEvent = (message: any) => {
		if (message.roomId != chatId) return
		addMessage(message)
	}

	const addMessage = (message: any) => {
		setMessages(prev => {
			return [...prev, message]
		})
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!socket || !user || !token) return
		socket.emit('message', {
			token: token,
			message: message,
			lobby: chatId,
		})
		setMessage('')
	}

	useEffect(() => {
		;(async () => {
			const data = (
				await axios.post(serverUrl + '/rooms/getMessagesByToken', {
					token,
					lobby: chatId,
				})
			).data
			setMessages(data)
		})()
	}, [])

	useEffect(() => {
		if (!messagesRef.current) return
		messagesRef.current.onscroll = scrollHandler
	}, [messagesRef, messages])

	const scrollHandler = async () => {
		if (messagesRef.current?.scrollTop === 0 && !loading) {
			setLoading(true)
			const data = (
				await axios.post(serverUrl + '/rooms/getMessagesByToken', {
					token,
					lobby: chatId,
					cursor: messages[0].id,
				})
			).data
			setMessages(prev => {
				return [...data, ...prev]
			})
			setLoading(false)
		}
	}

	useEffect(() => {
		const currentMaxScroll = messagesRef.current?.scrollHeight
		messagesRef.current?.scroll({ top: currentMaxScroll })
	}, [messages[messages.length - 1]?.id ?? 0])

	useEffect(() => {
		if (socket && socket.listeners('message').length > 0 && !state) {
			socket.removeAllListeners('message')
			socket.on('message', onMessageEvent)
			setState(true)
		}
	}, [socket?.listeners('message')])

	return (
		<main className={style.chat}>
			<div className={style.chat_info}>
				<Link href='/chat'>
					<img src='icons/back.svg' width={50} />
				</Link>
			</div>
			<ul ref={messagesRef} className={style.messages}>
				{!!socket &&
					messages.map(mes => (
						<li className={user && mes.user.id === user.id ? style.mine : ''}>
							<span className={style.username}>{mes.user.username}</span>
							{mes.content}
						</li>
					))}
			</ul>
			<form className={style.input_form} onSubmit={handleSubmit}>
				<input value={message} onChange={e => setMessage(e.target.value)} />
				<button type='submit'>Send</button>
			</form>
		</main>
	)
}
