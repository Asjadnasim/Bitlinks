/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['avatars.githubusercontent.com'],
	},
};

export default nextConfig;
