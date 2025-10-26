import type { NextConfig } from "next";
import { i18nConfig } from "./i18n";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: [...i18nConfig.locales],
    defaultLocale: i18nConfig.defaultLocale,
    localeDetection: false,
  },
};

export default nextConfig;
