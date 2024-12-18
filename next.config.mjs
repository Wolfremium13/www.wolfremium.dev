const nextConfig = {
    async redirects() {
        return [
            {
                source: "/blog",
                destination: "/blog/page/1",
                permanent: true,
            },

        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com'
            }
        ],
    },
}

export default nextConfig;