const nextConfig = {
  reactStrictMode: true,

  experimental: {},

  // 🚨 FIX: stop Next from downloading Google Fonts during build
  optimizeFonts: false,
};

export default nextConfig;