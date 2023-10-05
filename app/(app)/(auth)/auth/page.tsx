'use client';

// import { login } from '@/lib/store/authSlice'
import { refresh } from '@/lib/store/authSlice'
import axios from 'axios'
import cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import style from '../auth.module.scss'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

		axios.post('http://localhost:8000/auth/signin', {id: email, password}).then((response) => {
      const {data} = response;
      if (!data.token) {
        router.push(`/confirm?id=${data.id}&email=${data.email}`);
      } else {
        cookies.set('_tka', data.token, {expires: 1});
        dispatch(refresh());
        router.push('/');
      }
    }).catch((err) => {
      if (err.response?.status < 500) setMessage('Неправильное имя пользователя или пароль');
      else  {
        setMessage('Произошла ошибка... Повторите попытку позже')
        console.log(err);
      }
    })
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={style.registration_form}>
      <h1>Войти</h1>
      <p className={style.description}>Присоединяйтесь к нам!</p>
      {message && 
        <p className={style.error}>{message}</p>
      }
      <br></br>
      <div className={style.form_group}>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <img src='icons/profile.svg'/>
        <label htmlFor="email">
          Email или Username
        </label>
      </div>
      <div className={style.form_group}>
        <input
          id="password"
          type="password"
          maxLength={25}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img src='icons/password.svg'/>
        <label htmlFor="password">
          Пароль
        </label>
        <Link className = {style.forgot_password} href = '/forgot'>Забыли пароль?</Link>
      </div>
      <p>Ещё нет аккаунта?<b> <Link href = '/register'>Зарегистрироваться</Link></b></p>
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;