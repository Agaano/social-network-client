'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import ApplicationsComponent from './applicationsComponent'

export default ({
	id,
	styles,
	RefreshFriendship,
	setRefreshFriendship,
}: {
	id: number
	styles: any
	RefreshFriendship: any
	setRefreshFriendship: any
}) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const [friends, setFriends] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		const handleFriends = async () => {
			setLoading(true)
			const response = await await axios.get(
				serverUrl + '/friends/applications/' + id
			)
			setFriends(response.data)
			setLoading(false)
		}
		handleFriends()
	}, [RefreshFriendship])

	if (loading) {
		return (
			<ul>
				<h2 key={'-1'}>Загрузка</h2>
			</ul>
		)
	}

	return (
		<ul>
			<h2 key={'-1'}>Заявки в друзья</h2>
			{friends.map((friend: any) => {
				return (
					<ApplicationsComponent
						key={friend.id}
						styles={styles}
						friend={friend}
						RefreshFriendship={setRefreshFriendship}
					/>
				)
			})}
		</ul>
	)
}
