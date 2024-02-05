/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const pkg = require("./package.json");

const mfConfig = {
  name: "apc",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./Setup": "./src/pages/setup/index.tsx",
    "./Dashboard": "./src/pages/dashboard/index.tsx",
    "./Sample": "./src/pages/sample/index.tsx",
    "./page-map": "./src/page-map.ts",
  },
  shared: {
    "next/config": {
      singleton: true,
      eager: true,
      requiredVersion: pkg.dependencies["next"],
    },
  },
  extraOptions: {
    asyncBoundary: true,
  },
};

const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins = [...config.plugins, new NextFederationPlugin(mfConfig)];
    }

    return config;
  },
};
