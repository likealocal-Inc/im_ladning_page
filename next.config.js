/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    HTTP_PROTOCAL: process.env.HTTP_PROTOCAL,
    SERVER_IP: process.env.SERVER_IP,
    SERVER_PORT: process.env.SERVER_PORT,
  },
};

module.exports = nextConfig;
