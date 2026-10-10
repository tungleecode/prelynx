import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Helps bundle analyzer identify large deps
  turbopack: {
    resolveAlias: {
      "async_hooks": "node:async_hooks",
    },
  },
  // Only run Prisma client in Node.js context, not the Edge bundle
  serverExternalPackages: ["@tidbcloud/serverless"],
};

export default nextConfig;
