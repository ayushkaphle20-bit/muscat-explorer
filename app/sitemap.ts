import type { MetadataRoute } from "next";
import { getCategories, getComparisons, getExperiences, getBlogPosts, getSiteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const base = site.domain;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/search`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/affiliate-disclosure`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = getComparisons().map((c) => ({
    url: `${base}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = getExperiences().map((e) => ({
    url: `${base}/experience/${e.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...comparisonRoutes,
    ...experienceRoutes,
    ...blogRoutes,
  ];
}
