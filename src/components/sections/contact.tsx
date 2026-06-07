"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";

import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "/in/mehrdad-shariatmadari",
    href: profile.socials.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: "@m-esh",
    href: profile.socials.github,
    icon: GitHubIcon,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]" />
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
          Got something in mind? <span className="gradient-text">Say hello.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-xl text-balance leading-relaxed text-muted-foreground sm:text-lg"
        >
          A team looking for a hand, a question about robotics, or just a hello: my inbox is
          always open.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <Button size="lg" asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail /> Email me directly
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 grid max-w-2xl gap-3 sm:grid-cols-3"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border/60 bg-card/50 p-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
                <link.icon className="size-4.5" />
              </span>
              <span className="flex w-full items-center justify-between gap-2">
                <span className="text-sm font-medium">{link.label}</span>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </span>
              <span className="truncate text-xs text-muted-foreground">{link.value}</span>
            </a>
          ))}
        </motion.div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-6xl flex-col items-center gap-2 border-t border-border/60 px-6 pt-8 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS &amp; shadcn/ui.</p>
        <p>Designed &amp; developed in Toronto, Canada.</p>
      </footer>
    </section>
  );
}
