import { IMessage } from '@/app/(app)/(auth)/messanger/page'
import Color from 'color'
import { FastAverageColor } from 'fast-average-color'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from './message.module.scss'

export default ({ message }: { message: IMessage }) => {
	const fac = new FastAverageColor()
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const [color, setColor] = useState('#ccc')
	useEffect(() => {
		const getColor = async () => {
			const newcol = await fac.getColorAsync(serverUrl + message.user.avatar)
			setColor(
				newcol.isDark ? new Color(newcol.hex).lighten(0.5).hex() : newcol.hex
			)
		}
		getColor()
	}, [])

	return (
		<li className={style.message}>
			<img className='avatar' src={serverUrl + message.user.avatar} />
			<div className={style.profile_block}>
				<Link href={'/profile/' + message.user.id}>
					<h3 style={{ color: color }}>{message.user.username}</h3>
				</Link>
				<p>{message.content}</p>
			</div>
		</li>
	)
}
