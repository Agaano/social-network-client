'use client'
import { useState } from 'react'
import { IconContext } from 'react-icons'
import { BiRefresh } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import ApplicationsList from './Application/applicationsList'
import FriendsList from './Friend/friendsList'
import styles from './settings.module.scss'

export default ({ open }: { open: boolean }) => {
	const { user } = useSelector((state: any) => state.auth)
	const serverurl = process.env.NEXT_PUBLIC_SERVER_URL
	const [isLoading, setIsLoading] = useState(true)
	const [refreshFriendship, setRefreshFriendship] = useState(false)
	const RefreshFriendShip = () => setRefreshFriendship(prev => !prev)

	return (
		<div className={`${styles.friendslist} ${open ? styles.open : ''}`}>
			<button
				className={styles.refresh_button}
				onClick={() => {
					RefreshFriendShip()
				}}
			>
				<IconContext.Provider value={{ size: '25px' }}>
					<BiRefresh />
				</IconContext.Provider>
			</button>
			<FriendsList
				styles={styles}
				id={user.id}
				RefreshFriendship={refreshFriendship}
				setRefreshFriendship={RefreshFriendShip}
			/>
			<ApplicationsList
				styles={styles}
				id={user.id}
				RefreshFriendship={refreshFriendship}
				setRefreshFriendship={RefreshFriendShip}
			/>
		</div>
	)
}
