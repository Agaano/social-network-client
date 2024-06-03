import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Socket, io } from 'socket.io-client'

type initialType = {
	socket?: Socket
	connected: boolean
}

const initialState: initialType = {
	connected: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		connect: (state, action: PayloadAction<{ url: string }>) => {
			if (!state.socket) {
				//@ts-ignore
				state.socket = io(action.payload.url)
			}
		},
	},
})

export const { connect } = authSlice.actions
export default authSlice.reducer
