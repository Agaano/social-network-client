'use client'
import { IPost } from '@/app/(app)/(auth)/profile/page'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import Avatar from '../avatar'
import { PostPlaceholder } from '../placeholder/profile/placeholder'
import styles from './post.module.scss'

export default ({
	id,
	RefreshPosts,
	hasDelete = false,
}: {
	id: number | string
	RefreshPosts?: any | null
	hasDelete?: boolean
}) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const [deleteIsLoading, setDeleteIsLoading] = useState(false)
	const [likes, setLikes] = useState([])
	const [refreshLikes, setRefreshLikes] = useState(false)
	const [likesIsLoading, setLikesIsLoading] = useState(0)
	const { user } = useSelector((state: any) => state.auth)
	const [author, setAuthor] = useState<any>()
	const [post, setPost] = useState<IPost | undefined>()
	const [isLiked, setIsLiked] = useState(false)
	const [isDeleted, setIsDeleted] = useState(false)
	useEffect(() => {
		const getPost = async () => {
			const response = await axios.get(serverUrl + '/posts/post/' + id)
			setPost(response.data)
			setAuthor(response.data.user)
		}
		getPost()
	}, [])
	const handleDeletePost = async () => {
		setDeleteIsLoading(true)
		const response = await axios.delete(serverUrl + '/posts/' + post?.id)
		if (response.status >= 200 && response.status < 400) {
			setIsDeleted(true)
		}
	}

	const handleLikePost = async () => {
		if (!user) {
			return
		}
		setLikesIsLoading(isLiked ? -1 : 1)
		setIsLiked(prev => !prev)
		const response = await axios.post(serverUrl + '/posts/like', {
			userId: user.id,
			postId: post?.id,
			type: 'Likes',
		})
		if (response.status >= 200 && response.status < 400) {
			RefreshLikes()
		}
	}

	useEffect(() => {
		if (!user) {
			return
		}
		setIsLiked(hasObjectWithPropertyValue(likes, 'userId', user.id))
	}, [likes, user])

	const RefreshLikes = () => setRefreshLikes(prev => !prev)

	useEffect(() => {
		const getLikes = async () => {
			const response = await axios.get(serverUrl + '/posts/likes/' + id)
			if (response.status >= 200 && response.status < 400) {
				setLikes(response.data)
				setLikesIsLoading(0)
			}
		}

		getLikes()
	}, [refreshLikes])

	// @ts-ignore
	function hasObjectWithPropertyValue(objects, property, value) {
		for (const object of objects) {
			if (object[property] === value) {
				return true
			}
		}

		return false
	}

	if (!post) {
		return <PostPlaceholder />
	}

	if (isDeleted) {
		return (
			<li key={post?.id} className={styles.post}>
				Запись удалена
			</li>
		)
	}

	return (
		<li key={post.id} className={styles.post}>
			{author && (
				<div className={styles.profile_block}>
					<Avatar src={author.avatar} width={30} height={30} />
					<h3>
						<Link href={'/profile/' + author.link}>{author.username}</Link>
					</h3>
				</div>
			)}
			{(user?.isAdmin || hasDelete) && !deleteIsLoading && (
				<button
					className={styles.delete_button}
					onClick={(e: any) => {
						handleDeletePost()
					}}
					disabled={deleteIsLoading}
				>
					<FaRegTrashCan />
				</button>
			)}
			<h2>{post?.title}</h2>
			<p>{post?.text}</p>
			{likesIsLoading > 0 ? (
				<div className={styles.like}>
					<FcLike /> {likes.length + 1}
				</div>
			) : likesIsLoading < 0 ? (
				<div className={styles.like}>
					<FcLikePlaceholder /> {likes.length - 1}
				</div>
			) : (
				<button className={styles.like} onClick={handleLikePost}>
					<IconContext.Provider value={{ color: 'white' }}>
						{
							// @ts-ignore
							isLiked ? (
								<>
									<FcLike /> {likes.length}
								</>
							) : (
								<>
									<FcLikePlaceholder /> {likes.length}
								</>
							)
						}
					</IconContext.Provider>
				</button>
			)}
			<time>{moment(post?.date).format('DD MMMM  HH:mm')}</time>
		</li>
	)
}
