import type { Metadata } from "next";

import { ScrollProgress } from "@/components/scroll-progress";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudyFooter } from "@/components/case-study-footer";

const sections = [
  { id: "watch", label: "Watch" },
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
];

export const metadata: Metadata = {
  title: "iPhone Commercial",
  description:
    "A self-directed concept ad for the iPhone 16 Pro Max, modeled and animated in Blender, cut and graded in DaVinci Resolve.",
};

export default function FirstLightPage() {
  return (
    <>
      <ScrollProgress />

      <CaseStudyNav sections={sections} />

      <main className="flex-1 pt-16">
        {/* Hero: text only, single column. Unlike the physical builds this
            page has no photograph to sit beside it — the video is the whole
            project, so it gets a full-width slot of its own immediately
            below instead of being squeezed into a side column at 16:9. */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 lg:px-8">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Independent Project · May 2025
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              iPhone Commercial
            </h1>
            {/* "Not an Apple production" is load-bearing, not throat-clearing:
                the video itself is styled as an Apple launch ad and features
                the Apple logo, so the page has to be unambiguous that this is
                a personal exercise, not official or commissioned work. */}
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A concept product ad for the iPhone 16 Pro Max — not an Apple
              production, a spec piece I made on my own to learn the pipeline
              end to end: modeled and animated in Blender, then cut and
              graded in DaVinci Resolve.
            </p>
            <dl className="mt-2 grid grid-cols-3 gap-4 pt-5 text-sm sm:max-w-md">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Role
                </dt>
                <dd className="font-medium">Model, animate, edit &amp; grade</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Tools
                </dt>
                <dd className="font-medium">Blender, DaVinci Resolve</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Length
                </dt>
                <dd className="font-medium">0:40</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Watch */}
        <section id="watch" className="relative scroll-mt-16 py-8 sm:py-10">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-xl bg-black">
              <video
                src="/projects/first-light/ad.mp4"
                poster="/projects/first-light/poster.jpg"
                className="aspect-video w-full"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The idea
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Everything I&apos;d built up to this point lived in the real
                world — CAD, 3D printing, a robot you could drive. This was a
                chance to see if I could do the same kind of product thinking
                entirely on screen: model a device from scratch, light it,
                move a camera around it, and cut the result together like a
                real launch video. The iPhone 16 Pro Max was the reference; the
                telephoto claim on screen is fiction I wrote for the ad, not a
                real spec.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The shape of it
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Forty seconds, built the way Apple&apos;s own product films are:
                a slow macro reveal of the body and camera bump, an exploded
                view of the lens stack, then a title card making a claim about
                what changed. No dialogue, no cast — just the object, the
                light, and the cut.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Blender, then DaVinci
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Neither tool was one I&apos;d used seriously before this — I
              learned both by building this one piece. The phone body, the
              lens stack, the studio lighting, and the camera moves are all
              modeled and animated in Blender. From there the render went
              into DaVinci Resolve for the cut, the color grade, and the
              on-screen title cards, the same software split a lot of
              real product films run on.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl pt-8">
              <p className="leading-relaxed text-muted-foreground">
                It&apos;s the first thing I&apos;ve finished that never touched
                a 3D printer — same instinct as the rest of what&apos;s on this
                site, aimed at a screen instead of a bench.
              </p>
            </div>
            <div className="mt-8">
              <CaseStudyFooter next={{ href: "/projects/drone", label: "Gesture-Controlled Drone" }} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
