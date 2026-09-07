import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Search as SearchIcon, Sparkles } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CategoryIcon from "@/components/CategoryIcon";
import ExperienceCard from "@/components/ExperienceCard";
import PlaceholderImage from "@/components/PlaceholderImage";
import AdSlot from "@/components/AdSlot";
import { getCategories, getFeaturedExperiences } from "@/lib/data";

const destinationsSpotlight = [
  { name: "Wadi Shab", note: "Turquoise pools & canyon hike", slug: "wadi-shab" },
  { name: "Daymaniyat Islands", note: "Snorkeling nature reserve", slug: "daymaniyat-islands" },
  { name: "Nizwa", note: "Historic fort & souk", slug: "nizwa" },
  { name: "Jebel Akhdar", note: "Terraced 'Green Mountain'", slug: "jebel-akhdar" },
  { name: "Wahiba Sands", note: "Desert dunes & camps", slug: "wahiba-sands" },
  { name: "Bimmah Sinkhole", note: "Natural limestone crater", slug: "bimmah-sinkhole" },
  { name: "Muscat Old Town", note: "Palace, forts & gates", slug: "muscat-old-town" },
  { name: "Mutrah", note: "Souk & corniche", slug: "mutrah" },
];

const whyPoints = [
  {
    icon: TrendingUp,
    title: "Compare experiences side by side",
    body: "See rating, duration and price for similar tours in one place, instead of checking each provider separately.",
  },
  {
    icon: SearchIcon,
    title: "Find highly rated tours",
    body: "We surface well-reviewed operators so you can shortlist faster and avoid guesswork.",
  },
  {
    icon: Sparkles,
    title: "Discover hidden gems",
    body: "Alongside the big-name sights, we point out lesser-known spots worth building into your itinerary.",
  },
  {
    icon: ShieldCheck,
    title: "Book through trusted providers",
    body: "Every booking completes on an established platform like GetYourGuide or Viator — never on our site directly.",
  },
];

const guides = [
  { slug: "50-best-things-to-do-in-muscat", title: "Best Things To Do in Muscat" },
  { slug: "best-wadi-shab-tours-from-muscat", title: "Best Wadi Shab Tours" },
  { slug: "best-daymaniyat-islands-snorkeling-tours", title: "Best Daymaniyat Islands Tours" },
  { slug: "best-muscat-day-trips", title: "Best Muscat Day Trips" },
  { slug: "best-desert-tours-from-muscat", title: "Best Desert Tours From Muscat" },
  { slug: "muscat-3-day-itinerary", title: "Muscat 3-Day Itinerary" },
];

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedExperiences();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-sea)]">
        <div className="absolute inset-0">
          <PlaceholderImage
            seed="muscat-hero"
            label="Muscat coastline"
            aspect="aspect-auto h-full"
            className="h-full w-full opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sea)] via-[var(--color-sea)]/70 to-[var(--color-sea)]/30" />
        </div>
        <div className="container-page relative py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-6xl leading-[1.08] text-white">
              Discover the Best Things To Do in Muscat
            </h1>
            <p className="mt-5 text-lg text-[var(--color-sea-pale)] max-w-xl">
              Compare tours, day trips and experiences in Muscat before you
              book.
            </p>
            <SearchBar className="mt-8 max-w-xl" />
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/tours"
                className="rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-clay-dark)] transition-colors"
              >
                Explore Muscat
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Read our guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-14">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl text-[var(--color-ink)] mb-6">
          Browse by category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-clay)] transition-colors"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-sea-pale)] text-[var(--color-sea)] group-hover:bg-[var(--color-clay)] group-hover:text-white transition-colors">
                <CategoryIcon icon={c.icon} size={18} />
              </span>
              <span className="text-sm font-medium text-[var(--color-ink)]">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="container-page">
        <AdSlot id="homepage-leaderboard" />
      </div>

      {/* Featured experiences */}
      <section className="container-page py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl text-[var(--color-ink)]">
            Featured experiences
          </h2>
          <Link
            href="/tours"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-[var(--color-clay)]"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <p className="text-sm text-[var(--color-ink-soft)] max-w-2xl mb-6">
          Demo data shown below — pricing, ratings and availability will
          update automatically once GetYourGuide and Viator affiliate feeds
          are connected.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      <div className="container-page">
        <AdSlot id="homepage-in-feed" />
      </div>

      {/* Popular destinations */}
      <section className="bg-[var(--color-sand-deep)]/40 py-14">
        <div className="container-page">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl text-[var(--color-ink)] mb-6">
            Popular destinations near Muscat
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinationsSpotlight.map((d) => (
              <div
                key={d.slug}
                className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white"
              >
                <PlaceholderImage seed={d.slug} label={d.name} aspect="aspect-[5/4]" />
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">
                    {d.name}
                  </h3>
                  <p className="text-xs text-[var(--color-ink-soft)] mt-1">{d.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why use us */}
      <section className="container-page py-16">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl text-[var(--color-ink)] mb-8 max-w-lg">
          Why use Muscat Explorer?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyPoints.map((p) => (
            <div key={p.title}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-sea-pale)] text-[var(--color-sea)] mb-4">
                <p.icon size={20} />
              </span>
              <h3 className="font-medium text-[var(--color-ink)] mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular guides */}
      <section className="bg-[var(--color-sea)] py-16">
        <div className="container-page">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl text-white">
              Popular guides
            </h2>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-[var(--color-brass-pale)]"
            >
              All guides <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/blog/${g.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <PlaceholderImage seed={g.slug} label={g.title} aspect="aspect-[16/9]" />
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-fraunces)] text-base text-white group-hover:text-[var(--color-brass-pale)]">
                    {g.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
