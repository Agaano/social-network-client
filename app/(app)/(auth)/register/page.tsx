'use client';
import axios from 'axios'
import Link from 'next/link'
import * as router from 'next/navigation'
import { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import style from '../auth.module.scss'

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const rout = router.useRouter();

  const [loading, setLoading] = useState(false);

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const [serviceFormData, setServiceFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setServiceFormData({...serviceFormData, [name]: ''})
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
    if (emailRegex.test(formData.email) === false) {
      setServiceFormData(prev => ({...prev, email: 'Введите корректный email'}))
      setLoading(false);
      return
    }
    if (formData.password.length < 6 || formData.password.length > 25) {
      setServiceFormData(prev => ({...prev, password: 'Длина пароля должна быть от 6 до 25 символов'}))
      setLoading(false);
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setServiceFormData(prev => ({...prev, confirmPassword: 'Пароли должны совпадать!'}))
      setLoading(false);
      return
    }

    const response = await axios.post(`${serverUrl}/auth/signup`, {
      ...formData,
      confirmPassword: undefined
    })
    if (response.status >= 200 && response.status < 300) {
      rout.push(`/confirm?id=${response.data.id}&email=${response.data.email}`)
    }
    setLoading(false);
  };
  
  return (
    <form className={style.registration_form} onSubmit={handleSubmit}>
      <h1>Зарегистрироваться</h1>
      <p className={style.description}>Мы всегда рады новым лицам!</p>
      <div className={style.form_group}>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <img
          data-tooltip-content={'Ваше отображаемое имя'}
          data-tooltip-id='usernameTooltip'
          data-tooltip-place='top-start'  
          src='icons/profile.svg'/>
        <label htmlFor="username">{serviceFormData.username && formData.username ? <span className={style.error}>{serviceFormData.username}</span> : 'Имя пользователя'}</label>
        <Tooltip id = 'usernameTooltip'/>
      </div>
      <div className={style.form_group}>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <img
          data-tooltip-content={'Мы попросим вас подтвердить вашу почту позже'}
          data-tooltip-id='emailTooltip'
          data-tooltip-place='top-start' 
          src ='icons/email.svg'/>
        <label htmlFor="email">{serviceFormData.email && formData.email ? <span className={style.error}>{serviceFormData.email}</span> : 'Email'}</label>
        <Tooltip id = 'emailTooltip'/>
      </div>
      <div className={style.form_group}>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <img
          data-tooltip-content={'Пароль должен содержать от 6 до 25 символов'}
          data-tooltip-id='passwordTooltip'
          data-tooltip-place='top-start'
          src='icons/password.svg'
        />
        <label htmlFor="password">{serviceFormData.password && formData.password ? <span className={style.error}>{serviceFormData.password}</span> : 'Пароль'}</label>
        <Tooltip id = 'passwordTooltip'/>
      </div>
      <div className={style.form_group}>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <img
          data-tooltip-content={'Повторите свой пароль ещё раз что бы не забыть его!'}
          data-tooltip-id='confirmTooltip'
          data-tooltip-place='top-start'  
          src='icons/password.svg'/>
        <label htmlFor="confirmPassword"> {serviceFormData.confirmPassword && formData.confirmPassword ? <span className={style.error}>{serviceFormData.confirmPassword}</span> : 'Подтвердите пароль'}</label>
        <Tooltip id = 'confirmTooltip'/>
      </div>
      <p> Уже есть аккаунт? <b><Link href = '/auth'>Войти</Link></b></p>
      <button disabled = {loading} type="submit">Зарегистрироваться</button>
    </form>
  );
}

