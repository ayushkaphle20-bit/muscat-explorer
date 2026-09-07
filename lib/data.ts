import "server-only";
import fs from "fs";
import path from "path";
import type {
  Destination,
  Category,
  Experience,
  Comparison,
  BlogPost,
  AdSlot,
  SiteConfig,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJson<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// ---------- Destinations ----------
export function getDestinations(): Destination[] {
  return readJson<Destination[]>("destinations.json");
}
export function getDestination(slug: string): Destination | undefined {
  return getDestinations().find((d) => d.slug === slug);
}

// ---------- Categories ----------
export function getCategories(): Category[] {
  return readJson<Category[]>("categories.json");
}
export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

// ---------- Experiences ----------
export function getExperiences(): Experience[] {
  return readJson<Experience[]>("experiences.json");
}
export function getExperience(slug: string): Experience | undefined {
  return getExperiences().find((e) => e.slug === slug);
}
export function getExperiencesByCategory(categorySlug: string): Experience[] {
  return getExperiences().filter((e) => e.categories.includes(categorySlug));
}
export function getFeaturedExperiences(): Experience[] {
  return getExperiences().filter((e) => e.featured);
}
export function saveExperiences(experiences: Experience[]): void {
  writeJson("experiences.json", experiences);
}

// ---------- Comparisons ----------
export function getComparisons(): Comparison[] {
  return readJson<Comparison[]>("comparisons.json");
}
export function getComparison(slug: string): Comparison | undefined {
  return getComparisons().find((c) => c.slug === slug);
}
export function saveComparisons(comparisons: Comparison[]): void {
  writeJson("comparisons.json", comparisons);
}

// ---------- Blog ----------
export function getBlogPosts(): BlogPost[] {
  return readJson<BlogPost[]>("blog.json").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}
export function saveBlogPosts(posts: BlogPost[]): void {
  writeJson("blog.json", posts);
}

// ---------- Ad slots ----------
export function getAdSlots(): AdSlot[] {
  return readJson<AdSlot[]>("adSlots.json");
}
export function getAdSlot(id: string): AdSlot | undefined {
  return getAdSlots().find((s) => s.id === id);
}
export function saveAdSlots(slots: AdSlot[]): void {
  writeJson("adSlots.json", slots);
}

// ---------- Site config ----------
export function getSiteConfig(): SiteConfig {
  return readJson<SiteConfig>("siteConfig.json");
}
export function saveSiteConfig(config: SiteConfig): void {
  writeJson("siteConfig.json", config);
}
