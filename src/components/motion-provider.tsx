"use client";

import { MotionConfig } from "framer-motion";

import { SmoothScroll } from "@/components/smooth-scroll";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
