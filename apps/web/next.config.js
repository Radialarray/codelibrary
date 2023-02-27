/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [process.env.API_IMAGE_HOST]
	},
	output: 'standalone',
	experimental: {appDir: true}
	// TODO: remove from production
	// typescript: {
	// 	// !! WARN !!
	// 	// Dangerously allow production builds to successfully complete even if
	// 	// your project has type errors.
	// 	// !! WARN !!
	// 	ignoreBuildErrors: true
	// }
};
