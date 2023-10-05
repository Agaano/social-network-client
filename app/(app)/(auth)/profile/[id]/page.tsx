import axios from 'axios'
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa"
import styles from '../profile.module.scss'
type Props = {
	params: {id : string}
}

export default async ({params: {id}}: Props) => {
	const serverUrl = process.env.SERVER_URL;
	const response = await axios.get(`${serverUrl}/user/${id}`);
	const user = response.data;

	if (!user.service?.confirmed) {
		return <p>Такого пользователя не существует</p>
	}

	return <>
        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <img
              src={user.avatar || 'no_avatar.png'}
              alt={user.username}
              className='avatar'
            />
            <div className={styles.headerText}>
              <h1
                className={styles.name}
              >
                {user.username}
              </h1>
              <p
                className={styles.position}
              >
                {user.email}
              </p>
            </div>
          </div>
          <p
            className={styles.bio}
          >
            {user.bio}
          </p>
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
          </div>
        </div>
    </>
}