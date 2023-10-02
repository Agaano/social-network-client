'use client';
import { login } from '@/lib/store/authSlice'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const handler = async () => {
			const token = Cookies.get('_tka') 
			if (!token) return;
			axios.post(`${serverUrl}/auth/validate`, {token}).then((response) => {
				const {token, user} = response.data;
				Cookies.set('_tka', token);
				dispatch(login({...user}));
			}).catch((err) => {
				console.log(err);
				router.push('/auth');
			})
			
		} 
		handler()
	}, [])

  return <div>
		{children}
	</div>
}