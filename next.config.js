/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		typedRoutes: true,
	},
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg')
		)

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: {not: /\.(css|scss|sass)$/},
				resourceQuery: {not: /url/}, // exclude if *.svg?url
				loader: '@svgr/webpack',
				options: {
					dimensions: false,
					titleProp: true,
				},
			}
		)

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
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
    output: 'export',
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
    }
}

module.exports = nextConfig
