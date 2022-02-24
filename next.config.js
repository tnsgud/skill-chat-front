/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        destination: `${process.env.NEXT_PUBLIC_PREFIX_DEV}/:path*`,
        source: '/',
      },
    ];
  },
  reactStrictMode: true,
};
