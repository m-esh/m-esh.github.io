export const profile = {
  name: "Mehrdad Shariatmadari",
  initials: "MS",
  tagline: "Aspiring Mechatronics Engineer",
  location: "Toronto, Canada",
  blurb:
    "A grade 11 student who likes building things that move, sense, and respond. Some weeks that means wiring a competition robot with FRC Team 7902, other times it means watching over swimmers as a city lifeguard. Always curious about where mechanical design, electronics, and code come together.",
  longBio: [
    "I'm Mehrdad, a high school student in Toronto with a growing pull toward mechatronics: the field where mechanical systems, electronics, and software come together to make something actually do things.",
    "Most weeks split between two pretty different worlds. As a lifeguard for the City of Toronto, I keep an eye on swimmers and stay ready to act the moment something goes wrong. As part of FRC Team 7902, I help design, wire, and program competition robots with a team that pushes me to think like an engineer rather than just follow instructions.",
    "What I enjoy most is the kind of project that forces me to learn quickly: shaping a part that has to survive a two-minute match, tracking down a wiring fault the night before an event, or working out why a sensor keeps reading something it shouldn't. Step by step, that's what's pulling me toward a future in mechatronics engineering.",
  ],
  email: "mehrdad.shari@gmail.com",
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
    period: "2025 to present",
    location: "Toronto, ON",
    summary:
      "Watching over swimmers at municipal pools, staying alert and ready to step in the moment something needs attention.",
    highlights: [
      "Monitor pool activity and respond to emergencies following lifesaving and first-aid protocols",
      "Stay in constant contact with a team of guards and instructors to keep the facility running safely",
      "Built up the habit of staying calm, reading a situation fast, and acting on it without hesitation",
    ],
    tags: ["Public Safety", "First Aid & CPR", "Teamwork"],
  },
  {
    role: "Mechanical Sub-Team Vice Lead & Drive Team, FRC Team 7902",
    org: "FIRST Robotics Competition",
    period: "2025 to present",
    location: "Toronto, ON",
    summary:
      "Helping lead the mechanical side of a competition robot build each season, while also stepping onto the field as part of the drive team.",
    highlights: [
      "Help run the mechanical sub-team: planning builds, assigning tasks, and keeping CAD designs on track",
      "Use CAD and quick prototyping to solve mechanical problems within the competition's rules",
      "Operate the robot on the field as part of the drive team and adjust strategy between matches at regional events",
    ],
    tags: ["Robotics", "CAD", "Mechanical Design", "Leadership"],
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
      "A season-long build that starts as a CAD sketch and ends as a machine that has to drive, score, and survive elimination matches.",
    longDescription:
      "I worked across the mechanical and electrical groups on our FIRST Robotics Competition entry, helping with drivetrain design, wiring, and the repairs that always seem to come up between matches at regional events.",
    tags: ["CAD", "Robotics", "Electronics", "Team Project"],
    year: "2024 to 2025",
    links: [{ label: "FRC Team 7902", href: "https://www.thebluealliance.com/team/7902" }],
    accent: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
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
      "Covers water rescue, surveillance, and emergency response: the foundation that the rest of lifeguarding builds on.",
  },
  {
    name: "Standard First Aid & CPR/AED",
    issuer: "Canadian Red Cross",
    year: "2024",
    description:
      "First aid and CPR training for handling emergencies, whether they happen on shift or somewhere else entirely.",
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
