"use client";

import { FormEvent, useState } from "react";

const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
  "https://satheesrajsachin.app.n8n.cloud/webhook-test/8dad2050-23c2-4e89-abf8-d9cc7ab07303";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Home() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const updateField = (field: "name" | "email" | "message") => (value: string) =>
    setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!N8N_WEBHOOK_URL) {
      setFormError(
        "Missing NEXT_PUBLIC_N8N_WEBHOOK_URL. Add it to .env.local and restart the dev server."
      );
      return;
    }

    setFormStatus("sending");
    setFormError(null);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong sending the form."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:px-12">
        <section className="flex-1 space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-sm uppercase tracking-[0.3em] text-white/70">
            Contact
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Let&rsquo;s build something <span className="text-cyan-300">together</span>
          </h1>
          <p className="text-lg text-white/70">
            Send us a note with your project idea or integration question. We route every
            submission through an n8n workflow so the right teammate follows up quickly.
          </p>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Response in under 24 hours
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Powered by serverless n8n workflows
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Hosted on Vercel for instant deploys
            </li>
          </ul>
        </section>

        <section className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_120px_rgba(0,0,0,0.25)] backdrop-blur">
          <header className="mb-8 space-y-2">
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <p className="text-sm text-white/70">
              All entries are delivered to the configured n8n webhook as JSON.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm uppercase tracking-wide text-white/70" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={(event) => updateField("name")(event.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-wide text-white/70" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email")(event.target.value)}
                placeholder="jane@example.com"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-wide text-white/70" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(event) => updateField("message")(event.target.value)}
                placeholder="Tell us how we can help…"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
              />
            </div>

            {formError && (
              <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 px-5 py-3 text-base font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {formStatus === "sending" ? "Sending…" : "Send message"}
            </button>

            {formStatus === "success" && (
              <p className="text-sm text-emerald-200">
                Received! We&rsquo;ll reach out shortly.
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
