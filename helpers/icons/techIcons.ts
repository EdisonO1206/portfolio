import { IconType } from "react-icons"

import {
  FaReact, FaNodeJs, FaPython, FaJava, FaPhp, FaLaravel,
  FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaAws
} from "react-icons/fa"

import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiMongodb, SiPostgresql, SiMysql, SiFirebase,
  SiExpress, SiFastapi, SiDjango, SiFlask,
  SiRedux, SiVite, SiWebpack,
  SiGraphql, SiPrisma,
  SiBootstrap, SiSass,
  SiKubernetes, SiGooglecloud,
  SiVercel, SiNetlify,
  SiSupabase, SiRedis,
  SiJest, SiCypress,
  SiLinux, SiNginx,
  SiElectron, SiExpo,
  SiTensorflow, SiPytorch,
  SiWordpress, SiShopify,
  SiRust, SiGo, SiCplusplus,
} from "react-icons/si"

type TechItem = {
  icon: IconType
  color: string
}

export const techIcons: Record<string, TechItem> = {

  // 🌐 Frontend
  react: { icon: FaReact, color: "#61DBFB" },
  "next.js": { icon: SiNextdotjs, color: "#ffffff" },
  next: { icon: SiNextdotjs, color: "#ffffff" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  bootstrap: { icon: SiBootstrap, color: "#7C3AED" },
  sass: { icon: SiSass, color: "#F472B6" },
  html: { icon: FaHtml5, color: "#F97316" },
  css: { icon: FaCss3Alt, color: "#3B82F6" },
  javascript: { icon: SiJavascript, color: "#FACC15" },
  typescript: { icon: SiTypescript, color: "#2563EB" },
  redux: { icon: SiRedux, color: "#A855F7" },
  vite: { icon: SiVite, color: "#A855F7" },
  webpack: { icon: SiWebpack, color: "#60A5FA" },

  // ⚙️ Backend
  node: { icon: FaNodeJs, color: "#22C55E" },
  "node.js": { icon: FaNodeJs, color: "#22C55E" },
  express: { icon: SiExpress, color: "#D1D5DB" },
  fastapi: { icon: SiFastapi, color: "#10B981" },
  django: { icon: SiDjango, color: "#166534" },
  flask: { icon: SiFlask, color: "#E5E7EB" },
  laravel: { icon: FaLaravel, color: "#EF4444" },
  php: { icon: FaPhp, color: "#818CF8" },
  java: { icon: FaJava, color: "#DC2626" },
  python: { icon: FaPython, color: "#FACC15" },
  "c++": { icon: SiCplusplus, color: "#3B82F6" },
  go: { icon: SiGo, color: "#22D3EE" },
  rust: { icon: SiRust, color: "#EA580C" },

  // 🗄️ Bases de datos
  mongodb: { icon: SiMongodb, color: "#22C55E" },
  postgres: { icon: SiPostgresql, color: "#3B82F6" },
  postgresql: { icon: SiPostgresql, color: "#3B82F6" },
  mysql: { icon: SiMysql, color: "#60A5FA" },
  firebase: { icon: SiFirebase, color: "#FACC15" },
  supabase: { icon: SiSupabase, color: "#22C55E" },
  redis: { icon: SiRedis, color: "#EF4444" },

  // ☁️ DevOps
  docker: { icon: FaDocker, color: "#60A5FA" },
  kubernetes: { icon: SiKubernetes, color: "#2563EB" },
  aws: { icon: FaAws, color: "#FB923C" },
  gcp: { icon: SiGooglecloud, color: "#F87171" },
  vercel: { icon: SiVercel, color: "#ffffff" },
  netlify: { icon: SiNetlify, color: "#2DD4BF" },
  nginx: { icon: SiNginx, color: "#22C55E" },
  linux: { icon: SiLinux, color: "#FACC15" },
  git: { icon: FaGitAlt, color: "#F97316" },

  // 🧪 Testing
  jest: { icon: SiJest, color: "#EF4444" },
  cypress: { icon: SiCypress, color: "#10B981" },

  // 🧩 Otros
  graphql: { icon: SiGraphql, color: "#EC4899" },
  prisma: { icon: SiPrisma, color: "#ffffff" },
  electron: { icon: SiElectron, color: "#67E8F9" },
  expo: { icon: SiExpo, color: "#ffffff" },
  tensorflow: { icon: SiTensorflow, color: "#F97316" },
  pytorch: { icon: SiPytorch, color: "#EF4444" },
  wordpress: { icon: SiWordpress, color: "#2563EB" },
  shopify: { icon: SiShopify, color: "#22C55E" },
}

export const getTechList = (technologies: string) => {
    return technologies.toLowerCase().split(",").map(t => techIcons[t.trim()]).filter(Boolean)
}