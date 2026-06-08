"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

function ConstructedName({ name }: { name: string }) {
  const words = name.split(" ");
  const wordOffsets = words.reduce<number[]>((acc, word, idx) => {
    acc.push(idx === 0 ? 0 : acc[idx - 1] + words[idx - 1].length + 1);
    return acc;
  }, []);

  return (
    <span>
      {words.flatMap((word, wi) => {
        const wordSpan = (
          <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
            {word.split("").map((letter, li) => {
              const i = wordOffsets[wi] + li;
              return (
                <span
                  key={li}
                  style={{ animationDelay: `${i * 0.045}s` }}
                  className="animate-letter-up inline-block text-foreground"
                >
                  {letter}
                </span>
              );
            })}
          </span>
        );

        return wi < words.length - 1 ? [wordSpan, " "] : [wordSpan];
      })}
    </span>
  );
}

export function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 section-glow" />
        <div className="absolute left-1/2 top-[-12rem] size-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[90px]" />
        <div className="absolute right-[-10rem] bottom-[-10rem] size-[28rem] rounded-full bg-glow-secondary/15 blur-[90px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 lg:px-8">
        <h1 className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <ConstructedName name={profile.name} />
        </h1>

        <p
          style={{ animationDelay: "0.08s" }}
          className="animate-fade-up mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          {profile.blurb}
        </p>

        <div
          style={{ animationDelay: "0.16s" }}
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-3"
        >
          <Button size="lg" onClick={() => scrollTo("#projects")}>
            See my projects
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
            <Mail /> Contact me
          </Button>
        </div>
      </div>
    </section>
  );
}
