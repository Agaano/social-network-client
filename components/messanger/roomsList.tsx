'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsArrowBarRight } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export default ({
	reverse,
	opened,
	style,
	setActiveChat,
	activeChat,
}: {
	reverse: any
	opened: boolean
	style: any
	setActiveChat: any
	activeChat: number | undefined
}) => {
	const { user } = useSelector((state: any) => state.auth)
	const [loading, setLoading] = useState(true)
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const [rooms, setRooms] = useState([])
	useEffect(() => {
		const handler = async () => {
			if (!user) return
			const response = await axios.get(`${serverUrl}/rooms/${user.id}`)
			if (response.status >= 200 && response.status < 400) {
				setRooms(response.data)
			}
			setLoading(false)
		}
		handler()
	}, [user])
	if (loading) {
		return (
			<aside className={opened && style.opened}>
				<span>Загрузка...</span>
			</aside>
		)
	}

	if (!user) {
		return (
			<aside className={opened && style.opened}>
				Перед тем как начать общаться надо войти!
			</aside>
		)
	}

	return (
		<aside
			className={opened && style.opened}
			onClick={() => {
				if (!opened) reverse()
			}}
		>
			<ul>
				{rooms.length > 0 &&
					rooms.map((room: any) => (
						<>
							<li
								onClick={() => {
									reverse()
									setActiveChat(room.id)
								}}
								key={room.id}
							>
								{room.name}
							</li>
						</>
					))}
			</ul>
			<div className={style.arrow}>
				<BsArrowBarRight />
			</div>
		</aside>
	)
}
