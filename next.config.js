const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  basePath: '/tts-client',
};

export default nextConfig;