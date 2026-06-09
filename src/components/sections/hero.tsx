"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { profile } from "@/data/profile";

const [firstName, lastName] = profile.name.split(" ");

export function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 lg:px-8">
        <p className="animate-fade-up text-sm text-muted-foreground">
          {profile.location} · {profile.tagline}
        </p>

        <h1
          style={{ animationDelay: "0.05s" }}
          className="animate-fade-up mt-8 text-[clamp(3rem,10.5vw,8.25rem)] font-normal leading-[1.0] tracking-[-0.02em]"
        >
          {firstName}
          <br />
          <span className="font-bold">{lastName}</span>
        </h1>

        <div
          style={{ animationDelay: "0.12s" }}
          className="animate-fade-up mt-12 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-4">
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

          <p className="max-w-sm text-balance text-base leading-relaxed text-muted-foreground sm:text-right">
            {profile.blurb}
          </p>
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
          <span className="text-xs uppercase tracking-[0.18em]">Scroll</span>
        </button>
      </div>
    </section>
  );
}
