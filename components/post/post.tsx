'use client'; 
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import styles from './post.module.scss'

export default ({post, RefreshPosts, author, hasDelete = false}: {post: any, RefreshPosts: any | null, author: any, hasDelete: boolean}) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const [deleteIsLoading, setDeleteIsLoading] = useState(false);
	const [likes, setLikes] = useState([]);
	const [refreshLikes, setRefreshLikes] = useState(false);
	const [likesIsLoading, setLikesIsLoading] = useState(true);
	const {user} = useSelector((state:any) => state.auth)
	const [isLiked, setIsLiked] = useState(false);
	const handleDeletePost = async () => {
		setDeleteIsLoading(true);
    const response = await axios.delete(serverUrl + '/posts/' + post.id) 
    if (response.status >= 200 && response.status < 400) {
      RefreshPosts();
    }
  } 

	const handleLikePost = async () => {
		if (!user) {
			return;
		}
		setLikesIsLoading(true);
		setIsLiked(prev => !prev)
		const response = await axios.post(serverUrl + '/posts/like', {
			userId: user.id,
			postId: post.id,
			type: 'Likes'
		})
		if (response.status >= 200 && response.status < 400) {
			RefreshLikes()
		}
	}

	useEffect(() => {
		if (!user) {
			return;
		}
		setIsLiked(hasObjectWithPropertyValue(likes,'userId', user.id));
	}, [likes, user])

	const RefreshLikes = () => setRefreshLikes(prev => !prev) 
 
	useEffect(() => {
		const getLikes = async () => {
			const response = await axios.get(serverUrl + '/posts/likes/' + post.id);
			if (response.status >= 200 && response.status < 400) {
				setLikes(response.data);
				setLikesIsLoading(false);
			}
		}

		getLikes();
	}, [refreshLikes])

	// @ts-ignore
	function hasObjectWithPropertyValue(objects, property, value) {
		for (const object of objects) {
			if (object[property] === value) {
				return true;
			}
		}
	
		return false;
	}

	return (
		<li key={post.id} className = {styles.post}>
			<div className={styles.profile_block}>
				<img className='avatar' src = {!author.avatar ? 'no_avatar.png' : serverUrl + author.avatar}/>
				<h3>{author.username}</h3>
			</div>
			{hasDelete && !deleteIsLoading &&
				<button 
					className={styles.delete_button}
					onClick={(e:any) => {
						handleDeletePost();
					}}
					disabled={deleteIsLoading}
				>
					<FaRegTrashCan/>
				</button>
			}
			<h2>{post?.title}</h2>
			<p>{post?.text}</p>
			{
				likesIsLoading ? 
				<div className = {styles.like}>
					...
				</div>
				:
					<button className = {styles.like} onClick = {handleLikePost}>
						<IconContext.Provider value = {{color: 'white'}}>
							{ 
								// @ts-ignore
								isLiked ? <><FcLike/> {likes.length}</> : <><FcLikePlaceholder/> {likes.length}</>
							}
						</IconContext.Provider>
					</button>
			}
			<time>{post?.date}</time>
		</li>
	)
}