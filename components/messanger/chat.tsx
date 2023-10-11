'use client';
import { IChat, IMessage } from '@/app/(app)/(auth)/messanger/page'
import { useState } from 'react'
import { BiSend } from 'react-icons/bi'

export default ({opened, style, activeChat, chats, sendMessage} : {opened: boolean, style: any, activeChat: number | undefined, chats: IChat[] | undefined, sendMessage: any}) => {
	const [message, setMessage] = useState('');
	const handleSubmit = (e:any) => {
		e.preventDefault();
		setMessage('');
		sendMessage(message);
	}
	
	if (!activeChat) {
		return (
			<main>
				<section>
					Выберите чат для того что бы начать общаться
				</section>
				<form>
					<input/>
					<button>
							<BiSend/>
					</button>
				</form>
			</main>
		)
	}

	if (!chats) {
		return (
			<main>
				<section>
					Загрузка
				</section>
				<form>
					<input/>
					<button>
							<BiSend/>
					</button>
				</form>
			</main>
		)
	}

	return (
		<main className = {!opened && style.closed}>
			<section>
				<ul>
					{activeChat && chats.length > 0 && chats.find((obj:IChat) => obj.id === activeChat)?.messages.map((message:IMessage) => {
						return (
							<li>
								{message.user?.username}:{message.content}
							</li>
							)
						})}
				</ul>
			</section>
			<form onSubmit={handleSubmit}>
				<input value = {message} onChange = {(e) => {setMessage(e.target.value)}}/>
				<button>
						<BiSend/>
				</button>
			</form>
		</main>
	)
}