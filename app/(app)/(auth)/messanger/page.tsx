'use client';
import Chat from '@/components/messanger/chat'
import RoomsList from '@/components/messanger/roomsList'
import { IUser } from '@/lib/store/authSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import style from './messanger.module.scss'


export interface IMessage {
	id:number  
  date:string    
  content:string
  user: IUser
}

interface IGetMessage {
	id:number
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
	const {user} = useSelector((state:any) => state.auth)
	const [chatsIsOpened, setChatsIsOpened] = useState(true);
	const [chats,setChats] = useState<IChat[]>()
	const [server, setServer] = useState<any>(null)
	const [activeChat, setActiveChat] = useState<number | undefined>();
	const reverseChat = () => setChatsIsOpened((prev) => !prev);
	const joinTheRoom = (id: number) => {
		server.emit('joinTheRoom', {
			user: user.id,
			lobby: id,
		})
	}

	const isUserOnPage = () => {
		const isVisible = window.document.hidden;
  	return !isVisible;
	};

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_SERVER_URL + '/chat');
		setServer(socket);

    // Подписываемся на событие "connection"
    socket.on("connection", () => {
		});
		
    // Возвращаем объект сервера
    return () => {
			socket.disconnect();
		};
	}, [])

	useEffect(() => {
		if (!server) return;
		server.on('create-the-room', (lobbyInfo: IChat) => {
			console.log(lobbyInfo);
			setChats((prev:any) => {
				if (!prev) return [{...lobbyInfo}]
				return [...prev, {...lobbyInfo}]
			})
		})
		server.on('message', (messageInfo: IGetMessage) => {
			if (Notification.permission === "granted" && !isUserOnPage()) {
					const notification = new Notification(messageInfo.user.username, {
						body: messageInfo.content
					})
			}
			addMessageToRoom(messageInfo);
		})
	}, [server])
	

	const sendMessage = (content:string) => {
		server.emit('message', {
			user: user.id,
			lobby: activeChat,
			message: content 
		})
	}

	useEffect(() => {
		if (!activeChat) return
		joinTheRoom(activeChat)
		console.log(activeChat);
	}, [activeChat])

	// useEffect(() => {
	// 	console.log(chats)
	// }, [chats, reloadMessages])

	const addMessageToRoom = (messageInfo: IGetMessage) : void => {
		// @ts-ignore
		setChats(prev => {
			if (!prev) return;
			const newArr = [...prev];
			newArr.map((chat) => {
				if (chat.id !== messageInfo.roomId) return chat;
				if (chat.messages.find((obj) => obj.id === messageInfo.id)) return chat;
				chat.messages.push(messageInfo);
				return chat;
			})
			return newArr;
		})
	}

	

	return (
		<div className= {style.layout}>
			<RoomsList setActiveChat={setActiveChat} activeChat={activeChat} reverse = {reverseChat} opened = {chatsIsOpened} style = {style}/>
			<Chat sendMessage={(message:string) => {sendMessage(message)}} activeChat={activeChat} chats = {chats} opened = {!chatsIsOpened} style = {style}/>
		</div>
	)
}