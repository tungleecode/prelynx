import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "async_hooks": "node:async_hooks",
    },
  },
};

export default nextConfig;
