import Post from '@/components/post/post'
import axios from 'axios'
import { cookies } from 'next/headers'

const getPosts = async (token: string | undefined) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	return (await axios.post(serverUrl + '/posts/findOne', { token })).data
}

export default async () => {
	const token = cookies().get('token')?.value
	let posts = await getPosts(token)
	return (
		<ul>
			{posts.length > 0 &&
				[...posts].reverse().map(post => {
					return (
						<>
							<Post hasDelete key={post.id} id={post.id} RefreshPosts={null} />
						</>
					)
				})}
		</ul>
	)
}
