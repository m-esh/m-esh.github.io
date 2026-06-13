"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { LiquidButton } from "@/components/ui/liquid-button";
import { Magnetic } from "@/components/magnetic";
import { HeroObject } from "@/components/hero-object";
import { TextScramble } from "@/components/text-scramble";
import { useScrollTo } from "@/components/smooth-scroll";
import { profile } from "@/data/profile";

export function Hero() {
  const scrollTo = useScrollTo();

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
              <LiquidButton className="group" onClick={() => scrollTo("#projects")}>
                See my projects
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </LiquidButton>
            </Magnetic>
            <Magnetic>
              <LiquidButton tone="metal" onClick={() => scrollTo("#contact")}>
                <Mail /> Contact me
              </LiquidButton>
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

    </section>
  );
}
