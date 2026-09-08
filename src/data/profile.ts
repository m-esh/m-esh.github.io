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
    "I'm Mehrdad, a Grade 12 student in Toronto aiming for mechatronics engineering, the place where mechanical design, electronics, and code have to meet.",
    "Most of my time goes to FRC Team 7902, where I help lead the mechanical division and drive at competition. The rest goes into build projects: a music box and a wearable chopstick I designed on my own, and a gesture-controlled drone I built with a friend.",
    "The rest of the week is lifeguarding for the City of Toronto, tutoring, and playing in my school's music program. Guarding a pool turns out to be good engineering practice: stay calm, read the situation fast, act before it gets worse.",
  ],
  email: "mehrdad.shari@gmail.com",
  socials: {
    linkedin:
      "https://www.linkedin.com/in/mehrdad-shariatmadari",
  },
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Mechanical Division Vice Lead & Drive Team, FRC Team 7902",
    org: "FIRST Robotics Competition",
    period: "Jun 2025-present",
    location: "Markham, ON",
    summary:
      "Helping lead the mechanical side of a competition robot build each season, while also stepping onto the field as part of the drive team.",
    highlights: [
      "Help run the mechanical division: planning builds, assigning tasks, and keeping CAD designs on track",
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
    role: "Mechanical & CAD Division, VEX Team 10801 Trubotics",
    org: "VEX Robotics",
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

export type ProjectItem = {
  title: string;
  description: string;
  year: string;
  /** Tools and disciplines the project actually used. Kept short: 3-4 max. */
  tags: string[];
  /** `fit: "contain"` frames a CAD render as a plate instead of letting its
   *  white background bleed to the card edge. */
  image?: { src: string; alt: string; fit?: "cover" | "contain" };
  /** Optional companion shot. The featured card pairs the two side by side
   *  when a project isn't legible from a single photo. */
  image2?: { src: string; alt: string; fit?: "cover" | "contain" };
  links?: { label: string; href: string }[];
  /** True when the only destination is someone else's site, not a case study. */
  external?: boolean;
};

export const projects: ProjectItem[] = [
  {
    title: "Gesture-Controlled Drone",
    description:
      "A 3D-printed ducted drone flown by curling your fingers inside a sensor glove, instead of a two-stick transmitter. Built with a friend.",
    year: "2026",
    tags: ["CAD", "3D printing", "ESP32", "Betaflight"],
    // Two shots, because neither half explains the project alone: the glove
    // close-up alone never showed the aircraft it flies.
    image: {
      src: "/projects/drone/frame-assembled.jpg",
      alt: "The assembled 3D-printed drone with four ducted propellers and its flight controller",
    },
    image2: {
      src: "/projects/drone/glove.jpg",
      alt: "The flex-sensor glove that controls the drone, wired to an ESP32",
    },
    links: [{ label: "View case study", href: "/projects/drone" }],
  },
  {
    title: "Kalimbinator",
    description:
      "A hand-cranked music box built around a re-tuned kalimba, where a 3D-printed peg drum plucks the tines to play a melody.",
    year: "2026",
    tags: ["CAD", "3D printing", "Mechanism design"],
    image: {
      src: "/projects/kalimbinator/cad-render.png",
      alt: "CAD render of the Kalimbinator hand-crank music box",
      // The render is on a white ground; contained and padded it reads as a
      // drawing plate rather than a blown-out photo against the dark UI.
      fit: "contain",
    },
    links: [{ label: "View case study", href: "/projects/kalimbinator" }],
  },
  {
    title: "Chopstick Ring",
    description:
      "A finger-worn chopstick that swings down to eat and folds flat against your hand when you're done, on a single pivot.",
    year: "2025",
    tags: ["CAD", "3D printing", "Hinge design"],
    image: {
      src: "/projects/chopstick-ring/prototype-eating-mode.jpg",
      alt: "Chopstick Ring prototype worn in eating mode",
    },
    links: [{ label: "View case study", href: "/projects/chopstick-ring" }],
  },
  {
    title: "FRC 7902 Competition Robot",
    description:
      "A team build I work on as mechanical division vice lead, from CAD and prototyping to driving the robot at regional events.",
    year: "2025-present",
    tags: ["CAD", "Prototyping", "Drive team"],
    image: {
      src: "/projects/frc/robot-2026-rebuilt.jpg",
      alt: "FRC Team 7902's robot loaded with game pieces during a 2026 REBUILT match",
    },
    links: [
      {
        label: "Team profile on The Blue Alliance",
        href: "https://www.thebluealliance.com/team/7902",
      },
    ],
    external: true,
  },
];

export type CertificationItem = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: CertificationItem[] = [
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
  {
    name: "Bronze Cross",
    issuer: "Lifesaving Society",
    year: "2024",
  },
];
