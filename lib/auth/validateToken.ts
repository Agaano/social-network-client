import axios from 'axios'
import Cookies from 'js-cookie'
import { IUser } from '../store/authSlice'
export default async (): Promise<undefined | IUser> => {
	const token = Cookies.get('token')
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	if (!token) return
	return axios
		.post(`${serverUrl}/auth/validate`, { token })
		.then(response => {
			const { token, user } = response.data
			Cookies.set('token', token, { expires: 1 })
			return user
		})
		.catch(err => {
			console.log(err)
			return
		})
}
