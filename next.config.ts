// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // → no fallar el build aunque haya warnings o errores de lint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
