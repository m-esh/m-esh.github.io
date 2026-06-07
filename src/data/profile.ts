export const profile = {
  name: "Mehrdad Shariatmadari",
  initials: "MS",
  tagline: "Aspiring Mechatronics Engineer",
  location: "Toronto, Canada",
  blurb:
    "Grade 11 student building things that move, sense, and respond — from FIRST Robotics competition robots to lifesaving on the water. Curious about where mechanical design, electronics, and code meet.",
  longBio: [
    "I'm Mehrdad — a high-school student in Toronto with a growing obsession with mechatronics: the place where mechanical systems, electronics, and software collide to make something actually do things.",
    "By day (and many evenings), I work as a lifeguard for the City of Toronto, keeping people safe in and around the water. By night, I'm usually deep in CAD files, wiring diagrams, or code for FRC Team 7902 — building competition robots from scratch with a team that pushes me to think like an engineer.",
    "I'm drawn to projects that force me to learn fast: designing a mechanism that has to survive a 2-minute match, debugging a motor controller at 11pm before an event, or just figuring out why a sensor keeps lying to me. I want to keep building toward a future in mechatronics engineering.",
  ],
  email: "shahdad.sh2012@gmail.com",
  socials: {
    linkedin:
      "https://www.linkedin.com/in/mehrdad-shariatmadari",
    github: "https://github.com/m-esh",
  },
  resumeUrl: "#",
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Lifeguard",
    org: "City of Toronto",
    period: "2024 — Present",
    location: "Toronto, ON",
    summary:
      "Responsible for the safety of swimmers at municipal pools and waterfronts — staying sharp, calm, and ready to act under pressure.",
    highlights: [
      "Monitor pool activity and respond to emergencies following lifesaving and first-aid protocols",
      "Communicate constantly with a team of guards and instructors to keep facilities running safely",
      "Built habits around vigilance, quick decision-making, and staying composed when it matters most",
    ],
    tags: ["Public Safety", "First Aid & CPR", "Teamwork"],
  },
  {
    role: "Robotics Team Member — FRC 7902",
    org: "FIRST Robotics Competition",
    period: "2023 — Present",
    location: "Toronto, ON",
    summary:
      "Member of FRC Team 7902, designing, building, wiring, and programming competition robots within tight season deadlines.",
    highlights: [
      "Collaborate across mechanical, electrical, and software sub-teams to ship a working robot every build season",
      "Apply CAD design and rapid prototyping to solve real mechanical constraints under competition rules",
      "Compete at regional events, iterating on the robot between matches based on what actually breaks",
    ],
    tags: ["Robotics", "CAD", "Electronics", "Teamwork"],
  },
];

export type ProjectItem = {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  year: string;
  links?: { label: string; href: string }[];
  accent: string;
};

export const projects: ProjectItem[] = [
  {
    title: "FRC 7902 Competition Robot",
    description:
      "Season-long build of a competition robot — from CAD concept to a machine that drives, scores, and survives elimination matches.",
    longDescription:
      "Worked across the mechanical and electrical sub-teams on the team's annual FIRST Robotics Competition entry — contributing to drivetrain design, wiring, and on-the-fly repairs between matches at regional competitions.",
    tags: ["CAD", "Robotics", "Electronics", "Team Project"],
    year: "2024 – 2025",
    links: [{ label: "FRC Team 7902", href: "https://www.thebluealliance.com/team/7902" }],
    accent: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "This site — designed and built from scratch with Next.js, Tailwind CSS, and shadcn/ui to showcase my work and experience.",
    longDescription:
      "A from-the-ground-up personal site exploring scroll-driven storytelling, motion design, and a clean dark interface — built as a place to keep growing as I take on new projects.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    links: [{ label: "View Source", href: "https://github.com/m-esh/m-esh.github.io" }],
    accent: "from-indigo-500/30 via-purple-500/10 to-transparent",
  },
  {
    title: "Add your next project",
    description:
      "This space is reserved for the next build — a mechanism, a circuit, a piece of code, or anything you're proud of.",
    longDescription:
      "Swap this card out as new projects come together. The layout is built to scale with as many entries as you add.",
    tags: ["Coming Soon"],
    year: "2026",
    accent: "from-purple-500/20 via-violet-500/5 to-transparent",
  },
];

export type CertificationItem = {
  name: string;
  issuer: string;
  year: string;
  description: string;
};

export const certifications: CertificationItem[] = [
  {
    name: "National Lifeguard (NL)",
    issuer: "Lifesaving Society",
    year: "2024",
    description:
      "Certification covering water rescue, surveillance, and emergency response — the foundation of lifeguarding work.",
  },
  {
    name: "Standard First Aid & CPR/AED",
    issuer: "Canadian Red Cross",
    year: "2024",
    description:
      "Comprehensive first-aid and cardiopulmonary resuscitation training for emergency situations on and off duty.",
  },
  {
    name: "Lifesaving Instructor",
    issuer: "Lifesaving Society",
    year: "In Progress",
    description:
      "Working toward certification to train and evaluate the next generation of lifeguards and swimmers.",
  },
];

export const skills = [
  "CAD Design",
  "Robotics",
  "Electronics & Wiring",
  "Programming",
  "Problem Solving",
  "First Aid & CPR",
  "Team Leadership",
  "Mechanical Design",
];

export const stats = [
  { label: "Grade", value: "11" },
  { label: "FRC Team", value: "7902" },
  { label: "Lifeguard since", value: "2024" },
  { label: "Field", value: "Mechatronics" },
];
