import React from 'react'
import styles from './button.module.scss'

export default ({onClick, children} : {onClick: any, children: React.ReactNode}) => {
	return (
		<button className= {styles.button} onClick = {onClick}>
			{children}
		</button>
	) 
}