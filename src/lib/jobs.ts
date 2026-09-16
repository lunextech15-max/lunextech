// Open role data — the source of truth for /careers, /careers/:jobSlug, and
// /careers/apply/:jobSlug. Mock data for now, deliberately shaped so the
// Admin Panel can later own this list (create/edit/open/close/delete) —
// see LUNEX TECH — ADMIN COMMAND CENTER master prompt, Job Management.
// Do not hardcode job content inside page components; add or edit jobs here.

export type JobStatus = "OPEN" | "CLOSED" | "DRAFT";

export type JobRequirement = {
  required: string[];
  niceToHave: string[];
};

export type Job = {
  id: string;
  slug: string;
  number: string;
  /** Two-line display title, e.g. ["FRONTEND", "DEVELOPER"]. */
  title: [string, string];
  subtitle: string;
  description: string;
  department: "ENGINEERING" | "DESIGN" | "PRODUCT" | "AI & RESEARCH" | "OPERATIONS";
  employmentType: string;
  location: string;
  experienceLevel: string;
  status: JobStatus;
  responsibilities: { number: string; title: string; description: string }[];
  requirements: JobRequirement;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  /** ISO date. Optional — omit rather than invent one; Google downranks JobPosting listings with no validThrough, so set this once there's a real application deadline. */
  validThrough?: string;
};

export const DEPARTMENTS = ["ALL", "ENGINEERING", "DESIGN", "PRODUCT", "AI & RESEARCH", "OPERATIONS"] as const;

export const JOBS: Job[] = [
  {
    id: "JOB-001",
    slug: "frontend-developer",
    number: "01",
    title: ["FRONTEND", "DEVELOPER"],
    subtitle: "Build digital experiences that people interact with.",
    description:
      "As a Frontend Developer, you may contribute to the development of modern digital products and interfaces — working with designers and other developers to turn ideas into real, working experiences.",
    department: "ENGINEERING",
    employmentType: "FULL TIME",
    location: "REMOTE / AS SPECIFIED",
    experienceLevel: "AS REQUIRED",
    status: "OPEN",
    responsibilities: [
      { number: "01", title: "BUILD INTERFACES", description: "Develop modern, responsive interfaces." },
      { number: "02", title: "COLLABORATE", description: "Work with designers, developers and project teams." },
      { number: "03", title: "IMPROVE", description: "Help identify and improve user experiences." },
      { number: "04", title: "CONTRIBUTE", description: "Participate in product and project development." },
    ],
    requirements: {
      required: ["INTEREST IN TECHNOLOGY", "PROBLEM-SOLVING ABILITY", "WILLINGNESS TO LEARN"],
      niceToHave: ["COLLABORATIVE MINDSET", "RESPONSIBILITY"],
    },
    technologies: ["React", "JavaScript", "TypeScript", "APIs", "Git"],
    createdAt: "2026-08-01",
    updatedAt: "2026-08-01",
  },
  {
    id: "JOB-002",
    slug: "backend-developer",
    number: "02",
    title: ["BACKEND", "DEVELOPER"],
    subtitle: "Build the systems that power real products.",
    description:
      "As a Backend Developer, you may contribute to building systems, APIs, and application infrastructure — working closely with the frontend and product teams to keep real products running.",
    department: "ENGINEERING",
    employmentType: "FULL TIME",
    location: "REMOTE / AS SPECIFIED",
    experienceLevel: "AS REQUIRED",
    status: "OPEN",
    responsibilities: [
      { number: "01", title: "BUILD SYSTEMS", description: "Develop APIs and application infrastructure." },
      { number: "02", title: "COLLABORATE", description: "Work with frontend developers and product teams." },
      { number: "03", title: "MAINTAIN", description: "Help keep systems reliable and well structured." },
      { number: "04", title: "CONTRIBUTE", description: "Participate in product and project development." },
    ],
    requirements: {
      required: ["INTEREST IN TECHNOLOGY", "PROBLEM-SOLVING ABILITY", "WILLINGNESS TO LEARN"],
      niceToHave: ["COLLABORATIVE MINDSET", "RESPONSIBILITY"],
    },
    technologies: ["Node.js", "APIs", "PostgreSQL", "Git"],
    createdAt: "2026-08-01",
    updatedAt: "2026-08-01",
  },
  {
    id: "JOB-003",
    slug: "ui-ux-designer",
    number: "03",
    title: ["UI / UX", "DESIGNER"],
    subtitle: "Design meaningful digital experiences and interfaces.",
    description:
      "As a UI / UX Designer, you may contribute to shaping how LUNEX TECH's products look, feel, and work — collaborating with developers and product teams from early concept through to a working interface.",
    department: "DESIGN",
    employmentType: "FULL TIME",
    location: "REMOTE / AS SPECIFIED",
    experienceLevel: "AS REQUIRED",
    status: "OPEN",
    responsibilities: [
      { number: "01", title: "DESIGN INTERFACES", description: "Shape usable, intentional product interfaces." },
      { number: "02", title: "COLLABORATE", description: "Work with developers and product teams." },
      { number: "03", title: "PROTOTYPE", description: "Turn ideas into interactive, testable design work." },
      { number: "04", title: "CONTRIBUTE", description: "Participate in product and project development." },
    ],
    requirements: {
      required: ["INTEREST IN DESIGN", "PROBLEM-SOLVING ABILITY", "WILLINGNESS TO LEARN"],
      niceToHave: ["COLLABORATIVE MINDSET", "RESPONSIBILITY"],
    },
    technologies: ["Figma", "Design Systems", "Prototyping"],
    createdAt: "2026-08-01",
    updatedAt: "2026-08-01",
  },
  {
    id: "JOB-004",
    slug: "ai-ml-engineer",
    number: "04",
    title: ["AI / ML", "ENGINEER"],
    subtitle: "Explore intelligent systems and applied artificial intelligence.",
    description:
      "As an AI / ML Engineer, you may contribute to applied AI work across LUNEX TECH's products — from model evaluation to integrating intelligent systems into real, working software.",
    department: "AI & RESEARCH",
    employmentType: "FULL TIME",
    location: "REMOTE / AS SPECIFIED",
    experienceLevel: "AS REQUIRED",
    status: "OPEN",
    responsibilities: [
      { number: "01", title: "EXPLORE MODELS", description: "Evaluate and apply machine learning approaches." },
      { number: "02", title: "INTEGRATE", description: "Help bring AI systems into real products." },
      { number: "03", title: "EXPERIMENT", description: "Test ideas and iterate on approaches." },
      { number: "04", title: "CONTRIBUTE", description: "Participate in product and project development." },
    ],
    requirements: {
      required: ["INTEREST IN AI & DATA", "PROBLEM-SOLVING ABILITY", "WILLINGNESS TO LEARN"],
      niceToHave: ["COLLABORATIVE MINDSET", "RESPONSIBILITY"],
    },
    technologies: ["Python", "PyTorch", "APIs"],
    createdAt: "2026-08-01",
    updatedAt: "2026-08-01",
  },
  {
    id: "JOB-005",
    slug: "product-developer",
    number: "05",
    title: ["PRODUCT", "DEVELOPER"],
    subtitle: "Help transform ideas into real products.",
    description:
      "As a Product Developer, you may contribute to how LUNEX TECH's ideas become real digital products — helping coordinate design and technology work toward one clear outcome.",
    department: "PRODUCT",
    employmentType: "FULL TIME",
    location: "REMOTE / AS SPECIFIED",
    experienceLevel: "AS REQUIRED",
    status: "OPEN",
    responsibilities: [
      { number: "01", title: "SHAPE DIRECTION", description: "Help turn ideas into clear product direction." },
      { number: "02", title: "COLLABORATE", description: "Work across design and engineering teams." },
      { number: "03", title: "PRIORITIZE", description: "Help decide what gets built first, and why." },
      { number: "04", title: "CONTRIBUTE", description: "Participate in product and project development." },
    ],
    requirements: {
      required: ["INTEREST IN HOW PRODUCTS ARE BUILT", "PROBLEM-SOLVING ABILITY", "WILLINGNESS TO LEARN"],
      niceToHave: ["COLLABORATIVE MINDSET", "RESPONSIBILITY"],
    },
    technologies: ["Roadmapping", "APIs"],
    createdAt: "2026-08-01",
    updatedAt: "2026-08-01",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((job) => job.slug === slug);
}

export function getOpenJobs(): Job[] {
  return JOBS.filter((job) => job.status === "OPEN");
}
