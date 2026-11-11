import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    // Place photos from Google, served through the Hano API.
    remotePatterns: [{ protocol: "https", hostname: "api.hano.now", pathname: "/v1/places/google/**" }],
  },
  async redirects() {
    return [
      {
        source: "/sitemap-businesses.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-categories.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-locations.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-blog.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap/:id.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
