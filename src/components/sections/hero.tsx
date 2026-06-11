"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { HeroObject } from "@/components/hero-object";
import { TextScramble } from "@/components/text-scramble";
import { profile } from "@/data/profile";

export function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {profile.location} · {profile.tagline}
          </p>

          <TextScramble
            as="h1"
            text={profile.name}
            style={{ animationDelay: "0.05s" } as React.CSSProperties}
            className="animate-fade-up mt-5 max-w-4xl text-balance font-display text-[clamp(2.25rem,9vw,4.5rem)] font-semibold leading-[1.05] tracking-tight"
          />

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
            <Magnetic>
              <Button size="lg" className="group" onClick={() => scrollTo("#projects")}>
                See my projects
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
                <Mail /> Contact me
              </Button>
            </Magnetic>
          </div>
        </div>

        <div
          style={{ animationDelay: "0.3s" }}
          className="animate-fade-up mt-4 flex justify-center lg:mt-0 lg:block"
        >
          <HeroObject />
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
