import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['encrypted-tbn0.gstatic.com'], // 👈 agrega el dominio permitido
  },
};

export default nextConfig;