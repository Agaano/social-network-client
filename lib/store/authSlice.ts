import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export interface IUser {
	id: number
	email: string
	username: string
	avatar: string
	service: object
}

const initialState: {
	isAuthenticated: boolean
	user: IUser | null
	refresh: boolean
} = {
	isAuthenticated: false,
	user: null,
	refresh: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<any>) => {
			state.isAuthenticated = true
			state.user = action.payload
		},
		logout: state => {
			Cookies.remove('token')
			state.isAuthenticated = false
			state.user = null
		},
		refresh: state => {
			state.refresh = !state.refresh
		},
	},
})

export const { login, logout, refresh } = authSlice.actions
export default authSlice.reducer
