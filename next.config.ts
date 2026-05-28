import type { NextConfig } from "next";
import { appConfig } from "./src/config";

/** CSP: không cho trình duyệt tải script/font/API từ Google */
function buildContentSecurityPolicy(): string {
  const connectSrc = ["'self'", "https://api.mymemory.translated.net"];
  const isDev = process.env.NODE_ENV !== "production";

  const directives: string[] = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob: https:",
    `connect-src ${connectSrc.join(" ")}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  return directives.join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "interest-cohort=(), browsing-topics=()",
  },
  ...(appConfig.blockSearchIndexing
    ? [
        {
          key: "X-Robots-Tag",
          value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
