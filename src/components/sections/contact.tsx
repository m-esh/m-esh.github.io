"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";

import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";

const socials = [
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedInIcon },
  { label: "GitHub", href: profile.socials.github, icon: GitHubIcon },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary"
        >
          Contact
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="gradient-text">Contact me</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <Button size="lg" asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail /> Email me directly
            </a>
          </Button>

          <div className="flex items-center gap-6">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="size-4" /> {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-2 border-t border-border/60 px-6 pt-8 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS &amp; shadcn/ui.</p>
        <p>Designed &amp; developed in Toronto, Canada.</p>
      </footer>
    </section>
  );
}
