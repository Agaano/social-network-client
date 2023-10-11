'use client';

import Post from '@/components/post/post'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa"
import styles from '../profile.module.scss'
type Props = {
	params: {id : string}
}

export default ({params: {id}}: Props) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [thisUser, setThisUser] = useState<any>({});
  const [thisPosts, setThisPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const handler = async () => {
      const response = await axios.get(`${serverUrl}/user/${id}`);
      console.log(response.data);
      if (response.status >= 200 && response.status < 400) {
        setThisUser(response.data);
        setLoading(false);
      }
      const postsResponse = await axios.get(`${serverUrl}/posts/${response.data.id}`);
      if (postsResponse.status >= 200 && postsResponse.status < 400) {
        setThisPosts(postsResponse.data);
      }
    }
    handler();
  }, [])

  const handleAddFriend = async () => {
    
  }

  // if (loading) {
  //   return <ProgressBar/>
  // }

	if (!thisUser.service?.confirmed) {
		return <p>Такого пользователя не существует</p>
	}

	return (
  <main className = {styles.main}>
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <img
          src={process.env.NEXT_PUBLIC_SERVER_URL + thisUser.avatar || 'no_avatar.png'}
          alt={thisUser.username}
          className='avatar'
        />
        <div className={styles.headerText}>
          <h1
            className={styles.name}
          >
            {thisUser.username}
          </h1>
          <p
            className={styles.position}
          >
            {thisUser.email}
          </p>
        </div>
      </div>
      <p
        className={styles.bio}
      >
        {thisUser.bio}
      </p>
      <div className={styles.links}>
        {thisUser.service?.github && 
          <a
            href={thisUser.service.github}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className={styles.icon} />
            GitHub
          </a>
        }
        {
          thisUser.service?.linkedin && 
          <a
            href={thisUser.service.linkedin}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} />
            LinkedIn
          </a>
        }
        {
          thisUser.service?.website && 
          <a
            href={thisUser.website}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe className={styles.icon} />
            Website
          </a>
        }
        <div>
          <button onClick = {handleAddFriend}>Добавить в друзья</button>
        </div>
      </div>
    </div>
    <div className = {styles.wall}>
      <ul>
        {thisPosts.length > 0 && [...thisPosts].reverse().map((post) => {
          return (
            <Post hasDelete = {false} author = {thisUser} post = {post} RefreshPosts={null}/>
          )
        })}
      </ul>
    </div>
  </main>
  )
}