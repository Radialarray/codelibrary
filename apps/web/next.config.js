/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [process.env.API_IMAGE_HOST]
	}
};

export default nextConfig;
