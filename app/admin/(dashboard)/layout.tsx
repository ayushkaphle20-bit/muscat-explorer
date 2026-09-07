import Link from "next/link";
import {
  LayoutDashboard,
  MapPinned,
  Scale,
  Newspaper,
  Megaphone,
  Settings,
  ExternalLink,
} from "lucide-react";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/experiences", label: "Experiences", icon: MapPinned },
  { href: "/admin/comparisons", label: "Comparisons", icon: Scale },
  { href: "/admin/blog", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/advertising", label: "Advertising", icon: Megaphone },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-sand)] flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[var(--color-line)] bg-white">
        <div className="p-5 border-b border-[var(--color-line)]">
          <p className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)]">
            Muscat Explorer
          </p>
          <p className="text-xs text-[var(--color-ink-soft)]">Admin dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-sand-deep)]/50 hover:text-[var(--color-ink)] transition-colors"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-[var(--color-line)] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-sand-deep)]/50"
          >
            <ExternalLink size={16} />
            View site
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between border-b border-[var(--color-line)] bg-white px-4 py-3">
          <p className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">
            Muscat Explorer Admin
          </p>
          <AdminLogoutButton compact />
        </header>
        <div className="p-5 md:p-8 max-w-5xl">{children}</div>
      </div>
    </div>
  );
}
