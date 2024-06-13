import { ProfileInfo } from '@/components/profile/ProfileInfo/ProfileInfo'
import Form from '@/components/profile/Wall/form'
import PostsList from '@/components/profile/Wall/postsList'
import Wall from '@/components/profile/Wall/wall'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from './profile.module.scss'

export interface IPost {
	id: number
	title: string
	text: string
	date: string
	image: string
}

const ProfilePage = () => {
	const token = cookies().get('token')?.value
	if (!token) {
		redirect('/auth')
	}

	return (
		<main>
			<ProfileInfo />
			<Wall>
				<Form styles={styles} />
				<PostsList />
			</Wall>
		</main>
	)
}

export default ProfilePage
