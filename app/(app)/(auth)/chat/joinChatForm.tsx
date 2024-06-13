'use client';

import axios from "axios";
import * as router from "next/navigation";
import { useState } from "react";


export default ({token} : {token : string}) => {
    const [id, setId] = useState<undefined | number>();
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
    const rout = router.useRouter();
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!id) return;
        const response = await axios.post(serverUrl + `/rooms/join`, {
            token: token,
            roomId: id,
        })
        if (response.status >= 200 && response.status < 300) {
            rout.refresh();
        }
        alert("Что то пошло не так...")
    }


    return (
        <form onSubmit={handleSubmit} style = {{display: "flex", flexDirection: "column", width: "50%", justifyContent: "flex-start", alignItems: 'flex-start'}}>
            <label htmlFor = "id">Вступить в чат по идентификатору:</label>
            <input style = {{color: 'black'}} value = {id} onChange={(e) => setId(+e.target.value)} id = "id"/>
            <button type = "submit">Вступить</button>
        </form>
    )
}