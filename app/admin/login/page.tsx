"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Compass } from "lucide-react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(searchParams.get("next") || "/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Check ADMIN_PASSWORD in your .env.local.");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[var(--color-sand)] px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-sea)] text-[var(--color-sand)]">
            <Compass size={18} />
          </span>
          <span className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)]">
            Muscat Explorer
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
        >
          <h1 className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] mb-1">
            Admin sign in
          </h1>
          <p className="text-sm text-[var(--color-ink-soft)] mb-5">
            Enter the admin password to manage experiences, comparisons and blog content.
          </p>
          <label className="grid gap-1.5 text-sm mb-4">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]"
            />
          </label>
          {error && <p className="text-sm text-red-700 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-[var(--color-ink-soft)]">
          Default password is <code>changeme</code> — set your own via
          <code> ADMIN_PASSWORD</code> in <code>.env.local</code>.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
