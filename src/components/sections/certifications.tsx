"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";

import { certifications, type CertificationItem } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CertificationCard({ cert, index }: { cert: CertificationItem; index: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const fromSide = index % 2 === 0 ? -1 : 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "start 55%"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [fromSide * 64, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div ref={cardRef} style={{ x, opacity }} className="h-full">
      <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-24px_var(--color-primary)]">
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
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials I've earned"
          description="The training behind the lifeguarding work, plus a bit more on the way soon."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
