/** @type {import('next').NextConfig} */
module.exports = {
  // basePath: "/tts-client",
  // output: "export",
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
