/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Azure Storage static website hosting
  output: 'export',
  trailingSlash: true,
  images: {
    // next/image optimisation is incompatible with static export;
    // use a real CDN or swap to a plain <img> when you add your avatar photo
    unoptimized: true,
  },
}

module.exports = nextConfig
