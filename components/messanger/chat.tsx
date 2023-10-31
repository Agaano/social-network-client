'use client'
import { IChat, IMessage } from '@/app/(app)/(auth)/messanger/page'
import { useEffect, useRef, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import Message from './message'

export default ({
	opened,
	style,
	chat,
	chats,
	sendMessage,
	getOlderMessages,
}: {
	opened: boolean
	style: any
	chat: IChat | undefined
	chats: IChat[] | undefined
	sendMessage: any
	getOlderMessages: any
}) => {
	const [message, setMessage] = useState('')
	const handleSubmit = (e: any) => {
		e.preventDefault()
		setMessage('')
		sendMessage(message)
	}
	const sectionRef = useRef<HTMLUListElement>(null)
	const [scrollHeight, setScrollHeight] = useState<number | undefined>()

	useEffect(() => {
		if (!chat || !sectionRef) return
		sectionRef.current?.scroll({ top: sectionRef.current?.scrollHeight })
		sectionRef.current?.addEventListener('scroll', () => {
			if (sectionRef.current?.scrollTop === 0) {
				getOlderMessages(chat.id, chat.messages[0].id)
				setScrollHeight(sectionRef.current?.scrollHeight)
				sectionRef.current?.removeEventListener('scroll', () => {})
			}
		})
		return () => {
			sectionRef.current?.removeEventListener('scroll', () => {})
		}
	}, [chat])

	useEffect(() => {
		if (!chats || !chat) return
		if (!scrollHeight) return
		sectionRef.current?.scroll({
			top: sectionRef.current?.scrollHeight - scrollHeight,
		})
	}, [chats])

	if (!chat) {
		return (
			<main className={!opened && style.closed}>
				<section>Загрузка</section>
				<form>
					<input />
					<button>
						<BiSend />
					</button>
				</form>
			</main>
		)
	}

	return (
		<main className={!opened && style.closed}>
			<div className={style.header}>{chat.name}</div>
			<section ref={sectionRef}>
				<ul>
					{chat &&
						chat.messages.map((message: IMessage) => {
							return <Message key={message.id} message={message} />
						})}
				</ul>
			</section>
			<form onSubmit={handleSubmit}>
				<input
					value={message}
					onChange={e => {
						setMessage(e.target.value)
					}}
				/>
				<button>
					<BiSend />
				</button>
			</form>
		</main>
	)
}
