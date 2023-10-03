'use client';
import { login } from '@/lib/store/authSlice'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const dispatch = useDispatch();
	const router = useRouter();
	const [textOpacity, setTextOpacity] = useState(0);

	useEffect(() => {
		setTextOpacity(1); 

		const handler = async () => {
			const token = Cookies.get('_tka');
			if (!token) return;

			axios.post(`${serverUrl}/auth/validate`, { token })
				.then((response) => {
					const { token, user } = response.data;
					Cookies.set('_tka', token);
					dispatch(login({ ...user }));
				})
				.catch((err) => {
					console.log(err);
					router.push('/auth');
				});
		}

		handler();


		const hideTextTimeout = setTimeout(() => {
			setTextOpacity(0);
		}, 2000);

		return () => {
			clearTimeout(hideTextTimeout); 
		};
	}, []);

	return (
		<div>
			<h1 className ='welcome_message' style={{ opacity: textOpacity, transition: 'opacity 0.5s' }}> 
				Добро пожаловать на <span style={{color:'blue'}}>EtruxS</span>!
			</h1>
			{children}
		</div>
	);
}
