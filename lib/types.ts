export interface Destination {
  slug: string;
  name: string;
  country: string;
  active: boolean;
  heroImage: string;
  shortDescription: string;
  currency: string;
  timezone: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Experience {
  id: string;
  slug: string;
  destination: string;
  categories: string[];
  name: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  meetingPoint: string;
  cancellationPolicy: string;
  faq: FaqItem[];
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  currency: string;
  provider: string;
  affiliateUrl: string;
  image: string;
  gallery: string[];
  featured: boolean;
  bestOverall: boolean;
  bestBudget: boolean;
  bestFamily: boolean;
  bestPrivate: boolean;
  bestLuxury: boolean;
  isDemoData: boolean;
}

export interface Comparison {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  experienceSlugs: string[];
}

export interface BlogSection {
  heading: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  sections: BlogSection[];
  faq: FaqItem[];
  relatedSlugs: string[];
  internalCategoryLinks: string[];
  comparisonSlug?: string;
}

export interface AdSlot {
  id: string;
  location: string;
  enabled: boolean;
  adSenseSlotId: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  domain: string;
  supportEmail: string;
  defaultDestination: string;
  socials: Record<string, string>;
  integrations: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
    googleSearchConsoleVerification: string;
    adSenseClientId: string;
  };
}
