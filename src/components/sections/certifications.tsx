"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { certifications } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useIsClient } from "@/hooks/use-is-client";

function CertificationCard({ cert, className }: { cert: (typeof certifications)[number]; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Badge variant="outline" className="w-fit font-mono text-xs">
          {cert.year}
        </Badge>
        <CardTitle className="mt-3 text-xl">{cert.name}</CardTitle>
        <CardDescription className="text-primary">{cert.issuer}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
      </CardContent>
    </Card>
  );
}

function ProgressDots({ progress }: { progress: import("framer-motion").MotionValue<number> }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    return progress.on("change", (v) => {
      const step = 1 / certifications.length;
      setActive(Math.min(certifications.length - 1, Math.floor(v / step)));
    });
  }, [progress]);

  return (
    <div className="mt-6 flex items-center gap-2">
      {certifications.map((cert, i) => (
        <span
          key={cert.name}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function PinnedSideways() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [travel, setTravel] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  React.useEffect(() => {
    const measure = () => {
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      setTravel(Math.max(0, trackWidth - viewportWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <div ref={sectionRef} style={{ height: `${certifications.length * 80}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 pb-6 lg:px-8">
          <SectionHeading
            eyebrow="Certifications"
            title="Credentials I've earned"
            description="The training behind the lifeguarding work, plus a bit more on the way soon."
          />
          <ProgressDots progress={scrollYProgress} />
        </div>

        <div ref={viewportRef} className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex h-[46vh] min-h-[320px] w-fit gap-5 px-6 will-change-transform sm:gap-6"
            style={{ x }}
          >
            {certifications.map((cert) => (
              <div key={cert.name} className="h-full w-[80vw] shrink-0 sm:w-[56vw] lg:w-[40vw] xl:w-[32vw]">
                <CertificationCard cert={cert} className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-24px_var(--color-primary)]" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StackedGrid() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Certifications"
        title="Credentials I've earned"
        description="The training behind the lifeguarding work, plus a bit more on the way soon."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <CertificationCard cert={cert} className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-24px_var(--color-primary)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Certifications() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isClient = useIsClient();

  const usePinned = isClient && !prefersReducedMotion;

  return (
    <section id="certifications" className="relative">
      {usePinned ? <PinnedSideways /> : <div className="py-20 sm:py-28"><StackedGrid /></div>}
    </section>
  );
}
