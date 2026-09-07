# Muscat Explorer

Discover Muscat. Compare experiences. Book with confidence.

A working affiliate travel-comparison website for Muscat, Oman, built with
Next.js 16 (App Router), TypeScript and Tailwind CSS. It includes public
pages (home, categories, comparisons, experience details, blog/SEO content,
legal pages), a password-protected admin dashboard for managing all content,
and integration points for Google Analytics, Search Console, AdSense, and
GetYourGuide/Viator affiliate links.

**Everything in this repo is real, working code — not a mockup.** All demo
pricing, ratings and review counts are clearly labeled `isDemoData: true` and
must be replaced with live data before launch (see "Going live" below).

---

## 1. Running it locally

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.local.example .env.local   # then edit ADMIN_PASSWORD
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin` for the admin dashboard (default password
`changeme` — **change this** in `.env.local` before you do anything else).

To build and run a production server locally:

```bash
npm run build
npm run start
```

---

## 2. How content is stored (important)

There is no database in this starter. All content — experiences, categories,
comparison pages, blog posts, ad slot settings and site config — lives in
plain JSON files under `/data`, and the admin dashboard's "Save" buttons
write directly back to those files on disk (see `lib/data.ts`).

This is intentionally simple so you can read, review and hand-edit every
piece of content directly, and so the whole site works with zero external
services out of the box.

**The trade-off:** most serverless hosts (Vercel, Netlify serverless
functions, etc.) run on a read-only or ephemeral filesystem in production.
Edits made through `/admin` will work when:
- Running locally (`npm run dev` / `npm run start`), or
- Deployed to a host with a persistent, writable filesystem (a VPS, a Docker
  container on Railway/Render/Fly.io with a persistent volume, etc.)

If you deploy to Vercel and want the admin dashboard to keep working there,
migrate `lib/data.ts` to a real database before launch — the function
signatures (`getExperiences`, `saveExperiences`, etc.) are written so you can
swap the file-based implementation for a Postgres/Supabase/PlanetScale-backed
one without touching any page or component code. Until then, you can still
edit the JSON files directly and redeploy.

---

## 3. Project structure

```
app/
  (site)/            Public pages — home, categories, comparisons, blog, legal
    page.tsx          Homepage
    [slug]/           Dynamic route: serves BOTH category pages (/tours,
                       /desert-tours, ...) and comparison pages
                       (/best-wadi-shab-tours, ...) based on data/*.json
    experience/[slug]/ Experience detail page template
    blog/             Blog index + article pages
    search/           Site search
    about/, contact/, privacy-policy/, cookie-policy/,
    affiliate-disclosure/, terms/
  admin/
    login/            Admin sign-in
    (dashboard)/       Password-protected: dashboard, experiences,
                       comparisons, blog, advertising, settings
  api/
    contact/          Contact form submission endpoint (stub — see below)
    admin/auth/       Admin login/logout
  sitemap.ts          Dynamic XML sitemap (auto-includes all content)
  robots.ts           robots.txt

components/            Shared UI (cards, nav, forms, ad slots, etc.)
components/admin/      Admin-only form components

data/                  All site content as JSON (edit directly, or via /admin)
  destinations.json    Multi-destination scaffold (Muscat active; Almaty/
                        Sarajevo present but inactive, ready to switch on)
  categories.json
  experiences.json     Demo tour/activity data — replace with real data
  comparisons.json     Powers /best-* pages
  blog.json            10 original guide articles
  adSlots.json          Ad placement config
  siteConfig.json       Brand + analytics/AdSense IDs

lib/
  data.ts             Data access layer (read/write data/*.json)
  actions.ts          Server Actions used by the admin dashboard
  auth.ts             Admin session/auth helpers
  types.ts            Shared TypeScript types
  track.ts            Client-side analytics event helper
middleware.ts          Protects /admin and /api/admin routes
```

---

## 4. Admin dashboard

Go to `/admin`, sign in with `ADMIN_PASSWORD`, and you can:

- **Experiences** — add/edit/delete tours, set categories, price, duration,
  affiliate URL and provider, and toggle "Featured" / "Best Overall" /
  "Best Budget" / "Best for Families" / "Best Private Tour" / "Best Luxury"
  flags (these flags drive the comparison-page badges — they are opinions
  set by you, never auto-generated).
- **Comparisons** — create/edit the `/best-*` pages and choose which
  experiences appear in each one.
- **Blog** — write/edit articles (simple `## Heading` + paragraph format),
  set meta title/description, related articles and internal links.
- **Advertising** — toggle each ad placement on/off and set its AdSense
  slot ID once approved.
- **Settings** — brand name/tagline, live domain, and your Google Analytics,
  Tag Manager, Search Console and AdSense IDs.

Auth note: this uses a single shared password and a signed session cookie —
good enough for a solo operator, not a multi-admin auth system. Swap in
NextAuth/Auth.js or Clerk before adding more admins.

---

## 5. Going live: step by step

### Connect your domain
Point your domain's DNS at wherever you deploy (see hosting below), then
update `domain` in **Admin → Settings** (or `data/siteConfig.json`) so
canonical URLs, Open Graph tags and the sitemap use the real domain.

### Deploying
This is a standard Next.js app. The easiest path is Vercel
(`vercel deploy`) or Netlify — connect the repo and it will build
automatically (`npm run build`). Remember the filesystem caveat in section 2:
if you need `/admin` to keep working after deploy, either use a host with a
persistent filesystem or migrate `lib/data.ts` to a database first.

Set `ADMIN_PASSWORD` (and optionally `ADMIN_SESSION_SECRET`) as environment
variables on your host — don't rely on the `.env.local` default in
production.

### Adding GetYourGuide affiliate links
1. Join the GetYourGuide Partner Program and get your affiliate/partner ID.
2. For each experience in **Admin → Experiences**, set Provider to
   "GetYourGuide" and paste your tracked affiliate URL into "Affiliate URL".
3. The "Check Price & Availability" button on every experience and
   comparison page uses this URL directly, with `rel="sponsored"` and
   outbound click tracking already wired up (see `lib/track.ts`).

### Adding Viator affiliate links
Same as above — set Provider to "Viator" and paste your Viator Partner
Program affiliate link as the Affiliate URL.

### Connecting Google Analytics
1. Create a GA4 property and copy its Measurement ID (`G-XXXXXXXXXX`).
2. Paste it into **Admin → Settings → Google Analytics measurement ID**.
   The script loads automatically site-wide once set (see
   `components/AnalyticsScripts.tsx`).

### Connecting Google Search Console
1. Add your property in Search Console and choose the "HTML tag" verification
   method — copy the `content` value of the meta tag it gives you.
2. Paste it into **Admin → Settings → Google Search Console verification
   code**. It's added to the site automatically.
3. Submit `https://yourdomain.com/sitemap.xml` in Search Console once live.

### Adding AdSense
1. Apply for AdSense once the site meets Google's eligibility requirements
   (original content, working navigation, policy pages — all present here).
2. Once approved, paste your publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`) into
   **Admin → Settings → Google AdSense client ID**.
3. Go to **Admin → Advertising**, and for each placement you want live, paste
   the ad unit's slot ID. Until both the client ID and a slot ID are set, that
   placement shows a clearly labeled placeholder instead of a live ad, so the
   layout never looks broken or spammy in the meantime.

### Wiring up the contact form
`app/api/contact/route.ts` currently logs submissions to the server console.
Before launch, connect it to an email provider (Resend, SendGrid, Postmark)
or write submissions to a database/table so you actually receive them.

---

## 6. Photography

This starter ships with generated placeholder imagery (`components/
PlaceholderImage.tsx`) instead of real photos, since we don't hold rights to
license photography on your behalf. Before launch, replace these with:
- Licensed stock photography, or
- Photos supplied by your GetYourGuide/Viator listings (check their terms
  for reuse rights), or
- Your own photography.

Swap `<PlaceholderImage seed="..." />` usages for `next/image` once you have
real image URLs or files in `/public/images`.

---

## 7. Fonts

`app/globals.css` currently maps the design's display/body font roles to
system font stacks, because this build environment didn't have network
access to Google Fonts. For the intended editorial look, self-host Fraunces
(display) and Public Sans (body) via `next/font/local`, or restore
`next/font/google` in `app/layout.tsx` once you have normal internet access
(it works out of the box — this repo just couldn't fetch fonts during
generation).

---

## 8. Expanding beyond Muscat

`data/destinations.json` already includes Almaty and Sarajevo as inactive
placeholders. The data model (`destination` field on every experience,
scoping ready in `lib/types.ts`) is designed so a second city mostly means:
add its experiences/categories/comparisons/blog content scoped to that
`destination` slug, flip `active: true`, and extend the category/comparison
routes to be destination-aware (currently Muscat-only routes like `/tours`
would become `/muscat/tours`, `/almaty/tours`, etc. — a small routing change
in `app/(site)/[slug]/page.tsx`).

---

## 9. What's demo data vs. real

- All experiences (`data/experiences.json`) are marked `isDemoData: true`
  with **placeholder affiliate URLs** (`...PLACEHOLDER-AFFILIATE-LINK...`) —
  replace every one before launch.
- Ratings, review counts, prices and durations are illustrative — do not
  publish these as real without connecting a live feed or manually verifying
  current figures from your provider.
- Blog articles (`data/blog.json`) are original writing, safe to publish,
  but review for accuracy/freshness before launch (opening hours, prices,
  seasonal closures like the Daymaniyat Islands nesting season all change).
- Legal pages (Privacy Policy, Terms, Affiliate Disclosure, Cookie Policy)
  are a reasonable starting draft, not legal advice — have them reviewed by
  a lawyer, especially regarding GDPR/CCPA if you'll have EU/California
  visitors, before launch.
