import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../store/socketSlice'
import { RootState } from '../store/store'

export default function useSocket() {
	const { socket } = useSelector((state: RootState) => state.socket)
	const dispatch = useDispatch()
	const connectSocket = () => {
		dispatch(connect({ url: process.env.NEXT_PUBLIC_SERVER_URL ?? '' }))
	}
	if (!socket) connectSocket()
	return { socket }
}
