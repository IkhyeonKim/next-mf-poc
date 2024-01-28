/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const pkg = require("./package.json");

const mfConfig = {
  name: "apc",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./Setup": "./src/pages/setup/index.tsx",
    "./SetupComponent": "./src/components/SetupPage.tsx",
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
