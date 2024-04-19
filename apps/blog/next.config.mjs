/** @type {import('next').NextConfig} */
const nextConfig = {
  //  images: {
  //    domains: [
  //      "res.cloudinary.com",
  //      "images.unsplash.com",
  //      "media.istockphoto.com",
  //      "saigontechnology.com",
  //      "via.placeholder.com",
  //      "upload.wikimedia.org",
  //    ],
  //  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
