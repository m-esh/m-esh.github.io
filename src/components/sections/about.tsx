"use client";

import { motion } from "framer-motion";

import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="About me"
          description="The short version: I keep people safe, I build robots, and I'm chasing a future in mechatronics engineering."
        />

        <div className="mt-10 flex max-w-3xl flex-col gap-6">
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
      </div>
    </section>
  );
}
