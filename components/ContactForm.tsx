"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-sea-pale)]/40 p-5 text-sm text-[var(--color-ink)]">
        Thanks — your message has been received. We'll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
      <label className="grid gap-1.5 text-sm">
        Name
        <input
          name="name"
          required
          className="rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        Email
        <input
          type="email"
          name="email"
          required
          className="rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        Message
        <textarea
          name="message"
          rows={5}
          required
          className="rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white disabled:opacity-60 w-fit"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong sending your message. Please email us directly instead.
        </p>
      )}
    </form>
  );
}
