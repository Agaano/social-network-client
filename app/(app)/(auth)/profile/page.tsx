'use client'
import ModalAvatar from '@/components/profile/modalAvatar'
import { logout, refresh } from '@/lib/store/authSlice'
import { motion } from "framer-motion"
import Head from "next/head"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { CiLogout } from 'react-icons/ci'
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import styles from "./profile.module.scss"

const ProfilePage = () => {
  const router = useRouter();
  const {user} = useSelector((state:any) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const reloadPage = () => {
    router.push('/');
    router.push('/profile');
    console.log('page reloaded')
  }

  useEffect(() => {
      setIsLoading(false);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(refresh())
  }

  if (!user) {
      return <></>
  } 

  return (
  <>
      <Head>
      <title>Профиль</title>
      </Head>
      {isLoading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : (
        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <img
              src={user.avatar || 'no_avatar.png'}
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
            <button onClick = {handleLogout}><CiLogout/></button>
          </div>
        </div>
      )}
      <ModalAvatar isOpen = {modalOpen} userId = {user.id} reloadPage={reloadPage} onRequestClose={() => {setModalOpen(false)}}/>
    </>
  );
};

export default ProfilePage;