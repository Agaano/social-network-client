import styles from '../profile.module.scss'

export default ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.wall}>{children}</div>
}
