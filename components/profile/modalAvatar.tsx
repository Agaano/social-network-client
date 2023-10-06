'use client'
import { refresh } from '@/lib/store/authSlice'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { BsUpload } from 'react-icons/bs'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import Button from '../ui/button'
import styles from './profile.module.scss'

export default ({
  isOpen,
  userId,
  onRequestClose,
  reloadPage
}: {
  isOpen: any;
  userId: string;
  onRequestClose: any;
  reloadPage: any;
}) => {
	const [file, setFile] = useState<File>();
	const [preview, setPreview] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	
	const handleUpload = (e:any) => {
		if (e.target.files[0].size > (1000 * 1000 * 5)) {
			setMessage('Размер файла не должен превышать 5мб')
			setPreview('');
			setFile(undefined);
			e.target.value = [];
			return;
		}
		setMessage('');
		setFile(e.target.files[0]);
		handlePreview();
	}

	const handlePreview = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

	const handleSubmit = async (e:any) => {
		e.preventDefault();
		if (!!file) {
			setLoading(true);
			const data = new FormData();
			data.append('file', file); 
			data.append('id', userId);
			const response = await axios.post(`${serverUrl}/profile/upload/photo`, data); 
			dispatch(refresh());
			console.log(response.status);
			setLoading(false);
			onRequestClose();
		}
	}

	useEffect(() => {handlePreview()}, [file])

	return (
		<Modal
		ariaHideApp={false}
		isOpen={isOpen}
		className={styles.modalcontent}
		overlayClassName={styles.modal_overlay} 
		onRequestClose={() => onRequestClose()}
	  >
		<form>
		  <h1>Загрузите фото профиля</h1>
		  <p className={styles.error}>{message}</p>
			{file && <h2>Предпросмотр:</h2>}
		  <label htmlFor="fileInput" className={styles.upload_button}>
				{
				file ?
					<img className = 'avatar' src = {preview}/>
				:
				<div>
					<IconContext.Provider value = {{size: '70px'}}>
						<BsUpload/>
					</IconContext.Provider>
				</div>
				}
		  </label>
		  <input
			id="fileInput"
			type="file"
			accept="image/jpeg, image/png"
			multiple={false}
			onChange={handleUpload}
			style={{display: 'none'}}
		  />
			<Button onClick = {handleSubmit}>
				Загрузить
			</Button>
		</form>
	  </Modal>
		)
}