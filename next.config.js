/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns : [
            {
                protocol: 'https',
                hostname: '**.jtvnw.net'
            },
            {
                protocol: 'https',
                hostname: '**.fossabot.com'
            }
        ]
    },
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
    }
}

module.exports = nextConfig
