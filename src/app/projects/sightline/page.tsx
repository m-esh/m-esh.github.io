import type { Metadata } from "next";
import { Crosshair, Flashlight } from "lucide-react";

import { ScrollProgress } from "@/components/scroll-progress";
import { TiltCard } from "@/components/tilt-card";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudyFooter } from "@/components/case-study-footer";

const sections = [
  { id: "look", label: "Look" },
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "process", label: "Process" },
];

export const metadata: Metadata = {
  title: "Sightline",
  description:
    "A top-down stealth shooter built solo in Java with Greenfoot for a grade 11 Intro to Computer Science class, built around a flashlight and enemies that have to actually see you first.",
};

export default function SightlinePage() {
  return (
    <>
      <ScrollProgress />

      <CaseStudyNav sections={sections} />

      <main className="flex-1 pt-16">
        {/* Hero: text only, single column. Both real images are landscape
            (a title card and a gameplay screenshot), so they get their own
            full-width "Look" section right below instead of being cropped
            into a side column. */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 lg:px-8">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Case Study · June 2026
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Sightline
            </h1>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A top-down stealth shooter, built solo in Java with Greenfoot
              for my grade 11 Intro to Computer Science class. Eleven enemies
              share a dark house with you, and a flashlight is the only
              thing deciding who sees who first.
            </p>
            <dl className="mt-2 grid grid-cols-3 gap-4 pt-5 text-sm sm:max-w-md">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Role
                </dt>
                <dd className="font-medium">Code &amp; design</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Tools
                </dt>
                <dd className="font-medium">Java, Greenfoot</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Built for
                </dt>
                <dd className="font-medium">Grade 11 Intro to CS</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Look */}
        <section id="look" className="relative scroll-mt-16 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/sightline/poster.jpg"
                    alt="Sightline title screen: two SWAT operators breaching a dark doorway with a flashlight beam, tagline 'Fear what you cannot see'"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Title screen
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The game&apos;s own title card. Like every sprite and
                    background in Sightline, it&apos;s AI-generated art
                    (ChatGPT), not photography or hand-drawn work.
                  </p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/sightline/gameplay.jpg"
                    alt="Gameplay screenshot of Sightline: a cone-shaped flashlight beam is the only lit area in an otherwise black screen, revealing part of a wooden room, with HP and Ammo readouts at the top"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Actual gameplay
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    What you actually see while playing: everything outside
                    the flashlight cone, walls, furniture, enemies, is
                    simply black until it crosses the beam.
                  </p>
                </div>
              </div>
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
                The assignment was to build a game in Greenfoot using
                object-oriented programming. I wanted to build something
                around a single mechanic rather than a pile of features, so
                I picked vision itself: what you can see, what sees you, and
                how little of a dark room either side actually gets.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The build
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                One world, one house, eleven enemies, built solo. The map
                itself was placed by hand in the Greenfoot editor, actor by
                actor, then exported into a plain list of spawn
                coordinates the world constructor runs through on startup.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Two sightlines, not one
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              The name is literal: there are two vision systems running at
              once, yours and theirs, and the whole game is what happens
              when they cross.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/sightline/gameplay.jpg"
                    alt="The player's flashlight cone, the only visible light source in Sightline"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <Flashlight className="size-3.5" /> Your sight
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A black overlay follows the player and turns toward the
                    mouse, with a flashlight-shaped cutout. Enemies outside
                    that cone are just as invisible to you as you are to
                    them.
                  </p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/sightline/poster.jpg"
                    alt="Sightline title art, two armed figures moving through a dark doorway"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <Crosshair className="size-3.5" /> Their sight
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Each enemy fires an invisible ray at the player every
                    frame; it dies the instant it hits a wall. If it
                    reaches you clean, that enemy opens fire. Get close
                    enough instead and a click is a free melee stab, no
                    ammo spent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Built in Greenfoot
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Every enemy is a Grunt, a subclass of a shared Enemy class
              that tracks how many are left and decides when the level is
              won. A couple of utility classes for smooth movement and
              on-screen text boxes came from my teacher rather than being
              written from scratch, and the enemies&apos; vision rays were a
              system I troubleshot with Claude&apos;s help rather than
              working out alone. The art is AI-generated (ChatGPT); the
              gunshot and stab sounds are pulled from CS:GO, and the music
              is from Trauma Team (Atlus, 2010). One known bug survived to
              the final build: the player can occasionally get stuck in a
              wall, only fixable by aiming at it and moving erratically
              until it lets go.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl pt-8">
              <p className="leading-relaxed text-muted-foreground">
                Between this and the iPhone ad, screen-only projects are
                starting to take up as much of this site as anything I&apos;ve
                built with my hands.
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
