"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  "Most",
  "things",
  "I've",
  "built",
  "started",
  "as",
  "a",
  "rough",
  "sketch,",
  "a",
  "loose",
  "wire,",
  "or",
  "a",
  "guess",
  "that",
  "turned",
  "out",
  "right.",
];

export function ZoomStatement() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.85, 1], [0.82, 1.06, 1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.6, 2.2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.5, 0.2]);

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute size-[26rem] rounded-full bg-primary/30 blur-[110px] sm:size-[34rem]"
        />

        <motion.p
          style={{ scale }}
          className="relative mx-auto max-w-4xl text-balance px-6 text-center text-2xl font-semibold leading-snug tracking-tight sm:text-4xl md:text-5xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </motion.p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block text-foreground">
      {children}
    </motion.span>
  );
}
