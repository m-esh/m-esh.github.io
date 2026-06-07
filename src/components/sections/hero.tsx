"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { LinkedInIcon } from "@/components/icons";

import { Button } from "@/components/ui/button";
import { profile, stats } from "@/data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

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
        <div
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:64px_64px]"
          aria-hidden
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Grade 11 · Toronto, Canada · FRC Team 7902
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Hi, I&rsquo;m{" "}
          <span className="gradient-text">Mehrdad Shariatmadari</span>.
          <br />
          I build, guard, and keep learning.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          {profile.blurb}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button size="lg" onClick={() => scrollTo("#projects")}>
            See my projects
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
            <Mail /> Contact me
          </Button>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedInIcon className="size-4" /> LinkedIn
          </a>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
