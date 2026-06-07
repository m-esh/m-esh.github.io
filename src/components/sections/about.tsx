"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

import { profile, skills } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="A bit about who I am"
          description="The short version: I keep people safe, I build robots, and I'm chasing a future in mechatronics engineering."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-6">
            {profile.longBio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm"
          >
            <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
                <Wrench className="size-5" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">Toolkit &amp; strengths</h3>
            </div>
            <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
              Skills I&rsquo;ve been building through robotics, lifeguarding, and personal projects —
              growing this list every season.
            </p>
            <ul className="relative mt-6 flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="rounded-full border border-border/70 bg-secondary/60 px-3.5 py-1.5 text-sm text-secondary-foreground"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
