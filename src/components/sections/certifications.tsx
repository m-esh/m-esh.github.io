"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";

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
        <div className="flex items-center justify-between">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
            <Award className="size-5" />
          </span>
          <Badge variant="outline" className="font-mono text-xs">
            {cert.year}
          </Badge>
        </div>
        <CardTitle className="mt-3 text-xl">{cert.name}</CardTitle>
        <CardDescription className="text-primary">{cert.issuer}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
      </CardContent>
    </Card>
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
        </div>

        <div ref={viewportRef} className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex h-[48vh] min-h-[340px] w-fit gap-6 px-6 will-change-transform"
            style={{ x }}
          >
            {certifications.map((cert) => (
              <div key={cert.name} className="h-full w-[64vw] shrink-0">
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
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isClient = useIsClient();

  const usePinned = isClient && isDesktop && !prefersReducedMotion;

  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      {usePinned ? <PinnedSideways /> : <StackedGrid />}
    </section>
  );
}
