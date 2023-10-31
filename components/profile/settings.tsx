'use client'
import styles from './settings.module.scss'

export default ({ open }: { open: boolean }) => {
	return (
		<div className={`${styles.settings} ${open ? styles.open : ''}`}>
			<h2>Настройки</h2>
		</div>
	)
}
