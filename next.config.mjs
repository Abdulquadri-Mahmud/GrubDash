/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", // ✅ not 'export'
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;
