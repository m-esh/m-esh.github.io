"use client";

import { motion } from "framer-motion";

import { certifications } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials I've earned"
          description="The training behind the lifeguarding work."
          accent="blue"
        />

        <ul className="mt-10 flex flex-col border-t border-border/60">
          {certifications.map((cert, i) => (
            <motion.li
              key={cert.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/60 py-5"
            >
              <span className="text-base font-medium tracking-tight sm:text-lg">{cert.name}</span>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                {cert.issuer}
                <span className="font-mono text-xs">{cert.year}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
