export function ProfilePlaceholder() {
	const styles = {
		background: 'linear-gradient(90deg, #1e1e1e, #121212)',
		color: '#ffffff',
		padding: '30px',
		borderRadius: '20px',
		boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
		maxWidth: '800px',
		margin: '0 auto',
		marginBottom: '15px',
	}

	return (
		<div
			className={`flex flex-col items-center justify-items-center my-20 mx-20`}
			style={styles}
		>
			<div className='animate-pulse rounded-full bg-gray-500 h-[150px] w-[150px]'></div>
			<div className='flex flex-col items-center my-10'>
				<div className='animate-pulse rounded-md bg-gray-500 h-4 w-[100px]'>
					{' '}
				</div>
				<div className='animate-pulse rounded-md my-10 bg-gray-500 h-4 w-[150px]'>
					{' '}
				</div>
			</div>
		</div>
	)
}
export function PostPlaceholder() {
	return (
		<div
			className={`space-y-2 space-x-2`}
			style={{
				position: 'relative',
				width: '100%',
				marginInline: 'auto',
				backgroundColor: '#232323',
				borderRadius: '10px',
				padding: '25px',
				marginBottom: '15px',
			}}
		>
			<div className='space-y-2'>
				<div className='flex items-center space-x-2 '>
					<div className='animate-pulse rounded-full bg-gray-500 h-7 w-7'></div>
					<div className='animate-pulse rounded-md bg-gray-500 h-4 w-[70px]'>
						{' '}
					</div>
				</div>
				<div className='flex flex-col items-center space-y-2 '>
					<div className='animate-pulse rounded-md bg-gray-500 h-4 w-[100px]'>
						{' '}
					</div>
					<div className='animate-pulse rounded-md bg-gray-500 h-4 w-[250px]'>
						{' '}
					</div>
				</div>
				<div className='flex items-center justify-between space-x-2 '>
					<div className='animate-pulse rounded-full bg-gray-500 h-7 w-7'></div>
					<div className='animate-pulse rounded-md bg-gray-500 items-end h-4 w-[100px]'>
						{' '}
					</div>
				</div>
			</div>
		</div>
	)
}
