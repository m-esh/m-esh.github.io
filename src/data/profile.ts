/** Production origin. Metadata, canonicals and the sitemap all resolve from this. */
export const siteUrl = "https://mrdad.ca";

export const profile = {
  name: "Mehrdad Shariatmadari",
  initials: "MS",
  tagline: "Aspiring Mechatronics Engineer",
  location: "Toronto, Canada",
  // Meta description only: needs the location and field for search results,
  // and stays under ~160 characters so it isn't truncated.
  blurb:
    "Grade 12 student in Toronto headed for mechatronics engineering. I build things that move, sense, and respond, from competition robots to a drone you fly with your hand.",
  // Hero display line. Deliberately does not repeat the location or the field:
  // the eyebrow directly above it already reads "Toronto, Canada · Aspiring
  // Mechatronics Engineer", so this says what I actually build instead.
  heroLine:
    "I'm a Grade 12 student who builds robots, mechanisms, and the electronics that make them move.",
  longBio: [
    "I'm Mehrdad Shariatmadari, a Grade 12 student in Toronto aiming for mechatronics engineering, the place where mechanical design, electronics, and code have to meet.",
    "Most of my time goes to FRC Team 7902, where I help lead the manufacturing subdivision and drive at competition. The rest goes into build projects: a music box and a wearable chopstick I designed on my own, and a gesture-controlled drone I built with a friend.",
    "The rest of the week is lifeguarding for the City of Toronto, tutoring, and playing in my school's music program. The Kalimbinator came out of that last one: I wanted a machine that could play a phrase I liked, so I spent six rounds of CAD working out how to make a drum pluck it.",
  ],
  email: "mehrdad.shari@gmail.com",
  socials: {
    linkedin:
      "https://www.linkedin.com/in/mehrdad-shariatmadari",
  },
};

export type ExperienceItem = {
  /** The organisation leads: it's the thing a reader recognises first. */
  org: string;
  /** What I did there, shown beneath the organisation. */
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    org: "FRC Team 7902",
    role: "Manufacturing Subdivision Vice Lead · Drive Team",
    period: "Jun 2025-present",
    location: "Markham, ON",
    summary:
      "Helping lead the manufacturing subdivision through a competition robot build each season, while also stepping onto the field as part of the drive team.",
    highlights: [
      "Help run the manufacturing subdivision: planning builds, assigning tasks, and keeping CAD designs on track",
      "Use CAD and quick prototyping to solve mechanical problems within the competition's rules",
      "Operate the robot on the field as part of the drive team and adjust strategy between matches at regional events",
    ],
  },
  {
    role: "Mechanical Assembler",
    org: "MicroArt Services Inc.",
    period: "Jul 2025-Sep 2025",
    location: "Markham, ON",
    summary:
      "Built PCB-based electronics for emergency response equipment on the assembly floor, where every finished unit had to clear inspection before it shipped.",
    highlights: [
      "Assembled PCB-based electronic devices built for emergency response applications",
      "Ran final quality inspections and functionality tests to confirm each unit met manufacturing specs",
      "Logged finished units for tracking and inventory, then packaged them for shipment",
    ],
  },
  {
    role: "Lifeguard",
    org: "City of Toronto",
    period: "2025-present",
    location: "Toronto, ON",
    summary:
      "Watching over swimmers at municipal pools, staying alert and ready to step in the moment something needs attention.",
    highlights: [
      "Monitor pool activity and respond to emergencies following lifesaving and first-aid protocols",
      "Stay in constant contact with a team of guards and instructors to keep the facility running safely",
      "Built up the habit of staying calm, reading a situation fast, and acting on it without hesitation",
    ],
  },
  {
    org: "VEX Team 10801 Trubotics",
    role: "Mechanical & CAD Division",
    period: "Sep 2024-Nov 2025",
    location: "Markham, ON",
    summary:
      "Spent a season designing and building competition robot mechanisms in Fusion 360, then reworking them until they held up under real match conditions.",
    highlights: [
      "Designed and refined robot mechanisms in Fusion 360 for VEX competition events",
      "Built and assembled mechanical systems with an eye for precision and durability under match conditions",
      "Worked with teammates to retest and adjust designs based on feedback from practice runs and regional competitions",
    ],
  },
  {
    role: "Ensemble Representative & Senior Webmaster",
    org: "Trudeau Music Council",
    period: "Sep 2025-present",
    location: "Markham, ON",
    summary:
      "Started out representing my ensemble on the school's music council, and have since taken on running the council's website day to day.",
    highlights: [
      "Represent my ensemble at council meetings, passing updates and feedback back and forth",
      "Manage and update the music council's website, from content changes to layout fixes",
      "Keep the site running for the whole council, troubleshooting issues and adding new pages as they come up",
    ],
  },
  {
    role: "Tutor",
    org: "Trudeau Tutoring & Co.",
    period: "Sep 2025-present",
    location: "Markham, ON",
    summary:
      "Working one-on-one with fellow students to break down material they're stuck on until it actually clicks.",
    highlights: [
      "Walk students through concepts they're struggling with at a pace that fits how they learn",
      "Build practice problems and review sessions to help them prepare for tests and assignments",
      "Check in regularly to track progress and adjust the approach as their understanding grows",
    ],
  },
  {
    role: "Newspaper Carrier",
    org: "Markham Economist & Sun",
    period: "Jul 2023-Sep 2023",
    location: "Markham, ON",
    summary:
      "A summer route delivering papers door to door across local neighborhoods, rain or shine.",
    highlights: [
      "Planned and adjusted delivery routes for over 100 homes to keep the run efficient",
      "Packaged and weatherproofed papers before heading out regardless of the forecast",
      "Handled delivery issues directly, like missed papers and address changes, and kept the route running smoothly",
    ],
  },
];

export type Shot = {
  src: string;
  alt: string;
  /** `contain` plates a CAD render instead of cropping it. */
  fit?: "cover" | "contain";
  /** Overrides a featured row's default framing when a tighter crop would
   *  cut the subject out — the FRC match photo loses the robot at 16/9. */
  ratio?: "16/9" | "4/3" | "3/2";
  /** Anchor for a cover crop when the subject isn't centred (CSS object-position). */
  position?: string;
};

export type ProjectItem = {
  title: string;
  /** One line: what the object is and the thing that makes it distinctive.
   *  Detail belongs on the case study, not here. */
  description: string;
  year: string;
  /** Tools and disciplines, rendered as a single understated line. */
  tags: string[];
  /** `featured` gets a full-width row; `build` and `other` share a compact
   *  two-column grid, with the screen-only work grouped last so the page
   *  leads with the physical engineering it's about. */
  tier: "featured" | "build" | "other";
  /** Featured rows only: `pair` for objects that need two views, `single`
   *  for one photograph. Compact cards always show the first shot. */
  composition?: "pair" | "single";
  shots: Shot[];
  /** Named when the work wasn't solo, so team and independent projects
   *  can't be mistaken for each other. */
  credit?: string;
  links?: { label: string; href: string }[];
  /** True when the only destination is someone else's site, not a case study. */
  external?: boolean;
};

export const projects: ProjectItem[] = [
  {
    title: "Gesture-Controlled Drone",
    description:
      "A 3D-printed ducted drone flown by curling your fingers inside a sensor glove, instead of a two-stick transmitter.",
    year: "2026",
    tags: ["CAD", "3D printing", "ESP32", "Betaflight"],
    credit: "Built with a friend",
    tier: "featured",
    // Two views, because neither half explains the project alone: the glove
    // never showed the aircraft it flies, and the aircraft never showed why
    // it's unusual.
    composition: "pair",
    shots: [
      {
        src: "/projects/drone/frame-assembled.jpg",
        alt: "The assembled 3D-printed drone with four ducted propellers and its flight controller",
      },
      {
        src: "/projects/drone/glove.jpg",
        alt: "The flex-sensor glove that controls the drone, wired to an ESP32",
      },
    ],
    links: [{ label: "View case study", href: "/projects/drone" }],
  },
  {
    title: "FRC 7902 Competition Robot",
    description:
      "The robot our team builds each season. I'm vice lead of the manufacturing subdivision, I design parts in CAD, and I drive at regionals.",
    year: "2025-present",
    tags: ["CAD", "Prototyping", "Drive team"],
    credit: "Team build",
    tier: "featured",
    composition: "single",
    shots: [
      {
        src: "/projects/frc/robot-2026-rebuilt.jpg",
        alt: "FRC Team 7902's robot loaded with game pieces during a 2026 REBUILT match",
        // The photograph's own proportions: cropping it to 16/9 framed the
        // field rail and pushed the robot out of shot.
        ratio: "3/2",
      },
    ],
    links: [
      // Kept short: the long form wrapped onto two lines in the card footer.
      { label: "The Blue Alliance profile", href: "https://www.thebluealliance.com/team/7902" },
    ],
    external: true,
  },
  {
    title: "Kalimbinator",
    description:
      "A hand-cranked music box built around a re-tuned kalimba, where a 3D-printed peg drum plucks the tines to play a melody.",
    year: "2026",
    tags: ["CAD", "3D printing", "Mechanism design"],
    tier: "build",
    shots: [
      {
        src: "/projects/kalimbinator/cad-render.png",
        alt: "CAD render of the Kalimbinator hand-crank music box",
        fit: "contain",
      },
    ],
    links: [{ label: "View case study", href: "/projects/kalimbinator" }],
  },
  {
    title: "Chopstick Ring",
    description:
      "A finger-worn chopstick that swings down to eat and folds flat against your hand when you're done, on a single pivot.",
    year: "2025",
    tags: ["CAD", "3D printing", "Hinge design"],
    tier: "build",
    shots: [
      {
        src: "/projects/chopstick-ring/prototype-eating-mode.jpg",
        alt: "Chopstick Ring prototype open in eating position, the arm swung down from the finger rings",
      },
    ],
    links: [{ label: "View case study", href: "/projects/chopstick-ring" }],
  },
  {
    title: "iPhone Commercial",
    description:
      "A concept ad for the iPhone 16 Pro Max, modeled and animated in Blender, cut and graded in DaVinci Resolve.",
    year: "2025",
    tags: ["Blender", "3D animation", "DaVinci Resolve"],
    tier: "other",
    shots: [
      {
        src: "/projects/first-light/poster.jpg",
        alt: "A CG-rendered iPhone with its telephoto camera lenses exploded apart, from a self-made concept product ad",
        // The on-screen title sits on the right third; a centred 4/3 crop
        // cut it off mid-word.
        position: "80% 50%",
      },
    ],
    links: [{ label: "View case study", href: "/projects/first-light" }],
  },
  {
    title: "Sightline",
    description:
      "A top-down stealth shooter built solo in Java with Greenfoot, built around a flashlight that decides what you can see and what's about to see you.",
    year: "2026",
    tags: ["Java", "Greenfoot", "Object-oriented programming"],
    tier: "other",
    shots: [
      {
        src: "/projects/sightline/poster.jpg",
        alt: "Sightline title screen: two SWAT operators breaching a dark doorway with a flashlight beam, tagline 'Fear what you cannot see'",
      },
    ],
    links: [{ label: "View case study", href: "/projects/sightline" }],
  },
];

export type CertificationItem = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: CertificationItem[] = [
  {
    name: "Karate Black Belt",
    issuer: "Northern Karate Schools",
    year: "2026",
  },
  {
    name: "National Lifeguard (NL)",
    issuer: "Lifesaving Society",
    year: "2025-2027",
  },
  {
    name: "Standard First Aid & CPR/AED",
    issuer: "Lifesaving Society",
    year: "2024-2027",
  },
];
