import type { Metadata } from "next";
import { Hand, Keyboard } from "lucide-react";

import { ScrollProgress } from "@/components/scroll-progress";
import { TiltCard } from "@/components/tilt-card";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudyFooter } from "@/components/case-study-footer";
import { type GalleryItem } from "./project-gallery";
import { PartsDiagram, type DiagramPart } from "./parts-diagram";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "anatomy", label: "Anatomy" },
];

export const metadata: Metadata = {
  title: "Chopstick Ring · Mehrdad Shariatmadari",
  description:
    "A finger-worn chopstick that flips between an eating utensil and a flat fold against your fingers, sketched, modeled in CAD, 3D printed, and assembled by hand.",
};

const cadSheets: GalleryItem[] = [
  {
    src: "/projects/chopstick-ring/cad-sheet-1-overview.jpg",
    alt: "Orthographic CAD sheet showing the full Chopstick Ring assembly with overall dimensions",
    title: "Assembly overview, sheet 1 of 6",
    description:
      "Front, side, and isometric views of the finished assembly with overall dimensions called out: 208 mm tip-to-ring, 25.5 mm across the ring mount.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-2-arm.jpg",
    alt: "Orthographic CAD sheet of the chopstick arm component with dimensions",
    title: "Chopstick arm, sheet 2 of 6",
    description:
      "The 150 mm main arm, the part that actually does the eating. Drilled for the Ø6.5 mm pivot at one end and a Ø4 mm locating pin near the tip.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-3-bracket.jpg",
    alt: "Orthographic CAD sheet of the hinge bracket component with dimensions",
    title: "Hinge bracket, sheet 3 of 6",
    description:
      "A 50 mm bracket that bridges the ring and the arm. It houses the Ø6.5 mm pivot bore and the Ø8 mm counterbore that the pin's head seats into.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-4-ring.jpg",
    alt: "Orthographic CAD sheet of the finger ring component with dimensions",
    title: "Finger ring, sheet 4 of 6",
    description:
      "The wearable ring itself, Ø25.5 mm outside and Ø21.5 mm inside, sized to sit comfortably on an average adult finger and printed as its own part.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-5-pin.jpg",
    alt: "Orthographic CAD sheet of the pivot pin component, drawn at 8:1 scale",
    title: "Pivot pin, sheet 5 of 6",
    description:
      "A small T-shaped pin (drawn at 8:1 to keep the dimensions legible) that passes through the bracket and bushing and lets the arm rotate smoothly at the hinge.",
  },
  {
    src: "/projects/chopstick-ring/cad-sheet-6-bushing.jpg",
    alt: "Orthographic CAD sheet of the pivot bushing component, drawn at 8:1 scale",
    title: "Pivot bushing, sheet 6 of 6",
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
    labelX: 10,
    labelY: 92,
    item: cadSheets[3],
  },
  {
    number: 2,
    name: "Hinge bracket",
    blurb: "Bridges the ring and the arm, housing the pivot bore.",
    x: 36,
    y: 54,
    labelX: 16,
    labelY: 26,
    item: cadSheets[2],
  },
  {
    number: 3,
    name: "Pivot pin",
    blurb: "T-shaped pin that lets the arm rotate at the hinge.",
    x: 33,
    y: 60,
    labelX: 50,
    labelY: 45,
    item: cadSheets[4],
  },
  {
    number: 4,
    name: "Bushing",
    blurb: "Thin sleeve that keeps the pivot spinning freely.",
    x: 40,
    y: 60,
    labelX: 76,
    labelY: 88,
    item: cadSheets[5],
  },
  {
    number: 5,
    name: "Chopstick arm",
    blurb: "The 150 mm business end that actually picks up food.",
    x: 65,
    y: 26,
    labelX: 90,
    labelY: 10,
    item: cadSheets[1],
  },
];

export default function ChopstickRingPage() {
  return (
    <>
      <ScrollProgress />

      <CaseStudyNav sections={sections} />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 lg:px-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.18em]">Case Study · 2025</span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Chopstick Ring
            </h1>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A finger-worn chopstick that flips from an eating utensil to a flat fold
              against your fingers in one motion, so you can eat lunch at your desk
              without getting food on your hands or your keyboard.
            </p>
            <dl className="mt-2 grid grid-cols-3 gap-4 pt-5 text-sm sm:max-w-md">
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
                {/* Five distinct parts are modeled and dimensioned (arm,
                    bracket, ring, pin, bushing) across six drawing sheets, the
                    first being the assembly overview. The old "6-piece" figure
                    matched the sheet count, not the part count. */}
                <dd className="font-medium">5 modeled parts</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The problem
              </h2>
              <p className="text-balance leading-relaxed text-muted-foreground">
                Eating lunch at a desk usually means a trade-off: eat with your hands and
                risk leaving food residue on your keyboard, or set your work aside
                entirely. Neither option is great when you&apos;re trying to get through the
                day without a break in focus, or in your meal.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The design
              </h2>
              <p className="text-balance leading-relaxed text-muted-foreground">
                The Chopstick Ring lives on two fingers. A pivoting arm swings down into
                an eating position when you need it, then folds back flat against your
                hand when you don&apos;t, staying clean, out of the way, and always within reach. I
                worked through the geometry in CAD, dimensioned every part, then
                3D printed and hand-assembled the prototype with metal pins and rings.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Two positions, one hinge
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              The whole design comes down to a single pivot. Rotate the arm one way and
              it&apos;s a utensil; rotate it back and it&apos;s out of your way.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/chopstick-ring/prototype-typing-mode.jpg"
                    alt="The Chopstick Ring pivoted down into its eating position"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <Hand className="size-3.5" /> Eating mode
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pivot the arm down and the two halves meet at an angle you can pinch
                    food with, just like a normal pair of chopsticks, except they never
                    leave your hand.
                  </p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/chopstick-ring/prototype-eating-mode.jpg"
                    alt="The Chopstick Ring opened flat into its resting position"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <Keyboard className="size-3.5" /> Typing mode
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Swing the arm back flat against your fingers and a pair of small
                    embedded magnets click into place, holding it snug against your hand
                    so it stays put, out of the way and ready, while you type.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anatomy / parts diagram */}
        <section id="anatomy" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.18em]">Anatomy</span>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Tap a label to open its drawing
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              Every part below was modeled and dimensioned to scale before it was
              printed. Click any arrow, or its label, to pop open that part&apos;s
              fully dimensioned CAD sheet, with a short note on what it actually does.
            </p>

            <div className="mt-10">
              <PartsDiagram
                image="/projects/chopstick-ring/cad-render.jpg"
                alt="3D rendered CAD model of the Chopstick Ring with its parts called out"
                parts={diagramParts}
              />
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <CaseStudyFooter next={{ href: "/projects/drone", label: "Gesture-Controlled Drone" }} />
          </div>
        </section>
      </main>
    </>
  );
}
