import style from './burger.module.scss'

export default ({open, setIsOpen} : {open: boolean, setIsOpen:any}) => {
	return (
		<aside className = {`${style.burger} ${open && style.active}`}>
			<nav className= {style.sidebar}>
				<ul>
					<li>На главную</li>
					<li>Авторизация</li>
					<li>Регистрация</li>
					<li>Профиль</li>
					<li>Чаты</li>
				</ul>
			</nav>
		</aside>
	)
}