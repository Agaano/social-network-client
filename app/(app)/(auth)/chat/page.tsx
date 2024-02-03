import axios from 'axios'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Chat from './chat'
import styles from './chat.module.scss'

export default async ({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined }
}) => {
	const token = cookies().get('token')?.value
	if (!token) redirect('/auth')
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const dialogues = (
		await axios.post(serverUrl + '/rooms/getByToken', { token })
	).data
	const chat = searchParams?.chat

	if (!chat)
		return (
			<main className={styles.main}>
				<h1>Чаты</h1>
				<div>
					<ul>
						{dialogues &&
							dialogues.map((dialogue: any) => (
								<li key={dialogue.id}>
									<Link
										href={`/chat?chat=${dialogue.id}`}
										className={styles.link}
									>
										<div className='animate-pulse rounded-full bg-gray-500 h-12 w-12'></div>
										{dialogue.name}
									</Link>
								</li>
							))}
					</ul>
				</div>
			</main>
		)
	if (chat) return <Chat chatId={chat.toString()} />
}
