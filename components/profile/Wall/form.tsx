'use client'
import EmojiPicker from '@emoji-mart/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BsEmojiWink } from 'react-icons/bs'
import { EmojiMartItem } from 'react-input-emoji/dist/src/types/types'

export default ({ styles }: { styles: any }) => {
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const [newPost, setNewPost] = useState({
		title: '',
		text: '',
		loading: false,
	})

	const handleSubmitPost = async (e: any) => {
		e.preventDefault()
		setNewPost((prev: any) => ({ ...prev, loading: true }))
		const token = Cookies.get('token')
		if (!token) return

		if (!(newPost.title.trim().length > 0 || newPost.text.trim().length > 0)) {
			setNewPost({ loading: false, text: '', title: '' })
			return
		}

		const response = await axios.post(serverUrl + '/posts', {
			token: token,
			title: newPost.title,
			text: newPost.text,
		})
		if (response.status >= 200 && response.status < 400) {
			setNewPost({ title: '', text: '', loading: false })
			router.refresh()
		}
	}

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setNewPost({
			...newPost,
			[name]: value,
		})
	}
	useEffect(() => {
		setIsLoading(false)
	}, [])

	const handleEmojiPickup = (emoji: EmojiMartItem) => {
		if (inputRef) {
			inputRef.current?.focus()
			const cursorPosition = inputRef.current?.selectionStart || 0
			setNewPost(prev => {
				return {
					...prev,
					text:
						prev.text.slice(0, cursorPosition) +
						emoji.native +
						prev.text.slice(cursorPosition),
				}
			})
			const newCursorPosition = cursorPosition + emoji.native!.length
			setTimeout(() => {
				inputRef.current?.setSelectionRange(
					newCursorPosition,
					newCursorPosition
				)
			}, 10)
		}
	}

	return (
		<form className={styles.createPost} onSubmit={handleSubmitPost}>
			<div
				style={{
					display: open ? 'block' : 'none',
				}}
				className={styles.emojiPicker}
			>
				<EmojiPicker
					locale='ru'
					onEmojiSelect={handleEmojiPickup}
					title='Pick your emoji'
					emoji='point_up'
					theme='dark'
				/>
			</div>
			<textarea
				ref={inputRef}
				value={newPost.text}
				name='text'
				onChange={handleInputChange}
				placeholder='Содержание'
				autoComplete='off'
				id='messageInput'
			/>
			{!newPost.loading && <button type='submit'>Отправить</button>}
			<button type='button' onClick={() => setOpen(!open)}>
				{open ? 'Скрыть' : <BsEmojiWink />}
			</button>{' '}
		</form>
	)
}
