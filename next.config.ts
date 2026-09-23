import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // The root layout lives in app/[lang], so unmatched URLs need their own
    // self-contained 404 page (app/global-not-found.tsx).
    globalNotFound: true,
  },
  // English is the default and is served at the site root; /en only exists
  // internally, and visiting it directly lands on the canonical root URL.
  async rewrites() {
    return [{ source: "/", destination: "/en" }];
  },
  async redirects() {
    return [{ source: "/en", destination: "/", permanent: true }];
  },
};

export default nextConfig;
