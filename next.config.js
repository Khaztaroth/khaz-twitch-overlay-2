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
    }
}

module.exports = nextConfig
