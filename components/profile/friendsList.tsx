'use client';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { BiRefresh, BiSolidMessage } from 'react-icons/bi'
import { BsFillPersonPlusFill, BsFillPersonXFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import styles from './profile.module.scss'

export default ({open} : {open : boolean}) => {
	const {user} = useSelector((state:any) => state.auth);
	const serverurl = process.env.NEXT_PUBLIC_SERVER_URL;
	const [friends, setFriends] = useState([]);
	const [applications, setApplications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const [refreshFriendship, setRefreshFriendship] = useState(false);
	useEffect(() => {
		const handler = async () => {
			if (!user) return;
			setIsLoading(true);
			const applicationsResponse = await axios.get(serverurl + '/friends/applications/' + user.id);
			const response = await axios.get(serverurl + '/friends/' + user.id);
			if (response.status >= 200 && response.status < 400) {
				setFriends(response.data);
				setIsLoading(false);
			}
			if (applicationsResponse.status >= 200 && applicationsResponse.status < 400) {
				setApplications(applicationsResponse.data);
				setIsLoading(false);
			}
			setIsLoading(false);
		}
		handler()
	}, [refreshFriendship])

	const RefreshFrienship = () => {setRefreshFriendship(prev => !prev)}

	const handleDeletePerson = async (id: number) => {
		setIsLoading(true);
		const response = await axios.post(serverurl + '/friends/delete', {
			userId: user.id,
			friendId: id,
		})
		if (response.status >= 200 && response.status < 400) {
			RefreshFrienship();
		}
	}

	const handleAddPerson = async (id: number) => {
		setIsLoading(true);
		const response = await axios.post(serverurl + '/friends', {
			userId: user.id,
			friendId: id,
		})
		if (response.status >= 200 && response.status < 400) {
			RefreshFrienship();
		}
	}

	return (
		<div className={`${styles.friendslist} ${open ? styles.open : ''}`}>
			<button className={styles.refresh_button} onClick = {() => {RefreshFrienship()}}>
				<IconContext.Provider value = {{size: '25px'}}>
					<BiRefresh/>
				</IconContext.Provider>
			</button>{ isLoading ? <div className = {styles.loading}>Загрузка...</div> :
			<>
				<ul>
					<h2>Список друзей</h2>
					{friends.map((friend:any) => {
						return <li key = {friend.id}>
							<div className= {styles.friend_profile} onClick = {() => {router.push('/profile/' + friend.link)}}>
								<img className='avatar' src = {!friend.avatar ? 'no_avatar.png' : serverurl + friend.avatar}/>
								<span>{friend.username}</span>
							</div>
							<div className = {styles.buttons}>
								<button><BiSolidMessage/></button>
								<button onClick = {() => {handleDeletePerson(friend.id)}}><BsFillPersonXFill/></button>
							</div>
						</li>
					})}
				</ul>
				<ul>
					<h2>Заявки в друзья</h2>
					{applications.map((friend:any) => {
						return <li key = {friend.id}>
							<div className= {styles.friend_profile} onClick = {() => {router.push('/profile/' + friend.link)}}>
								<img className='avatar' src = {!friend.avatar ? 'no_avatar.png' : serverurl + friend.avatar}/>
								<span>{friend.username}</span>
							</div>
							<div className = {styles.buttons}>
								<button onClick = {() => {handleAddPerson(friend.id)}}><BsFillPersonPlusFill/></button>
								<button onClick = {() => {handleDeletePerson(friend.id)}}><BsFillPersonXFill/></button>
							</div>
						</li>
					})}
				</ul>
			</>
			}
		</div>
	)
}