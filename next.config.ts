import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/sitemap-businesses.xml",
        destination: "/sitemap/businesses.xml",
        permanent: true,
      },
      {
        source: "/sitemap-categories.xml",
        destination: "/sitemap/categories.xml",
        permanent: true,
      },
      {
        source: "/sitemap-locations.xml",
        destination: "/sitemap/locations.xml",
        permanent: true,
      },
      {
        source: "/sitemap-blog.xml",
        destination: "/sitemap/blog.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
