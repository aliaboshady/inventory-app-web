import type { NextConfig } from "next";
import { i18nConfig } from "./i18n";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: [...i18nConfig.locales],
    defaultLocale: i18nConfig.defaultLocale,
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // ✅ any Supabase project
        pathname: "/storage/v1/object/public/**", // ✅ any public file
      },
    ],
  },
};

export default nextConfig;
