'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { BsFillPersonPlusFill, BsFillPersonXFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export default ({
	friend,
	styles,
	RefreshFriendship,
}: {
	friend: any
	styles: any
	RefreshFriendship: any
}) => {
	const router = useRouter()
	const { user } = useSelector((state: any) => state.auth)
	const serverurl = process.env.NEXT_PUBLIC_SERVER_URL

	const handleDeletePerson = async (id: number) => {
		const response = await axios.post(serverurl + '/friends/delete', {
			userId: user.id,
			friendId: id,
		})
		if (response.status >= 200 && response.status < 400) {
			RefreshFriendship()
		}
	}

	const handleAddPerson = async (id: number) => {
		const response = await axios.post(serverurl + '/friends', {
			userId: user.id,
			friendId: id,
		})
		if (response.status >= 200 && response.status < 400) {
			RefreshFriendship()
		}
	}

	return (
		<li key={friend.id}>
			<div
				className={styles.friend_profile}
				onClick={() => {
					router.push('/profile/' + friend.link)
				}}
			>
				<img
					className='avatar'
					src={!friend.avatar ? 'no_avatar.png' : serverurl + friend.avatar}
				/>
				<span>{friend.username}</span>
			</div>
			<div className={styles.buttons}>
				<button
					onClick={() => {
						handleAddPerson(friend.id)
					}}
				>
					<BsFillPersonPlusFill style={{ width: '30px', height: '30px' }}  />
				</button>
				<button
					onClick={() => {
						handleDeletePerson(friend.id)
					}}
				>
					<BsFillPersonXFill style={{ width: '30px', height: '30px' }}  />
				</button>
			</div>
		</li>
	)
}
