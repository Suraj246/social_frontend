/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'social-media-backend-7uko.onrender.com',
                pathname: '/uploads/**',
            },
        ],
        // remotePatterns: [
        //     {
        //         protocol: 'http',
        //         hostname: 'localhost',
        //         port: '4000',
        //         pathname: '/uploads/**',
        //     },
        // ],
    },
};

export default nextConfig;
