'use client'

import ProgressBar from '@/components/ProgressBar'
import Post from '@/components/post/post'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styles from '../profile.module.scss'

type Props = {
	params: { id: string }
}

enum friendshipStatus {
	friend,
	application,
	none,
}

export default ({ params: { id } }: Props) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const { user } = useSelector((state: any) => state.auth)
	const router = useRouter()
	const [thisUser, setThisUser] = useState<any>({})
	const [thisPosts, setThisPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [isFriend, setIsFriend] = useState(friendshipStatus.none)

	useEffect(() => {
		const handler = async () => {
			const response = await axios.get(`${serverUrl}/user/${id}`)
			console.log(response.data)
			if (response.status >= 200 && response.status < 400) {
				setThisUser(response.data)
			}
			const postsResponse = await axios.get(
				`${serverUrl}/posts/${response.data.id}`
			)
			if (postsResponse.status >= 200 && postsResponse.status < 400) {
				setThisPosts(postsResponse.data)
			}
		}
		handler()
	}, [])

	useEffect(() => {
		if (!user || !thisUser) return
		if (user.id === id) {
			router.push('/profile')
			return
		}
		const checkIsFriend = async () => {
			if (!user || !thisUser) return
			const response = await axios.get(
				serverUrl + '/friends/' + user.id + '/' + thisUser.id
			)
			if (response.data === false) {
				setIsFriend(friendshipStatus.none)
			} else if (response.data === 'Application') {
				setIsFriend(friendshipStatus.application)
			} else setIsFriend(friendshipStatus.friend)
			setLoading(false)
		}
		checkIsFriend()
	}, [thisUser, user])

	const handleAddFriend = async () => {
		const response = await axios.post(serverUrl + '/friends', {
			userId: user.id,
			friendId: thisUser.id,
		})
		if (!response.data.type) return
		if (response.data.type === 'Application') {
			setIsFriend(friendshipStatus.application)
		} else {
			setIsFriend(friendshipStatus.friend)
		}
	}

	if (loading) {
		return <ProgressBar />
	}

	if (!thisUser.service?.confirmed) {
		return <p>Такого пользователя не существует</p>
	}

	return (
		<main className={styles.main}>
			<div className={styles.profile}>
				<div className={styles.profileHeader}>
					<img
						src={process.env.NEXT_PUBLIC_SERVER_URL + thisUser.avatar}
						alt={thisUser.username}
						className='avatar'
					/>
					<div className={styles.headerText}>
						<h1 className={styles.name}>{thisUser.username}</h1>
						<p className={styles.position}>{thisUser.email}</p>
					</div>
				</div>
				<p className={styles.bio}>{thisUser.bio}</p>
				<div className={styles.links}>
					{thisUser.service?.github && (
						<a
							href={thisUser.service.github}
							className={styles.link}
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaGithub className={styles.icon} />
							GitHub
						</a>
					)}
					{thisUser.service?.linkedin && (
						<a
							href={thisUser.service.linkedin}
							className={styles.link}
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaLinkedin className={styles.icon} />
							LinkedIn
						</a>
					)}
					{thisUser.service?.website && (
						<a
							href={thisUser.website}
							className={styles.link}
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaGlobe className={styles.icon} />
							Website
						</a>
					)}
					<div>
						{isFriend === friendshipStatus.none ? (
							<button onClick={handleAddFriend}>Добавить в друзья</button>
						) : isFriend === friendshipStatus.application ? (
							<p>Заявка в друзья отправлена</p>
						) : (
							''
						)}
					</div>
				</div>
			</div>
			<div className={styles.wall}>
				<ul>
					{thisPosts.length > 0 &&
						[...thisPosts].reverse().map((post: any) => {
							return <Post hasDelete={false} id={post.id} RefreshPosts={null} />
						})}
				</ul>
			</div>
		</main>
	)
}
