export default () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>
			<defs>
				<linearGradient
					x1='50%'
					y1='0%'
					x2='50%'
					y2='100%'
					id='a'
					gradientTransform='rotate(270)'
				>
					<stop stop-color='hsl(238, 82%, 13%)' offset='0%' />
					<stop stop-color='hsl(0, 0%, 100%)' offset='45%' />
					<stop stop-color='hsl(55, 29%, 86%)' offset='100%' />
				</linearGradient>
			</defs>
			<rect width='100%' height='100%' fill='hsl(238, 82%, 13%)' />
			<g fill='url(#a)'>
				<rect
					width='105'
					height='1'
					x='594.5'
					y='104.5'
					rx='.5'
					transform='rotate(54 647 105)'
					opacity='.79'
				/>
				<rect
					width='80'
					height='1'
					x='164'
					y='718.5'
					rx='.5'
					transform='rotate(54 204 719)'
					opacity='.84'
				/>
				<rect
					width='117'
					height='1'
					x='306.5'
					y='116.5'
					rx='.5'
					transform='rotate(54 365 117)'
					opacity='.51'
				/>
				<rect
					width='90'
					height='1'
					x='664'
					y='336.5'
					rx='.5'
					transform='rotate(54 709 337)'
					opacity='.09'
				/>
				<rect
					width='76'
					height='1'
					x='35'
					y='436.5'
					rx='.5'
					transform='rotate(54 73 437)'
					opacity='.64'
				/>
				<rect
					width='105'
					height='1'
					x='641.5'
					y='637.5'
					rx='.5'
					transform='rotate(54 694 638)'
					opacity='.7'
				/>
				<rect
					width='90'
					height='1'
					x='131'
					y='281.5'
					rx='.5'
					transform='rotate(54 176 282)'
					opacity='.33'
				/>
				<rect
					width='91'
					height='1'
					x='63.5'
					y='92.5'
					rx='.5'
					transform='rotate(54 109 93)'
					opacity='.26'
				/>
				<rect
					width='85'
					height='1'
					x='148.5'
					y='542.5'
					rx='.5'
					transform='rotate(54 191 543)'
					opacity='.93'
				/>
				<rect
					width='117'
					height='1'
					x='413.5'
					y='621.5'
					rx='.5'
					transform='rotate(54 472 622)'
					opacity='.31'
				/>
				<rect
					width='123'
					height='1'
					x='408.5'
					y='344.5'
					rx='.5'
					transform='rotate(54 470 345)'
					opacity='.48'
				/>
				<animate
					attributeName='x'
					to='#000'
					dur='2s'
					repeatCount='indefinite'
					fill='freeze'
				/>
			</g>
		</svg>
	)
}
