'use client'

// import { login } from '@/lib/store/authSlice'
import Form from '@/components/ui/form'
import FormInput from '@/components/ui/formInput'
import { refresh } from '@/lib/store/authSlice'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import style from '../auth.module.scss'

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const dispatch = useDispatch()
	const router = useRouter()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		setMessage('')

		axios
			.post(process.env.NEXT_PUBLIC_SERVER_URL + '/auth/signin', {
				id: email,
				password,
			})
			.then(response => {
				const { data } = response
				if (!data) {
					router.push(`/confirm?id=${data.id}&email=${data.email}`)
				} else {
					Cookies.set('token', data, { expires: 1 })
					router.push('/')
					dispatch(refresh())
				}
			})
			.catch(err => {
				if (err.response?.status === 451) {
					setMessage('Ваш аккаунт был заблокирован')
				} else if (err.response?.status < 500)
					setMessage('Неправильное имя пользователя или пароль')
				else {
					setMessage('Произошла ошибка... Повторите попытку позже')
					console.log(err)
				}
			})
		setEmail('')
		setPassword('')
	}

	return (
		<Form
			onSubmit={handleSubmit}
			buttonText='Войти'
			title={'Войти'}
			description='Присоединяйтесь к нам!'
			additionalEl={
				<>
					<p className='my-5'>
						Ещё нет аккаунта?
						<b>
							{' '}
							<Link href='/register'>Зарегистрироваться</Link>
						</b>
					</p>
					<p className='my-5'>
						<b>
							{' '}
							<Link href='/forgotpassword'>Забыли пароль?</Link>
						</b>
					</p>
				</>
			}
		>
			{message && <p className={style.error}>{message}</p>}
			<br></br>
			<FormInput
				id='email'
				src='icons/email.svg'
				value={email}
				title='Имя пользователя или почта'
				onChange={(e: any) => setEmail(e.target.value)}
			/>
			<FormInput
				id='password'
				src='icons/password.svg'
				value={password}
				onChange={(e: any) => setPassword(e.target.value)}
				title='Пароль'
				type='password'
			/>
		</Form>
	)
}

export default LoginForm
