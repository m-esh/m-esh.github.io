"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function ConstructedName({ name }: { name: string }) {
  const words = name.split(" ");

  return (
    <span className="text-primary">
      {words.flatMap((word, wi) => {
        const wordSpan = (
          <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
            {word.split("").map((letter, li) => {
              const i = wi * 16 + li;
              const fromLeft = i % 2 === 0;
              return (
                <motion.span
                  key={li}
                  initial={{
                    opacity: 0,
                    x: fromLeft ? -(28 + (li % 3) * 6) : 28 + (li % 3) * 6,
                    y: ((li % 4) - 1.5) * 8,
                    rotate: fromLeft ? -40 : 40,
                    scale: 0.6,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.035,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
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
        <div className="absolute left-1/2 top-[-12rem] size-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px] animate-glow-pulse" />
        <div className="absolute right-[-10rem] bottom-[-10rem] size-[28rem] rounded-full bg-glow-secondary/15 blur-[120px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 lg:px-8">
        <h1 className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <ConstructedName name={profile.name} />
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          {profile.blurb}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button size="lg" onClick={() => scrollTo("#projects")}>
            See my projects
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
            <Mail /> Contact me
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
