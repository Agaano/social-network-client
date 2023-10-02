'use client';
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import style from '../auth.module.scss'

export default () => {
  const [confirmCode, setConfirmCode] = useState('');
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
	const {get} = useSearchParams()
	const id = get('id');
	const email = get('email');

	const handleSubmitConfirm = async (e:any) => {
    e.preventDefault();
    const response = await axios.post(`${serverUrl}/auth/confirm`, {
      id: id,
      code: confirmCode, 
    })
    if (response.status >= 200) {
      router.push('/auth');
    }
  }

	return (
		<form className = {style.registration_form} onSubmit={handleSubmitConfirm}>
			<h1>Зарегистрироваться</h1>
			<p className={style.description}>Мы отправили письмо с кодом подтверждение на почту {email}</p>
			<div className ={style.form_group}>
				<input
					required 
					id="confirm"
					type="text" 
					value = {confirmCode} 
					onChange = {e=> {setConfirmCode(e.target.value)}}
				/>
				<img src='icons/password.svg'/>
				<label htmlFor='confirm'>
					Код подтверждения
				</label>
			</div>
			<button type = 'submit'>Подтвердить</button>
		</form>
	)
}