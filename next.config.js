/** @type {import('next').NextConfig} */

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8000',
				pathname: '/**',
			},
		],
	},
}
