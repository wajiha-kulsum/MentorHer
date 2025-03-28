/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            'bufferutil': 'bufferutil',
            'utf-8-validate': 'utf-8-validate',
        });
        return config;
    },
    async headers() {
        return [
            {
                source: "/api/socket",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
                ]
            }
        ];
    }
};

module.exports = nextConfig;