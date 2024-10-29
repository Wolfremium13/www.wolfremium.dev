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
}