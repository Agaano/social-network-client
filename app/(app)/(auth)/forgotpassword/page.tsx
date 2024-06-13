'use client'
import Form from "@/components/ui/form";
import FormInput from "@/components/ui/formInput";
import axios from "axios";
import { useEffect, useState } from "react";
import * as router from "next/navigation";

export default () => {
    const [email, setEmail] = useState("");
    const [expectedCode, setExpectedCode] = useState('');
    const [code, setCode] = useState('');
    const [index, setIndex] = useState(0);
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [message, setMessage] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const rout = router.useRouter();

    function nextForm() {
        setIndex(prev => prev + 1)
        setMessage('');
    }

    async function handleSendCode(e:any) {
        e.preventDefault();
        if (email.trim().length === 0) return;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/
        if (emailRegex.test(email) === false) return;
        const response = await axios.post(serverUrl + '/auth/forgotPassword', {email}, {validateStatus: (s) => s < 500})
        if (response.status < 200 || response.status >= 300) {
            setMessage('Что то пошло не так, попробуйте снова')
            return;
        }
        const code = response.data;
        setExpectedCode(code);
        nextForm();
        return;
    }

    function handleCompareCode(e:any) {
        e.preventDefault();
        console.log(expectedCode)
        console.log(typeof expectedCode)
        console.log(code)
        console.log(typeof code)
        if (expectedCode != code) {
            setMessage("Код подтверждения не совпадает")
            return;
        }
        nextForm();
    }

    async function handleChangePassword(e:any) {
        e.preventDefault();
        if (password !== repeatPassword) {
            setMessage('Пароли не совпадают')
            return;
        }
        const response = await axios.post(serverUrl + '/auth/changePassword', {userId: email, password}, {validateStatus: (s) => s < 500})
        if (response.status < 200 || response.status >= 300) {
            setMessage('Что то пошло не так, попробуйте снова')
            return;
        } else {
            rout.push('/auth');
        }
    }

    const states = [
        () => (
            <Form
                onSubmit={handleSendCode}
                title="Восстановление пароля"
                buttonText="Отправить"
                description={`Введите свой адрес электронной почты что бы мы могли отправить вам код подтверждения`}
                additionalEl = {(
                    <p>
                        {message}
                    </p>
                )}
            >
                <FormInput
                    onChange={(e: any) => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                    title="Адрес электронной почты"
                    id="email"
                    src="icons/email.svg"
                />
            </Form>
        ),
        () => (
            <Form
                onSubmit={handleCompareCode}
                title="Подтвердждение кода"
                buttonText="Подтвердить"
                description={`Мы отправили письмо с кодом подтверждение на почту ${email}`}
                additionalEl= {(
                    <p>
                        {message}
                    </p>
                )}
            >
                <FormInput
                    onChange={(e: any) => {
                        setCode(e.target.value);
                    }}
                    value={code}
                    title="Код подтверждения"
                    id="confirm"
                    src="icons/password.svg"
                />
            </Form>
        ),
        () => (
            <Form
                onSubmit={handleChangePassword}
                title="Изменить пароль"
                buttonText="Изменить"
                description={`Выберите пароль который не забудете!`}
            >
                <FormInput
                    onChange={(e: any) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    title="Новый пароль"
                    id="password"
                    src="icons/password.svg"
                />
                <FormInput
                    onChange={(e: any) => {
                        setRepeatPassword(e.target.value);
                    }}
                    value={repeatPassword}
                    title="Повторите пароль"
                    id="repeat"
                    src="icons/password.svg"
                />
            </Form>
        ),
    ]

    if (loading) return 

    return states[index]()
}