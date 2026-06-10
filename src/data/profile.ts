export const profile = {
  name: "Mehrdad Shariatmadari",
  initials: "MS",
  tagline: "Aspiring Mechatronics Engineer",
  location: "Toronto, Canada",
  blurb:
    "Grade 11 student building things that move, sense, and respond, from competition robots each season to lifeguarding through the summer.",
  longBio: [
    "I'm Mehrdad, a grade 11 student in Toronto with my sights set on mechatronics engineering, the field where mechanical systems, electronics, and code all come together.",
    "Most weeks split between lifeguarding for the City of Toronto and building competition robots with FRC Team 7902. Different worlds, same lesson: stay calm, pay attention, get it right.",
  ],
  email: "mehrdad.shari@gmail.com",
  socials: {
    linkedin:
      "https://www.linkedin.com/in/mehrdad-shariatmadari",
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
    role: "Mechanical Division Vice Lead & Drive Team, FRC Team 7902",
    org: "FIRST Robotics Competition",
    period: "Jun 2025–present",
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
    period: "Jul 2025–Sep 2025",
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
    role: "Mechanical & CAD Division, VEX Team 10801 Trubotics",
    org: "VEX Robotics",
    period: "Sep 2024–Nov 2025",
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
    period: "Sep 2025–present",
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
    period: "Sep 2025–present",
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
    period: "Jul 2023–Sep 2023",
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
  links?: { label: string; href: string }[];
};

export const projects: ProjectItem[] = [
  {
    title: "Custom Drone",
    description:
      "A drone designed and built from the ground up with a friend — frame, propulsion, and flight tuning, taken from parts list to first flight.",
    year: "2026",
  },
  {
    title: "Kalimbinator",
    description:
      "A hand-crank music box, built around a re-tuned kalimba and a custom 3D-printed drum, that plays the opening of the tenor sax solo from Omar Thomas' Come Sunday.",
    year: "2026",
    links: [{ label: "View case study", href: "/projects/kalimbinator" }],
  },
  {
    title: "Chopstick Ring",
    description:
      "A finger-worn chopstick that flips between an eating utensil and a flat fold against your fingers, modeled in CAD, 3D printed, and assembled by hand.",
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
