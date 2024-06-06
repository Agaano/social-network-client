import styles from '@/components/profile/ProfileInfo/profile.module.scss'
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa'
import Avatar from '../avatar'
import FriendController from './FriendController'
import BanController from './BanController'

export default ({ user }: { user: any }) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

	return (
		<div className={styles.profile}>
			<div className={styles.profileHeader}>
				<Avatar src={user.avatar} alt={user.username} />
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
						<FaGlobe className={styles.icon}/>
						Website
					</a>
				)}
			</div>
			<div className={'my-5'}>
				<FriendController id={user.id}/>
				<BanController id={user.id}/>
			</div>
		</div>
	)
}
