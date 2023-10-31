import Post from '@/components/post/post'
import axios from 'axios'

export default async function Home() {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const posts = (await axios.get(serverUrl + '/posts')).data

	return (
		<main className='flex min-h-screen flex-col items-center justify-between'>
			<div className={'wall'}>
				<ul>
					{posts.length > 0 &&
						[...posts].reverse().map((post: any) => {
							return <Post hasDelete={false} id={post.id} RefreshPosts={null} />
						})}
				</ul>
			</div>
		</main>
	)
}
