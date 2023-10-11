import { io } from 'socket.io-client'

export default () => {
	// @ts-ignore
	if (!globalThis.server) globalThis.server = io(process.env.NEXT_PUBLIC_SERVER_URL + '/chat'); console.log(globalThis.server)
	// @ts-ignore
	return globalThis.server
}