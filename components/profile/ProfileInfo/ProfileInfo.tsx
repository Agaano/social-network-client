'use client'
import Avatar from '@/components/avatar'
import { ProfilePlaceholder } from '@/components/placeholder/profile/placeholder'
import FriendsTab from '@/components/profile/friendsTab'
import ModalAvatar from '@/components/profile/modalAvatar'
import Settings from '@/components/profile/settings'
import { logout, refresh } from '@/lib/store/authSlice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineSetting } from 'react-icons/ai'
import { CiLogout } from 'react-icons/ci'
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa'
import { LiaUserFriendsSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import styles from './profile.module.scss'

export function ProfileInfo() {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const { user } = useSelector((state: any) => state.auth)
	const [modalOpen, setModalOpen] = useState(false)
	const [settingsOpen, setSettingsOpen] = useState(false)
	const [friendsListOpen, setFriendsListOpen] = useState(false)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleLogout = () => {
		dispatch(logout())
		dispatch(refresh())
		router.push('/push')
	}

	if (!user) return <ProfilePlaceholder />

	return (
		<>
			<div className={styles.profile}>
				<div className={styles.profileHeader}>
					<Avatar
						src={user.avatar}
						alt={user.username}
						onClick={e => setModalOpen(true)}
					/>
					<div className={styles.headerText}>
						<h1 className={styles.name}>{user.username}</h1>
						<p className={styles.position}>{user.email}</p>
					</div>
				</div>
				<p className={styles.bio}>{user.bio}</p>
				<div className={styles.links}>
					{user.service?.github && (
						<a
							href={user.service.github}
							className={styles.link}
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaGithub className={styles.icon} />
							GitHub
						</a>
					)}
					{user.service?.linkedin && (
						<a
							href={user.service.linkedin}
							className={styles.link}
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaLinkedin className={styles.icon} />
							LinkedIn
						</a>
					)}
					{user.service?.website && (
						<a
							href={user.website}
							className={styles.link}
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaGlobe className={styles.icon} />
							Website
						</a>
					)}
				</div>
				<div className={styles.buttons}>
					<button
						onClick={() => {
							if (settingsOpen) {
								setSettingsOpen(false)
							}
							setFriendsListOpen(prev => !prev)
						}}
					>
						<IconContext.Provider value={{ size: '30px' }}>
							<LiaUserFriendsSolid />
						</IconContext.Provider>
					</button>
					<button
						onClick={() => {
							if (friendsListOpen) {
								setFriendsListOpen(prev => !prev)
							}
							setSettingsOpen(prev => !prev)
						}}
					>
						<IconContext.Provider value={{ size: '30px' }}>
							<AiOutlineSetting />
						</IconContext.Provider>
					</button>
					<button onClick={handleLogout}>
						<IconContext.Provider value={{ size: '30px' }}>
							<CiLogout onClick={handleLogout} />
						</IconContext.Provider>
					</button>
				</div>
			</div>
			<ModalAvatar
				isOpen={modalOpen}
				reloadPage={() => {}}
				onRequestClose={() => {
					setModalOpen(false)
				}}
			/>
			<FriendsTab open={friendsListOpen} />
			<Settings open={settingsOpen} />
		</>
	)
}
