/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
	images: {
		remotePatterns: [
			{protocol: 'https', hostname: 'webcademy.ru'}
		]
	}
};

export default nextConfig;
