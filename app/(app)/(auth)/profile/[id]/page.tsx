import Post from '@/components/post/post'
import Wall from '@/components/profile/Wall/wall'
import axios from 'axios'
import { Metadata, ResolvingMetadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect, useSelectedLayoutSegment } from 'next/navigation'
import PersonInfo from '../../../../../components/person/PersonInfo'
import styles from '../profile.module.scss'
import BanController from '@/components/person/BanController'

type Props = {
	params: { id: string }
}
type MetaDataProps = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
	{ params, searchParams }: MetaDataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const user = (await axios.get(`${serverUrl}/user/${params.id}`)).data

	return {
		title: `${user.username}`,
		robots: '',
	}
}

export default async ({ params: { id } }: Props) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const user = (await axios.get(`${serverUrl}/user/${id}`)).data
	const isTheSame = (
		await axios.post(`${serverUrl}/user/isTheSamePerson`, {
			id: user.id,
			token: cookies().get('token')?.value,
		})
	).data
	if (isTheSame) {
		redirect('/profile')
	}

	const posts = (await axios.get(`${serverUrl}/posts/findOne/${user.id}`)).data

	if (user?.service?.['blocked']) {
		return (
			<main className={'flex flex-col w-full h-5 justify-center items-center '}>
				Этот пользователь был заблокирован
				<BanController id = {user.id}/>
				<Link className='text-purple-300' href='/'>
					Вернуться на главную
				</Link>
			</main>
		)
	}

	if (!user?.service?.confirmed) {
		return (
			<main className={'flex flex-col w-full h-5 justify-center items-center '}>
				Такого пользователя не существует
				<Link className='text-purple-300' href='/'>
					Вернуться на главную
				</Link>
			</main>
		)
	}

	return (
		<main className={styles.main}>
			<PersonInfo user={user} />
			<Wall>
				<ul>
					{posts.length > 0 ? (
						[...posts].reverse().map(post => {
							return (
								<li>
									<Post id={post.id} key={post.id} />
								</li>
							)
						})
					) : (
						<div className='flex items-center justify-center text-[#d8cdb0]'>
							У этого пользователя пока нет постов :(
						</div>
					)}
				</ul>
			</Wall>
		</main>
	)
}
