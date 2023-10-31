import styles from './form.module.scss'

type formProps = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	children: React.ReactNode
	buttonText: string
	description: string
	title: string
	additionalEl?: React.ReactNode
}

export default ({
	children,
	title,
	description,
	buttonText,
	onSubmit,
	additionalEl,
	...props
}: formProps) => {
	return (
		<form className={styles.registration_form} onSubmit={onSubmit} {...props}>
			<h1>{title}</h1>
			<p className={styles.description}>{description}</p>
			{children}
			<button>{buttonText}</button>
			{!!additionalEl && (
				<>
					<hr />
					{additionalEl}
				</>
			)}
		</form>
	)
}
