"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 lg:px-8">
        <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {profile.location} · {profile.tagline}
        </p>

        <h1
          style={{ animationDelay: "0.05s" }}
          className="animate-fade-up mt-5 max-w-4xl text-balance font-display text-[clamp(2.25rem,9vw,4.5rem)] font-semibold leading-[1.05] tracking-tight"
        >
          {profile.name}
        </h1>

        <p
          style={{ animationDelay: "0.12s" }}
          className="animate-fade-up mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          {profile.blurb}
        </p>

        <div
          style={{ animationDelay: "0.2s" }}
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-3"
        >
          <Button size="lg" className="group" onClick={() => scrollTo("#projects")}>
            See my projects
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
            <Mail /> Contact me
          </Button>
        </div>
      </div>

      <div
        style={{ animationDelay: "0.6s" }}
        className="animate-fade-up mx-auto flex w-full max-w-6xl px-6 pb-10 lg:px-8"
        aria-hidden
      >
        <button
          type="button"
          tabIndex={-1}
          onClick={() => scrollTo("#about")}
          className="group inline-flex cursor-pointer items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="block h-px w-10 bg-current opacity-50 transition-[width] duration-300 group-hover:w-14" />
          <span className="font-mono text-xs uppercase tracking-[0.18em]">Scroll</span>
        </button>
      </div>
    </section>
  );
}
