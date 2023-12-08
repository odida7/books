/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['res.cloudinary.com', 'www.bing.com', 'cloudinary.com', 'cloudinary']
    },
}

module.exports = nextConfig
