'use client'
import { motion } from "framer-motion"
import Head from "next/head"
import { useEffect, useState } from "react"
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa"
import { useSelector } from 'react-redux'
import styles from "./profile.module.scss"

const ProfilePage = () => {
    const {user} = useSelector((state:any) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

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
                src={'https://vet-centre.by/wp-content/uploads/2016/11/kot-eti-udivitelnye-kotiki.jpg'}
                alt={user.username}
                className='avatar'
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
              <a
                href={user.github}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className={styles.icon} />
                GitHub
              </a>
              <a
                href={user.linkedin}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className={styles.icon} />
                LinkedIn
              </a>
              <a
                href={user.website}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe className={styles.icon} />
                Website
              </a>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default ProfilePage;