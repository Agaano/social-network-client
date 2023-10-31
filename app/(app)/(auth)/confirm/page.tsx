'use client'
import Form from '@/components/ui/form'
import FormInput from '@/components/ui/formInput'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default () => {
	const [confirmCode, setConfirmCode] = useState('')
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const router = useRouter()
	const { get } = useSearchParams()
	const id = get('id')
	const email = get('email')

	const handleSubmitConfirm = async (e: any) => {
		e.preventDefault()
		const response = await axios.post(`${serverUrl}/auth/confirm`, {
			id: id,
			code: confirmCode,
		})
		if (response.status >= 200) {
			router.push('/auth')
		}
	}

	return (
		<Form
			onSubmit={handleSubmitConfirm}
			title='Подтвердждение кода'
			buttonText='Подтвердить'
			description={`Мы отправили письмо с кодом подтверждение на почту ${email}`}
		>
			<FormInput
				onChange={(e: any) => {
					setConfirmCode(e.target.value)
				}}
				value={confirmCode}
				title='Код подтверждения'
				id='confirm'
				src='icons/password.svg'
			/>
		</Form>
	)
}
