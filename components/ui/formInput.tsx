import { HTMLInputTypeAttribute } from 'react'
import { Tooltip } from 'react-tooltip'
import styles from './formInput.module.scss'

export type FormInputProps = {
	onChange: any
	value: string | number
	id: string
	src: string
	title: string
	type?: HTMLInputTypeAttribute
	name?: string
	tooltip?: boolean
	tooltipText?: string | undefined
}

export default ({
	onChange,
	value,
	name,
	id,
	src,
	title,
	tooltip = false,
	tooltipText = '',
	type = 'text',
}: FormInputProps) => {
	return (
		<div className={styles.form_group}>
			<input
				id={id}
				name={name}
				type={type}
				required
				value={value}
				onChange={onChange}
			/>
			<img
				src={src}
				data-tooltip-content={tooltipText}
				data-tooltip-id={id}
				data-tooltip-place='top-start'
			/>
			<label htmlFor={id}>{title}</label>
			{tooltip && <Tooltip id={id} />}
		</div>
	)
}
