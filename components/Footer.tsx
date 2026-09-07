import Link from "next/link";
import { Compass } from "lucide-react";
import { getCategories, getSiteConfig } from "@/lib/data";

export default function Footer() {
  const categories = getCategories();
  const site = getSiteConfig();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-sea)] text-[var(--color-sand)]">
      <div className="container-page py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-sand)] text-[var(--color-sea)]">
              <Compass size={16} />
            </span>
            <span className="font-[family-name:var(--font-fraunces)] text-lg">
              {site.brandName}
            </span>
          </Link>
          <p className="text-sm text-[var(--color-sea-pale)] max-w-sm leading-relaxed">
            {site.tagline} Independent comparisons of tours and experiences in
            Muscat, Oman — we're not affiliated with GetYourGuide, Viator, or
            the Oman Ministry of Heritage and Tourism.
          </p>
          <div className="flex gap-2 mt-5">
            <a
              href={site.socials.instagram}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/25 text-xs opacity-80 hover:opacity-100"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href={site.socials.facebook}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/25 text-xs opacity-80 hover:opacity-100"
              aria-label="Facebook"
            >
              FB
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-[var(--color-brass-pale)]">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm text-[var(--color-sea-pale)]">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-[var(--color-brass-pale)]">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm text-[var(--color-sea-pale)]">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">Guides</Link>
            </li>
            <li>
              <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[var(--color-sea-pale)]">
          <p>© {new Date().getFullYear()} {site.brandName}. All rights reserved.</p>
          <p>
            {site.brandName} may earn a commission when you book through links
            on this site, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
