'use client'
import { RootState } from '@/lib/store/store'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import * as router from 'next/navigation'

enum friendshipStatus {
	friend,
	application,
	none,
	null,
}

export default ({ id }: { id: number }) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
    const [isBlocked, setIsBlocked] = useState(false);
	const { user } = useSelector((state: RootState) => state.auth)
    const rout = router.useRouter();

    useEffect(() => {
        (async () => {
            if (!user || !user?.isAdmin) return;
            const thisUser = (await axios.get(`${serverUrl}/user/${id}`)).data
            setIsBlocked(thisUser?.service?.['blocked'])
        })()
    }, [user])

    async function handleBlockUser() {
        if (!user || !user?.isAdmin) return;
        const token = Cookies.get('token')
        if (isBlocked) {
            const response = await axios.post(serverUrl + '/user/unblock', {
                token,
                userId: id,
            }, {validateStatus: (status) => status < 500})
            if (response.status >= 300 && response.status < 200) return;
            setIsBlocked(false);
            rout.refresh();
        } else {
            const response = await axios.post(serverUrl + '/user/block', {
                token,
                userId: id,
            }, {validateStatus: (status) => status < 500})
            if (response.status >= 300 && response.status < 200) return;
            setIsBlocked(true);
            rout.refresh();
        }
    }

    if (!user?.isAdmin) return <></>
    if (user?.isAdmin) 
        return <button onClick={handleBlockUser}>{isBlocked ? "Разблокировать пользователя" : "Заблокировать пользователя"}</button>
}
