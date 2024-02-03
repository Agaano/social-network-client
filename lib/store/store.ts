import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import socketReducer from './socketSlice'

const rootReducer = combineReducers({
	auth: authReducer,
	socket: socketReducer,
})
export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: false,
		})
	},
})

export default store
