export const profile = {
  name: "Mehrdad Shariatmadari",
  initials: "MS",
  tagline: "Aspiring Mechatronics Engineer",
  location: "Toronto, Canada",
  blurb:
    "Grade 11 student building things that move, sense, and respond — competition robots by season, lifeguarding by summer.",
  longBio: [
    "I'm Mehrdad, a high school student in Toronto chasing mechatronics — where mechanical systems, electronics, and code meet.",
    "Most weeks split between lifeguarding for the City of Toronto and building competition robots with FRC Team 7902. Different worlds, same lesson: stay calm, pay attention, get it right.",
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
};

export const experience: ExperienceItem[] = [
  {
    role: "Lifeguard",
    org: "City of Toronto",
    period: "2025–present",
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
    role: "Mechanical Division Vice Lead & Drive Team, FRC Team 7902",
    org: "FIRST Robotics Competition",
    period: "2025–present",
    location: "Toronto, ON",
    summary:
      "Helping lead the mechanical side of a competition robot build each season, while also stepping onto the field as part of the drive team.",
    highlights: [
      "Help run the mechanical division: planning builds, assigning tasks, and keeping CAD designs on track",
      "Use CAD and quick prototyping to solve mechanical problems within the competition's rules",
      "Operate the robot on the field as part of the drive team and adjust strategy between matches at regional events",
    ],
  },
];

export type ProjectItem = {
  title: string;
  description: string;
  year: string;
  links?: { label: string; href: string }[];
};

export const projects: ProjectItem[] = [
  {
    title: "Chopstick Ring",
    description:
      "A finger-worn chopstick that flips between an eating utensil and a flat fold against your fingers — modeled in CAD, 3D printed, and assembled by hand.",
    year: "2025",
    links: [{ label: "View case study", href: "/projects/chopstick-ring" }],
  },
  {
    title: "FRC 7902 Competition Robot",
    description:
      "A season-long build that starts as a CAD sketch and ends as a machine that has to drive, score, and survive elimination matches.",
    year: "2025–present",
    links: [{ label: "FRC Team 7902", href: "https://www.thebluealliance.com/team/7902" }],
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
    year: "2025–2027",
  },
  {
    name: "Standard First Aid & CPR/AED",
    issuer: "Lifesaving Society",
    year: "2024–2027",
  },
  {
    name: "Bronze Cross",
    issuer: "Lifesaving Society",
    year: "2024",
  },
];
