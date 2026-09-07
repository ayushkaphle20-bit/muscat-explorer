"use server";

import { revalidatePath } from "next/cache";
import {
  getExperiences,
  saveExperiences,
  getComparisons,
  saveComparisons,
  getBlogPosts,
  saveBlogPosts,
  getAdSlots,
  saveAdSlots,
  getSiteConfig,
  saveSiteConfig,
} from "@/lib/data";
import type { Experience, Comparison, BlogPost } from "@/lib/types";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

// ---------------- Experiences ----------------

export async function saveExperienceAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Name is required");

  const experiences = getExperiences();
  const isNew = !id;

  const base: Experience = {
    id: id || `exp-${Date.now()}`,
    slug: (formData.get("slug") as string)?.trim() || slugify(name),
    destination: (formData.get("destination") as string) || "muscat",
    categories: String(formData.get("categories") || "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean),
    name,
    shortDescription: String(formData.get("shortDescription") || ""),
    fullDescription: String(formData.get("fullDescription") || ""),
    highlights: String(formData.get("highlights") || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    included: String(formData.get("included") || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    excluded: String(formData.get("excluded") || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    meetingPoint: String(formData.get("meetingPoint") || ""),
    cancellationPolicy: String(formData.get("cancellationPolicy") || ""),
    faq: isNew ? [] : experiences.find((e) => e.id === id)?.faq || [],
    rating: parseFloat(String(formData.get("rating") || "4.5")),
    reviewCount: parseInt(String(formData.get("reviewCount") || "0"), 10),
    duration: String(formData.get("duration") || ""),
    price: parseFloat(String(formData.get("price") || "0")),
    currency: String(formData.get("currency") || "OMR"),
    provider: String(formData.get("provider") || "GetYourGuide"),
    affiliateUrl: String(formData.get("affiliateUrl") || "#"),
    image: `/images/experiences/${slugify(name)}.jpg`,
    gallery: isNew ? [] : experiences.find((e) => e.id === id)?.gallery || [],
    featured: formData.get("featured") === "on",
    bestOverall: formData.get("bestOverall") === "on",
    bestBudget: formData.get("bestBudget") === "on",
    bestFamily: formData.get("bestFamily") === "on",
    bestPrivate: formData.get("bestPrivate") === "on",
    bestLuxury: formData.get("bestLuxury") === "on",
    isDemoData: isNew ? true : experiences.find((e) => e.id === id)?.isDemoData ?? true,
  };

  const next = isNew
    ? [...experiences, base]
    : experiences.map((e) => (e.id === id ? base : e));

  saveExperiences(next);
  revalidateSite();
  revalidatePath("/admin/experiences");
}

export async function deleteExperienceAction(formData: FormData) {
  const id = String(formData.get("id"));
  const experiences = getExperiences().filter((e) => e.id !== id);
  saveExperiences(experiences);
  revalidateSite();
  revalidatePath("/admin/experiences");
}

// ---------------- Comparisons ----------------

export async function saveComparisonAction(formData: FormData) {
  const originalSlug = formData.get("originalSlug") as string | null;
  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Title is required");

  const comparisons = getComparisons();
  const isNew = !originalSlug;

  const comparison: Comparison = {
    slug: (formData.get("slug") as string)?.trim() || slugify(title),
    title,
    metaDescription: String(formData.get("metaDescription") || ""),
    intro: String(formData.get("intro") || ""),
    experienceSlugs: String(formData.get("experienceSlugs") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  const next = isNew
    ? [...comparisons, comparison]
    : comparisons.map((c) => (c.slug === originalSlug ? comparison : c));

  saveComparisons(next);
  revalidateSite();
  revalidatePath("/admin/comparisons");
}

export async function deleteComparisonAction(formData: FormData) {
  const slug = String(formData.get("slug"));
  saveComparisons(getComparisons().filter((c) => c.slug !== slug));
  revalidateSite();
  revalidatePath("/admin/comparisons");
}

// ---------------- Blog ----------------

export async function saveBlogPostAction(formData: FormData) {
  const originalSlug = formData.get("originalSlug") as string | null;
  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Title is required");

  const posts = getBlogPosts();
  const isNew = !originalSlug;
  const existing = isNew ? undefined : posts.find((p) => p.slug === originalSlug);

  // Body content: simple format, one section per blank-line-separated block,
  // first line of each block is the heading (prefixed with "## ").
  const bodyRaw = String(formData.get("body") || "");
  const sections = bodyRaw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n");
      const heading = lines[0].replace(/^##\s*/, "").trim();
      const content = lines.slice(1).join(" ").trim();
      return { heading, content };
    });

  const post: BlogPost = {
    slug: (formData.get("slug") as string)?.trim() || slugify(title),
    title,
    metaTitle: String(formData.get("metaTitle") || title),
    metaDescription: String(formData.get("metaDescription") || ""),
    author: String(formData.get("author") || "Muscat Explorer Editorial Team"),
    date: String(formData.get("date") || new Date().toISOString().slice(0, 10)),
    image: existing?.image || `/images/blog/${slugify(title)}.jpg`,
    excerpt: String(formData.get("excerpt") || ""),
    sections: sections.length ? sections : existing?.sections || [],
    faq: existing?.faq || [],
    relatedSlugs: String(formData.get("relatedSlugs") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    internalCategoryLinks: String(formData.get("internalCategoryLinks") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    comparisonSlug: (formData.get("comparisonSlug") as string) || undefined,
  };

  const next = isNew
    ? [...posts, post]
    : posts.map((p) => (p.slug === originalSlug ? post : p));

  saveBlogPosts(next);
  revalidateSite();
  revalidatePath("/admin/blog");
}

export async function deleteBlogPostAction(formData: FormData) {
  const slug = String(formData.get("slug"));
  saveBlogPosts(getBlogPosts().filter((p) => p.slug !== slug));
  revalidateSite();
  revalidatePath("/admin/blog");
}

// ---------------- Ad slots ----------------

export async function updateAdSlotsAction(formData: FormData) {
  const slots = getAdSlots().map((slot) => ({
    ...slot,
    enabled: formData.get(`enabled-${slot.id}`) === "on",
    adSenseSlotId: String(formData.get(`adSenseSlotId-${slot.id}`) || ""),
  }));
  saveAdSlots(slots);
  revalidateSite();
  revalidatePath("/admin/advertising");
}

// ---------------- Site config ----------------

export async function updateSiteConfigAction(formData: FormData) {
  const config = getSiteConfig();
  config.brandName = String(formData.get("brandName") || config.brandName);
  config.tagline = String(formData.get("tagline") || config.tagline);
  config.domain = String(formData.get("domain") || config.domain);
  config.supportEmail = String(formData.get("supportEmail") || config.supportEmail);
  config.integrations.googleAnalyticsId = String(formData.get("googleAnalyticsId") || "");
  config.integrations.googleTagManagerId = String(formData.get("googleTagManagerId") || "");
  config.integrations.googleSearchConsoleVerification = String(
    formData.get("googleSearchConsoleVerification") || ""
  );
  config.integrations.adSenseClientId = String(formData.get("adSenseClientId") || "");
  saveSiteConfig(config);
  revalidateSite();
  revalidatePath("/admin/settings");
}
