import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
