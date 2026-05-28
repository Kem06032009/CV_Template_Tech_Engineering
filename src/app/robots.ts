import type { MetadataRoute } from "next";
import { appConfig } from "@/config";

export default function robots(): MetadataRoute.Robots {
  if (appConfig.blockSearchIndexing) {
    return {
      rules: [
        { userAgent: "*", disallow: "/" },
        { userAgent: "Googlebot", disallow: "/" },
        { userAgent: "Googlebot-Image", disallow: "/" },
        { userAgent: "Bingbot", disallow: "/" },
      ],
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
