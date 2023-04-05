/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [process.env.API_IMAGE_HOST],
		unoptimized: true
	},
	output: 'standalone',
	experimental: {appDir: true}
};
