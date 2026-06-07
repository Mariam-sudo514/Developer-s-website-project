/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{protocol: 'https', hostname: 'webcademy.ru'}
		]
	}
};

export default nextConfig;
