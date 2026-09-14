// Internship program data — the source of truth for /internships and every
// /internships/:programSlug detail page. Do not hardcode program content
// inside page components; add or edit programs here only.
//
// Content integrity: every program describes what LUNEX TECH's internship
// experience is actually structured to offer. "Possible work" uses
// "may have the opportunity to" language deliberately — it names areas
// interns could contribute to depending on active projects, not guaranteed
// assignments. No specific technology is named unless it's one LUNEX TECH
// genuinely builds with (see src/lib/capabilities.ts).

export type ExplorationArea = {
  number: string;
  title: string;
  description: string;
};

export type ProgramPhase = {
  phase: string;
  title: string;
  description: string;
};

export type Program = {
  id: string;
  slug: string;
  number: string;
  /** Two-line display title, e.g. ["FRONTEND", "DEVELOPMENT"]. */
  title: [string, string];
  subheadline: string;
  shortDescription: string;
  description: string;
  duration: string;
  format: string;
  level: string;
  area: string;
  applicationsOpen: boolean;
  explorationAreas: ExplorationArea[];
  programPhases: ProgramPhase[];
  possibleWork: string[];
  targetAudience: {
    description: string;
    qualities: string[];
  };
};

export const PROGRAMS: Program[] = [
  {
    id: "frontend-development",
    slug: "frontend-development",
    number: "01",
    title: ["FRONTEND", "DEVELOPMENT"],
    subheadline: "Build the interfaces people interact with.",
    shortDescription: "Build modern interfaces and digital experiences.",
    description:
      "Explore modern frontend development and learn how digital interfaces are designed and built — from a single component to a full product experience.",
    duration: "3 MONTHS",
    format: "PROJECT BASED",
    level: "BEGINNER FRIENDLY",
    area: "FRONTEND DEVELOPMENT",
    applicationsOpen: true,
    explorationAreas: [
      {
        number: "01",
        title: "INTERFACE FUNDAMENTALS",
        description: "Understand the foundations of modern user interfaces.",
      },
      {
        number: "02",
        title: "RESPONSIVE DESIGN",
        description: "Explore how interfaces adapt across different devices.",
      },
      {
        number: "03",
        title: "COMPONENT THINKING",
        description: "Understand how modern interfaces are structured using reusable components.",
      },
      {
        number: "04",
        title: "UI IMPLEMENTATION",
        description: "Turn designs and ideas into working interfaces.",
      },
      {
        number: "05",
        title: "PROJECT WORK",
        description: "Apply your learning through practical work.",
      },
    ],
    programPhases: [
      { phase: "01", title: "ORIENTATION", description: "Understand the program, the workspace, and the objectives." },
      { phase: "02", title: "FOUNDATIONS", description: "Explore fundamental concepts and core skills." },
      { phase: "03", title: "PRACTICE", description: "Apply concepts through practical exercises." },
      { phase: "04", title: "PROJECT WORK", description: "Contribute to structured project work." },
      { phase: "05", title: "REVIEW", description: "Receive feedback and reflect on your progress." },
    ],
    possibleWork: ["USER INTERFACES", "WEB EXPERIENCES", "PRODUCT CONCEPTS", "DESIGN SYSTEMS", "PROTOTYPES"],
    targetAudience: {
      description: "This program is designed for students who are interested in exploring frontend development.",
      qualities: [
        "CURIOUS ABOUT TECHNOLOGY",
        "INTERESTED IN BUILDING INTERFACES",
        "WILLING TO LEARN",
        "OPEN TO FEEDBACK",
        "READY TO EXPLORE",
      ],
    },
  },
  {
    id: "backend-development",
    slug: "backend-development",
    number: "02",
    title: ["BACKEND", "DEVELOPMENT"],
    subheadline: "Build the systems that power real products.",
    shortDescription: "Explore the systems, logic, APIs, and infrastructure behind digital products.",
    description:
      "Explore how digital products actually run behind the interface — data, logic, APIs, and the infrastructure that keeps a real product working.",
    duration: "3 MONTHS",
    format: "PROJECT BASED",
    level: "FOUNDATIONAL",
    area: "BACKEND DEVELOPMENT",
    applicationsOpen: true,
    explorationAreas: [
      {
        number: "01",
        title: "SERVER FUNDAMENTALS",
        description: "Understand how a server receives, processes, and responds to requests.",
      },
      {
        number: "02",
        title: "DATA & DATABASES",
        description: "Explore how applications store, structure, and retrieve data.",
      },
      {
        number: "03",
        title: "API DESIGN",
        description: "Understand how frontend and backend systems communicate.",
      },
      {
        number: "04",
        title: "SYSTEM LOGIC",
        description: "Turn real requirements into working backend logic.",
      },
      {
        number: "05",
        title: "PROJECT WORK",
        description: "Apply your learning through practical work.",
      },
    ],
    programPhases: [
      { phase: "01", title: "ORIENTATION", description: "Understand the program, the workspace, and the objectives." },
      { phase: "02", title: "FOUNDATIONS", description: "Explore fundamental concepts and core skills." },
      { phase: "03", title: "PRACTICE", description: "Apply concepts through practical exercises." },
      { phase: "04", title: "PROJECT WORK", description: "Contribute to structured project work." },
      { phase: "05", title: "REVIEW", description: "Receive feedback and reflect on your progress." },
    ],
    possibleWork: ["API ENDPOINTS", "DATA MODELS", "INTERNAL TOOLS", "SYSTEM LOGIC", "PROTOTYPES"],
    targetAudience: {
      description: "This program is designed for students who are interested in exploring backend development.",
      qualities: [
        "CURIOUS ABOUT TECHNOLOGY",
        "INTERESTED IN HOW SYSTEMS WORK",
        "WILLING TO LEARN",
        "OPEN TO FEEDBACK",
        "READY TO EXPLORE",
      ],
    },
  },
  {
    id: "ai-machine-learning",
    slug: "ai-machine-learning",
    number: "03",
    title: ["AI & MACHINE", "LEARNING"],
    subheadline: "Explore intelligent systems, from idea to output.",
    shortDescription: "Explore artificial intelligence, machine learning, and intelligent systems.",
    description:
      "Explore artificial intelligence and machine learning through real, applied problems — from understanding models to working with intelligent systems.",
    duration: "3 MONTHS",
    format: "RESEARCH + PROJECTS",
    level: "FOUNDATIONAL",
    area: "AI & MACHINE LEARNING",
    applicationsOpen: true,
    explorationAreas: [
      {
        number: "01",
        title: "AI FUNDAMENTALS",
        description: "Understand the foundations of machine learning and intelligent systems.",
      },
      {
        number: "02",
        title: "DATA & MODELS",
        description: "Explore how data shapes the behavior of a model.",
      },
      {
        number: "03",
        title: "APPLIED AI",
        description: "Understand how AI is integrated into real products and workflows.",
      },
      {
        number: "04",
        title: "EXPERIMENTATION",
        description: "Test ideas, evaluate results, and iterate on approaches.",
      },
      {
        number: "05",
        title: "PROJECT WORK",
        description: "Apply your learning through practical work.",
      },
    ],
    programPhases: [
      { phase: "01", title: "ORIENTATION", description: "Understand the program, the workspace, and the objectives." },
      { phase: "02", title: "FOUNDATIONS", description: "Explore fundamental concepts and core skills." },
      { phase: "03", title: "PRACTICE", description: "Apply concepts through practical exercises." },
      { phase: "04", title: "PROJECT WORK", description: "Contribute to structured project work." },
      { phase: "05", title: "REVIEW", description: "Receive feedback and reflect on your progress." },
    ],
    possibleWork: ["AI INTEGRATIONS", "MODEL EXPERIMENTS", "INTELLIGENT ASSISTANTS", "RESEARCH NOTES", "PROTOTYPES"],
    targetAudience: {
      description: "This program is designed for students who are interested in exploring AI and machine learning.",
      qualities: [
        "CURIOUS ABOUT TECHNOLOGY",
        "INTERESTED IN AI & DATA",
        "WILLING TO LEARN",
        "OPEN TO FEEDBACK",
        "READY TO EXPLORE",
      ],
    },
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    number: "04",
    title: ["UI / UX", "DESIGN"],
    subheadline: "Design the experience behind every interaction.",
    shortDescription: "Design thoughtful digital experiences, interfaces, and product systems.",
    description:
      "Design thoughtful digital experiences and learn how interfaces, interactions, and product systems are shaped around real people and real problems.",
    duration: "3 MONTHS",
    format: "PROJECT BASED",
    level: "BEGINNER FRIENDLY",
    area: "UI / UX DESIGN",
    applicationsOpen: true,
    explorationAreas: [
      {
        number: "01",
        title: "DESIGN FUNDAMENTALS",
        description: "Understand the foundations of usable, intentional design.",
      },
      {
        number: "02",
        title: "USER-CENTERED THINKING",
        description: "Explore how real people's needs shape design decisions.",
      },
      {
        number: "03",
        title: "DESIGN SYSTEMS",
        description: "Understand how consistent visual language holds a product together.",
      },
      {
        number: "04",
        title: "PROTOTYPING",
        description: "Turn ideas into interactive, testable design work.",
      },
      {
        number: "05",
        title: "PROJECT WORK",
        description: "Apply your learning through practical work.",
      },
    ],
    programPhases: [
      { phase: "01", title: "ORIENTATION", description: "Understand the program, the workspace, and the objectives." },
      { phase: "02", title: "FOUNDATIONS", description: "Explore fundamental concepts and core skills." },
      { phase: "03", title: "PRACTICE", description: "Apply concepts through practical exercises." },
      { phase: "04", title: "PROJECT WORK", description: "Contribute to structured project work." },
      { phase: "05", title: "REVIEW", description: "Receive feedback and reflect on your progress." },
    ],
    possibleWork: ["USER INTERFACES", "DESIGN SYSTEMS", "PROTOTYPES", "PRODUCT CONCEPTS", "WEB EXPERIENCES"],
    targetAudience: {
      description: "This program is designed for students who are interested in exploring UI / UX design.",
      qualities: [
        "CURIOUS ABOUT TECHNOLOGY",
        "INTERESTED IN DESIGN & EXPERIENCE",
        "WILLING TO LEARN",
        "OPEN TO FEEDBACK",
        "READY TO EXPLORE",
      ],
    },
  },
  {
    id: "product-development",
    slug: "product-development",
    number: "05",
    title: ["PRODUCT", "DEVELOPMENT"],
    subheadline: "Explore how ideas become real products.",
    shortDescription: "Explore how ideas move from concept to real digital products.",
    description:
      "Explore how an idea becomes a real digital product — understanding problems, shaping direction, and coordinating design and technology toward one outcome.",
    duration: "3 MONTHS",
    format: "PRODUCT BASED",
    level: "FOUNDATIONAL",
    area: "PRODUCT DEVELOPMENT",
    applicationsOpen: true,
    explorationAreas: [
      {
        number: "01",
        title: "PRODUCT THINKING",
        description: "Understand how ideas are shaped into clear product direction.",
      },
      {
        number: "02",
        title: "PROBLEM FRAMING",
        description: "Explore how real problems are understood before building anything.",
      },
      {
        number: "03",
        title: "CROSS-FUNCTIONAL WORK",
        description: "Understand how design and technology come together around a product.",
      },
      {
        number: "04",
        title: "PRIORITIZATION",
        description: "Explore how decisions get made about what to build first.",
      },
      {
        number: "05",
        title: "PROJECT WORK",
        description: "Apply your learning through practical work.",
      },
    ],
    programPhases: [
      { phase: "01", title: "ORIENTATION", description: "Understand the program, the workspace, and the objectives." },
      { phase: "02", title: "FOUNDATIONS", description: "Explore fundamental concepts and core skills." },
      { phase: "03", title: "PRACTICE", description: "Apply concepts through practical exercises." },
      { phase: "04", title: "PROJECT WORK", description: "Contribute to structured project work." },
      { phase: "05", title: "REVIEW", description: "Receive feedback and reflect on your progress." },
    ],
    possibleWork: ["PRODUCT CONCEPTS", "ROADMAP NOTES", "USER INTERFACES", "PROTOTYPES", "WEB EXPERIENCES"],
    targetAudience: {
      description: "This program is designed for students who are interested in exploring product development.",
      qualities: [
        "CURIOUS ABOUT TECHNOLOGY",
        "INTERESTED IN HOW PRODUCTS ARE BUILT",
        "WILLING TO LEARN",
        "OPEN TO FEEDBACK",
        "READY TO EXPLORE",
      ],
    },
  },
  {
    id: "research-innovation",
    slug: "research-innovation",
    number: "06",
    title: ["RESEARCH &", "INNOVATION"],
    subheadline: "Explore what comes next before it's built.",
    shortDescription: "Explore emerging technologies, new ideas, experiments, and future possibilities.",
    description:
      "Explore emerging technologies and new ideas beyond a fixed brief — investigating possibilities, running small experiments, and asking what could come next.",
    duration: "FLEXIBLE",
    format: "RESEARCH BASED",
    level: "CURIOUS MINDS",
    area: "RESEARCH & INNOVATION",
    applicationsOpen: true,
    explorationAreas: [
      {
        number: "01",
        title: "TECHNOLOGY SCOUTING",
        description: "Understand how emerging tools and approaches get evaluated.",
      },
      {
        number: "02",
        title: "EXPERIMENTATION",
        description: "Explore ideas through small, focused experiments.",
      },
      {
        number: "03",
        title: "CRITICAL EVALUATION",
        description: "Understand how to judge whether an idea is worth pursuing further.",
      },
      {
        number: "04",
        title: "DOCUMENTATION",
        description: "Turn findings into clear, useful notes for future work.",
      },
      {
        number: "05",
        title: "PROJECT WORK",
        description: "Apply your learning through practical work.",
      },
    ],
    programPhases: [
      { phase: "01", title: "ORIENTATION", description: "Understand the program, the workspace, and the objectives." },
      { phase: "02", title: "FOUNDATIONS", description: "Explore fundamental concepts and core skills." },
      { phase: "03", title: "PRACTICE", description: "Apply concepts through practical exercises." },
      { phase: "04", title: "PROJECT WORK", description: "Contribute to structured project work." },
      { phase: "05", title: "REVIEW", description: "Receive feedback and reflect on your progress." },
    ],
    possibleWork: ["RESEARCH NOTES", "EXPERIMENTS", "AI INTEGRATIONS", "PRODUCT CONCEPTS", "PROTOTYPES"],
    targetAudience: {
      description: "This program is designed for students who are curious about emerging technology and new ideas.",
      qualities: [
        "CURIOUS ABOUT TECHNOLOGY",
        "INTERESTED IN WHAT'S NEXT",
        "WILLING TO LEARN",
        "OPEN TO FEEDBACK",
        "READY TO EXPLORE",
      ],
    },
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((program) => program.slug === slug);
}
