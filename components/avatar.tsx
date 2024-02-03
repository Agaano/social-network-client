'use client'

import Image from 'next/image'

type Props = {
	src: string
	alt?: string
	width?: number
	height?: number
	onClick?: ((e: any) => void) | undefined
}

export default ({
	src,
	alt = '',
	width = 150,
	height = 150,
	onClick = undefined,
}: Props) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
	if (!src) {
		return <div className={'bg-slate-400 avatar'}></div>
	}
	return (
		<Image
			className='avatar'
			src={serverUrl + src}
			alt={alt}
			width={width}
			height={height}
			onClick={onClick}
			onLoadingComplete={({ width, height, style }) => {
				if (width > height || height > width)
					style.width = `${height.toString()}px`
			}}
		/>
	)
}
