import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Uncomment the section below, then "npm run build" a prod static to "/out" folder */
  // distDir: "out",
  // output: "export",
  // images: {
  //   domains: ['badd-dev.local'],
  //   loader: "custom",
  //   loaderFile: './ImageLoader.js'
  // },
  images: {
    domains: ['badd-dev.local'],
  },
  trailingSlash: true,
};

export default nextConfig;
