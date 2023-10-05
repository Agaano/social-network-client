import { useEffect, useState } from 'react'
import style from './switch.module.scss'

export default ({value, setValue} : {value: boolean, setValue: any}) => {
	const [checked, setChecked] = useState(value);

	useEffect(() => {
		setValue(checked)
	}, [checked])

	return (
			<label className = {style.switch}>
				<input type="checkbox" checked = {checked} onClick = {() => {setChecked(prev => !prev)}}/>
				<span className ={style.slider}>
					<span className = {style.circle}></span>
				</span>
			</label>
	)
}