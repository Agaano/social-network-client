'use client'
import Form from '@/components/ui/form'
import FormInput, { FormInputProps } from '@/components/ui/formInput'
import axios from 'axios'
import Link from 'next/link'
import * as router from 'next/navigation'
import { useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const rout = router.useRouter()

	const [loading, setLoading] = useState(false)

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

	const [serviceFormData, setServiceFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const handleChange = (e: any) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
		setServiceFormData({ ...serviceFormData, [name]: '' })
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		setLoading(true)
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/
		if (emailRegex.test(formData.email) === false) {
			setServiceFormData(prev => ({
				...prev,
				email: 'Введите корректный email',
			}))
			setLoading(false)
			return
		}
		if (formData.password.length < 6 || formData.password.length > 25) {
			setServiceFormData(prev => ({
				...prev,
				password: 'Длина пароля должна быть от 6 до 25 символов',
			}))
			setLoading(false)
			return
		}
		if (formData.password !== formData.confirmPassword) {
			setServiceFormData(prev => ({
				...prev,
				confirmPassword: 'Пароли должны совпадать!',
			}))
			setLoading(false)
			return
		}

		const response = await axios.post(`${serverUrl}/auth/signup`, {
			...formData,
			confirmPassword: undefined,
		})
		if (response.status >= 200 && response.status < 300) {
			rout.push(`/confirm?id=${response.data.id}&email=${response.data.email}`)
		}
		setLoading(false)
	}

	const Inputs: FormInputProps[] = [
		{
			id: 'username',
			name: 'username',
			tooltip: true,
			tooltipText: 'Имя пользователя',
			title:
				serviceFormData.username && formData.username
					? serviceFormData.username
					: 'Имя пользователя',
			src: 'icons/profile.svg',
			value: formData.username,
			onChange: handleChange,
		},
		{
			id: 'email',
			name: 'email',
			tooltip: true,
			tooltipText: 'Мы попросим вас подтвердить вашу почту позже',
			title:
				serviceFormData.email && formData.email
					? serviceFormData.email
					: 'Email',
			src: 'icons/email.svg',
			value: formData.email,
			onChange: handleChange,
		},
		{
			id: 'password',
			name: 'password',
			tooltip: true,
			tooltipText: 'Длина пароля должна быть от 6 до 25 символов',
			title:
				serviceFormData.password && formData.password
					? serviceFormData.password
					: 'Пароль',
			type: 'password',
			src: 'icons/password.svg',
			value: formData.password,
			onChange: handleChange,
		},
		{
			id: 'confirmPassword',
			name: 'confirmPassword',
			tooltip: true,
			tooltipText: 'Повторите свой пароль ещё раз что бы не забыть его!',
			title:
				serviceFormData.confirmPassword && formData.confirmPassword
					? serviceFormData.confirmPassword
					: 'Повторите пароль',
			type: 'password',
			src: 'icons/password.svg',
			value: formData.confirmPassword,
			onChange: handleChange,
		},
	]

	return (
		<Form
			onSubmit={handleSubmit}
			buttonText='Зарегистрироваться'
			title='Зарегистрироваться'
			description='Мы всегда рады новым лицам!'
			additionalEl={
				<p className='my-4'>
					{' '}
					Уже есть аккаунт?{' '}
					<b>
						<Link href='/auth'>Войти</Link>
					</b>
				</p>
			}
		>
			{Inputs &&
				Inputs.map((input, index) => <FormInput key={index} {...input} />)}
		</Form>
	)
}
