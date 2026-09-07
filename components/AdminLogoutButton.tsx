"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className={
        compact
          ? "flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)]"
          : "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-sand-deep)]/50"
      }
    >
      <LogOut size={16} />
      Sign out
    </button>
  );
}
