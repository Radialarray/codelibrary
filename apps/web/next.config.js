/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [process.env.API_IMAGE_HOST]
	},
	output: 'standalone'
};
