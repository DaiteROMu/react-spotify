/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'links.papareact.com',
            'i.scdn.co',
            'dailymix-images.scdn.co',
        ],
    },
};

module.exports = nextConfig;
