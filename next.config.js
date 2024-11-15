/** @type {import('next').NextConfig} */
module.exports = {
  // basePath: "/tts-client",
  // output: "export",
  async rewrites() {
    return [
      {
        source: '/api/ttm/:path*',
        destination: 'http://haihoanghorse.io.vn/v2/api/ttm/:path*'
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };
    return config;
  },
}
