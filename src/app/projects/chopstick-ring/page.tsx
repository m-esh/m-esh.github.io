import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hand, Keyboard, Ruler } from "lucide-react";

import { ScrollProgress } from "@/components/scroll-progress";
import { ProjectGallery, type GalleryItem } from "./project-gallery";
import { PartsDiagram, type DiagramPart } from "./parts-diagram";

export const metadata: Metadata = {
  title: "Chopstick Ring · Mehrdad Shariatmadari",
  description:
    "A finger-worn chopstick that flips between an eating utensil and a flat desk rest — sketched, modeled in CAD, 3D printed, and assembled by hand.",
};

const cadSheets: GalleryItem[] = [
  {
    src: "/projects/chopstick-ring/cad-render.jpg",
    alt: "3D rendered model of the Chopstick Ring assembly",
    title: "Full assembly — render",
    description:
      "The complete assembly: a finger ring joined to a 150 mm chopstick arm through a pivoting hinge, so the arm can swing between an eating angle and a flat resting position.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-1-overview.jpg",
    alt: "Orthographic CAD sheet showing the full Chopstick Ring assembly with overall dimensions",
    title: "Assembly overview — sheet 1 of 6",
    description:
      "Front, side, and isometric views of the finished assembly with overall dimensions called out — 208 mm tip-to-ring, 25.5 mm across the ring mount.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-2-arm.jpg",
    alt: "Orthographic CAD sheet of the chopstick arm component with dimensions",
    title: "Chopstick arm — sheet 2 of 6",
    description:
      "The 150 mm main arm — the part that actually does the eating. Drilled for the Ø6.5 mm pivot at one end and a Ø4 mm locating pin near the tip.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-3-bracket.jpg",
    alt: "Orthographic CAD sheet of the hinge bracket component with dimensions",
    title: "Hinge bracket — sheet 3 of 6",
    description:
      "A 50 mm bracket that bridges the ring and the arm. It houses the Ø6.5 mm pivot bore and the Ø8 mm counterbore that the pin's head seats into.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-4-ring.jpg",
    alt: "Orthographic CAD sheet of the finger ring component with dimensions",
    title: "Finger ring — sheet 4 of 6",
    description:
      "The wearable ring itself — Ø25.5 mm outside, Ø21.5 mm inside, sized to sit comfortably on an average adult finger and printed as its own part.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-5-pin.jpg",
    alt: "Orthographic CAD sheet of the pivot pin component, drawn at 8:1 scale",
    title: "Pivot pin — sheet 5 of 6",
    description:
      "A small T-shaped pin (drawn at 8:1 to keep the dimensions legible) that passes through the bracket and bushing and lets the arm rotate smoothly at the hinge.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-6-bushing.jpg",
    alt: "Orthographic CAD sheet of the pivot bushing component, drawn at 8:1 scale",
    title: "Pivot bushing — sheet 6 of 6",
    description:
      "A thin sleeve that rides on the pivot pin and keeps the arm spinning freely against the bracket instead of wearing against bare plastic.",
  },
];

const diagramParts: DiagramPart[] = [
  {
    number: 1,
    name: "Finger ring",
    blurb: "Ø25.5 mm wearable ring the whole assembly hangs from.",
    x: 26,
    y: 78,
    item: cadSheets[4],
  },
  {
    number: 2,
    name: "Hinge bracket",
    blurb: "Bridges the ring and the arm, housing the pivot bore.",
    x: 36,
    y: 54,
    item: cadSheets[3],
  },
  {
    number: 3,
    name: "Pivot pin",
    blurb: "T-shaped pin that lets the arm rotate at the hinge.",
    x: 33,
    y: 60,
    item: cadSheets[5],
  },
  {
    number: 4,
    name: "Bushing",
    blurb: "Thin sleeve that keeps the pivot spinning freely.",
    x: 40,
    y: 60,
    item: cadSheets[6],
  },
  {
    number: 5,
    name: "Chopstick arm",
    blurb: "The 150 mm business end that actually picks up food.",
    x: 65,
    y: 26,
    item: cadSheets[2],
  },
];

const buildPhotos: GalleryItem[] = [
  {
    src: "/projects/chopstick-ring/prototype-standing.jpg",
    alt: "The assembled Chopstick Ring prototype standing on its hinge on a desk",
    title: "Assembled prototype",
    description:
      "The printed and assembled prototype — two arms joined at a brass-pinned hinge, each carrying its own finger ring.",
  },
  {
    src: "/projects/chopstick-ring/prototype-eating-mode.jpg",
    alt: "The Chopstick Ring folded into its angled eating position",
    title: "Folded for eating",
    description:
      "Pivoted down into the working angle — the position the rings hold while the arms are being used to pick up food.",
  },
  {
    src: "/projects/chopstick-ring/prototype-typing-mode.jpg",
    alt: "The Chopstick Ring opened flat into its resting position for typing",
    title: "Open for typing",
    description:
      "Unfolded flat and laid back against the fingers — out of the way and resting on the rings so the hands stay free to type.",
  },
  {
    src: "/projects/chopstick-ring/prototype-detail.jpg",
    alt: "Close-up of the hinge, pivot pin, and finger ring on the Chopstick Ring prototype",
    title: "Hinge detail",
    description:
      "A close-up of the pivot — the pin, bushing, and bracket from the CAD set, printed, assembled, and doing their job.",
  },
];

export default function ChopstickRingPage() {
  return (
    <>
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6 lg:px-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to portfolio
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 section-glow" />
            <div className="absolute right-[-12rem] top-[-8rem] size-[32rem] rounded-full bg-glow-secondary/20 blur-[120px]" />
          </div>

          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-glow-secondary/30 bg-glow-secondary/10 px-3.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-glow-secondary">
                Case Study · 2025
              </span>
              <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Chopstick Ring
              </h1>
              <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
                A finger-worn chopstick that flips from an eating utensil to a flat desk
                rest in one motion — so you can eat lunch at your desk without getting
                food on your hands or your keyboard.
              </p>
              <dl className="mt-2 grid grid-cols-3 gap-4 border-t border-border/60 pt-5 text-sm">
                <div className="flex flex-col gap-1">
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Role</dt>
                  <dd className="font-medium">Design &amp; build</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Tools</dt>
                  <dd className="font-medium">CAD, 3D printing</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Parts</dt>
                  <dd className="font-medium">6-piece assembly</dd>
                </div>
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/chopstick-ring/cad-render.jpg"
                alt="3D rendered CAD model of the Chopstick Ring assembly"
                className="aspect-[16/10] size-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The problem
              </h2>
              <p className="text-balance leading-relaxed text-muted-foreground">
                Eating lunch at a desk usually means a trade-off: eat with your hands and
                risk leaving food residue on your keyboard, or set your work aside
                entirely. Neither option is great when you&apos;re trying to get through the
                day without a break in focus — or in your meal.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The design
              </h2>
              <p className="text-balance leading-relaxed text-muted-foreground">
                The Chopstick Ring lives on two fingers. A pivoting arm swings down into
                an eating position when you need it, then folds back flat against your
                hand when you don&apos;t — clean, out of the way, and always within reach. I
                worked through the geometry in CAD, dimensioned a six-part assembly, then
                3D printed and hand-assembled the prototype with metal pins and rings.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Two positions, one hinge
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              The whole design comes down to a single pivot. Rotate the arm one way and
              it&apos;s a utensil; rotate it back and it&apos;s out of your way.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/chopstick-ring/prototype-eating-mode.jpg"
                  alt="The Chopstick Ring pivoted down into its eating position"
                  className="aspect-[16/10] size-full object-cover"
                />
                <div className="flex flex-col gap-2 p-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-glow/30 bg-glow/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-glow">
                    <Hand className="size-3.5" /> Eating mode
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pivot the arm down and the two halves meet at an angle you can pinch
                    food with — just like a normal pair of chopsticks, except they never
                    leave your hand.
                  </p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/chopstick-ring/prototype-typing-mode.jpg"
                  alt="The Chopstick Ring opened flat into its resting position"
                  className="aspect-[16/10] size-full object-cover"
                />
                <div className="flex flex-col gap-2 p-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-glow-secondary/30 bg-glow-secondary/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-glow-secondary">
                    <Keyboard className="size-3.5" /> Typing mode
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Swing the arm back flat against your fingers and it tucks neatly out
                    of the way, resting on the rings so your hands stay completely free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anatomy / parts diagram */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-glow-secondary/30 bg-glow-secondary/10 px-3.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-glow-secondary">
              Anatomy
            </span>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Tap a part to open its drawing
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              Each numbered point on the model below is a real part from the
              assembly — click it, or its entry in the list, to open the
              dimensioned CAD sheet it came from.
            </p>

            <div className="mt-10">
              <PartsDiagram
                image="/projects/chopstick-ring/cad-render.jpg"
                alt="3D rendered CAD model of the Chopstick Ring with its parts numbered"
                parts={diagramParts}
              />
            </div>
          </div>
        </section>

        {/* CAD breakdown */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
              <Ruler className="size-3.5" /> CAD breakdown
            </span>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Six parts, fully dimensioned
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              Every part of the assembly was modeled and drawn to scale before it was
              printed. Click any sheet below to open it full-size — then click the image
              itself to zoom in and read the dimensions.
            </p>

            <div className="mt-10">
              <ProjectGallery items={cadSheets} />
            </div>
          </div>
        </section>

        {/* Build photos */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              From CAD to hand
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              The printed parts, assembled and put through their paces on a desk —
              proof that the hinge, pin, and bushing from the drawings actually work
              together.
            </p>

            <div className="mt-10">
              <ProjectGallery items={buildPhotos} zoomHint="Click the image to zoom in" />
            </div>

            <div className="mt-14 flex flex-col items-start gap-3 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Want to see what else I&apos;ve been building?
              </p>
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-glow-secondary transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to all projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
