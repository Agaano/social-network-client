'use client'
import Chat from '@/components/messanger/chat'
import RoomsList from '@/components/messanger/roomsList'
import { IUser } from '@/lib/store/authSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import style from './messanger.module.scss'

export interface IMessage {
	id: number
	date: string
	content: string
	user: IUser
}

interface IGetMessage {
	id: number
	date: string
	content: string
	user: any
	roomId: number
}

export interface IChat {
	id: number
	name: string
	messages: IMessage[]
	members: IUser[]
}

export default () => {
	const { user } = useSelector((state: any) => state.auth)
	const [chatsIsOpened, setChatsIsOpened] = useState(true)
	const [chats, setChats] = useState<IChat[]>()
	const [server, setServer] = useState<any>(null)
	const [activeChat, setActiveChat] = useState<number | undefined>()
	const reverseChat = () => setChatsIsOpened(prev => !prev)
	const joinTheRoom = (id: number) => {
		server.emit('joinTheRoom', {
			user: user.id,
			lobby: id,
		})
	}

	const isUserOnPage = () => {
		const isVisible = window.document.hidden
		return !isVisible
	}

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_SERVER_URL + '/chat')
		setServer(socket)
		return () => {
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (!server || !user) return

		server.on('create-the-room', (lobbyInfo: IChat) => {
			setChats((prev: any) => {
				if (!prev) return [{ ...lobbyInfo }]
				return [...prev, { ...lobbyInfo }]
			})
		})

		server.on('get-older-messages', (messages: any) => {
			addOlderMessagesToRoom(messages.lobby, messages.messages)
		})

		server.on('message', (messageInfo: IGetMessage) => {
			if (
				Notification.permission === 'granted' &&
				!isUserOnPage() &&
				messageInfo.user.id !== user.id
			) {
				new Notification(messageInfo.user.username, {
					body: messageInfo.content,
				})
			}
			addMessageToRoom(messageInfo)
		})
	}, [server, user])

	const sendMessage = (content: string) => {
		server.emit('message', {
			user: user.id,
			lobby: activeChat,
			message: content,
		})
	}

	useEffect(() => {
		if (!activeChat) return
		joinTheRoom(activeChat)
	}, [activeChat])

	const addMessageToRoom = (messageInfo: IGetMessage): void => {
		// @ts-ignore
		setChats(prev => {
			if (!prev) return
			const newArr = [...prev]
			newArr.map(chat => {
				if (chat.id !== messageInfo.roomId) return chat
				if (chat.messages.find(obj => obj.id === messageInfo.id)) return chat
				chat.messages.push(messageInfo)
				return chat
			})
			return newArr
		})
	}

	const addOlderMessagesToRoom = (
		lobbyId: number,
		messages: Array<IMessage>
	) => {
		if (messages.length === 0) return
		// @ts-ignore
		setChats((prev: IChat[]) => {
			if (!prev) return
			const newArr = [...prev]
			newArr.map(chat => {
				if (chat.id !== lobbyId) return chat
				if (chat.messages[0].id === messages[0].id) return
				chat.messages.unshift(...messages)
				return chat
			})
			return newArr
		})
	}

	const getOlderMessages = (lobby: number, message: number) => {
		if (!server) return
		server.emit('getOlderMessages', { lobby, message })
	}

	return (
		<div className={style.layout}>
			<RoomsList
				setActiveChat={setActiveChat}
				activeChat={activeChat}
				reverse={reverseChat}
				opened={chatsIsOpened}
				style={style}
			/>
			<Chat
				sendMessage={(message: string) => {
					sendMessage(message)
				}}
				chats={chats}
				chat={chats?.find(obj => obj.id === activeChat)}
				opened={!chatsIsOpened}
				getOlderMessages={getOlderMessages}
				style={style}
			/>
		</div>
	)
}
