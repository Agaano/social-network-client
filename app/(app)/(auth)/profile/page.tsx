'use client'
import Post from '@/components/post/post'
import FriendsList from '@/components/profile/friendsList'
import ModalAvatar from '@/components/profile/modalAvatar'
import Settings from '@/components/profile/settings'
import { logout, refresh } from '@/lib/store/authSlice'
import axios from 'axios'
import { motion } from "framer-motion"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { IconContext } from 'react-icons'
import { AiOutlineSetting } from 'react-icons/ai'
import { CiLogout } from 'react-icons/ci'
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa"
import { LiaUserFriendsSolid } from 'react-icons/lia'
import InputEmoji from 'react-input-emoji'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./profile.module.scss"

interface IPost {
  id: number,
  title: string,
  text: string,
  date: string,
}

const ProfilePage = () => {
  const [emoji, setEmoji] = useState('');

  const handleEmojiChange = (emoji:any) => {
    setEmoji(emoji);
  };
  const router = useRouter();
  const {user} = useSelector((state:any) => state.auth);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [friendsListOpen, setFriendsListOpen] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    loading: false,
  });
  
  useEffect(() => {
    const handle = async () => {
      const response = await axios.get(serverUrl + '/posts/' + user.id)
      if (response.status >= 200 && response.status < 400) {
        const data = response.data;
        setPosts(data);
      }
    }
    if (!!user) {
      handle();
    }
  }, [user, refreshPosts])
  
  const RefreshPosts = () => setRefreshPosts(prev => !prev)


  const handleSubmitPost = async (e:any) => {
    e.preventDefault();
    setNewPost((prev:any) => ({...prev, loading: true}))
    const token = Cookies.get('_tka');
    if (!token) return;

    if (!(newPost.title.trim().length > 0 || newPost.text.trim().length > 0)) {
      setNewPost({loading: false, text: '', title: ''});
      return;
    }

    const response = await axios.post(serverUrl + '/posts', {
      token: token,
      title: newPost.title,
      text: newPost.text,
    })
    if (response.status >= 200 && response.status < 400) {
      setNewPost({title: '', text: '', loading: false})
      RefreshPosts();
    }
  }

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };
  useEffect(() => {
      setIsLoading(false);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(refresh())
  }

  if (!user) {
      return <div className = 'flex fixed w-full h-full justify-center align-baseline'>

        </div>
  } 

  return (
  <main>
      {isLoading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : (
        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <img
              src={serverUrl + user.avatar || 'no_avatar.png'}
              alt={user.username}
              className='avatar'
              onClick={e=>setModalOpen(true)}
            />
            <div className={styles.headerText}>
              <motion.h1
                className={styles.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {user.username}
              </motion.h1>
              <motion.p
                className={styles.position}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {user.email}
              </motion.p>
            </div>
           
          </div>
          <motion.p
            className={styles.bio}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            {user.bio}
          </motion.p>
          <div className={styles.links}>
            {user.service?.github && 
              <a
                href={user.service.github}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className={styles.icon} />
                GitHub
              </a>
            }
            {
              user.service?.linkedin && 
              <a
                href={user.service.linkedin}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className={styles.icon} />
                LinkedIn
              </a>
            }
            {
              user.service?.website && 
              <a
                href={user.website}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                >
                <FaGlobe className={styles.icon} />
                Website
              </a>
            }
            <div className = {styles.buttons}>
              <button onClick = {() => {if (settingsOpen) {setSettingsOpen(false)}; setFriendsListOpen(prev => !prev)}}>
                <IconContext.Provider value = {{size: '30px'}}>
                  <LiaUserFriendsSolid/>
                </IconContext.Provider>
              </button>
              <button onClick ={() => {if (friendsListOpen) {setFriendsListOpen(prev => !prev)}; setSettingsOpen(prev => !prev)}}>
                <IconContext.Provider value = {{size: '30px'}}>
                  <AiOutlineSetting/>
                </IconContext.Provider>
              </button>
              <button onClick = {handleLogout}>
                <IconContext.Provider value = {{size: '30px'}}>
                  <CiLogout onClick = {handleLogout}/>
                </IconContext.Provider>
              </button>
            </div>
          </div>
          <ModalAvatar isOpen = {modalOpen} reloadPage={() => {}} onRequestClose={() => {setModalOpen(false)}}/>
        </div>
      )}
      <FriendsList open = {friendsListOpen}/>
      <Settings open = {settingsOpen}/>
      <div className = {styles.wall}>
        <form className={styles.createPost} onSubmit={handleSubmitPost}>
          <input
            type="text"
            name="title"
            placeholder="Заголовок"
            value={newPost.title}
            onChange={(e:any) => {setNewPost((prev: any) => {
              return {...prev, title: e.target.value}
            })}}
          />
          <InputEmoji
            keepOpened
            borderRadius={5}
            language={'ru'}
            theme={'dark'}
            placeholder="Содержание поста"
            value={newPost.text}
            onChange={(e) => {
              setNewPost((prev: any) => {
                return {...prev, text: e}
              })
            }}
          />
          {!newPost.loading &&
          <button type='submit'>Отправить</button>
          }
        </form>
          <ul>
            {posts.length > 0 && [...posts].reverse().map((post) => {
              return (
                <Post hasDelete author = {user} post = {post} RefreshPosts={RefreshPosts}/>
              )
            })}
          </ul>
      </div>
    </main>
  );
};

export default ProfilePage;