// Reusable project data structure for the Selected Work section (and any future
// /projects index or detail pages). Only real, verifiable projects belong here —
// see CTRL_PLUS_GROW_CLAUDE.md §48 Content Integrity: never invent clients, projects,
// or results. A project with no real case-study page yet should omit `projectUrl`
// rather than link anywhere; the UI marks that as "coming soon" instead of faking a link.

export type Project = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  /** Path under /public, or null for a clearly marked placeholder visual. */
  image: string | null;
  imageAlt: string;
  technologies: string[];
  slug: string;
  /** Only set once a real case-study route exists. */
  projectUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "satquery-ai",
    title: "SatQuery AI",
    category: "AI × Satellite Intelligence",
    shortDescription:
      "An interactive vision-language assistant that lets analysts query satellite imagery in plain language — orchestrating specialist AI models for visual question answering, change detection, and optical-SAR fusion, with evidence-grounded, auditable results.",
    image: "/images/projects/satquery-ai.png",
    imageAlt:
      "SatQuery AI mission control interface showing a satellite sensor viewport, tactical command console, and live execution trace for remote-sensing analysis.",
    technologies: ["Next.js", "Python", "FastAPI", "PyTorch", "Qwen2-VL"],
    slug: "satquery-ai",
  },
  // The five entries below are real, live projects. Descriptions are drawn only from
  // each site's own published copy (hero headline/subtext) — no invented features,
  // clients, or metrics; unverified stat claims shown on the live sites themselves
  // (review counts, user counts) are deliberately left out. Images are real hero-section
  // screenshots of each live site; the "Explore Project" link is real since each is live.
  {
    id: "deedis",
    title: "Deedis",
    category: "E-Commerce · Food & Beverage",
    shortDescription:
      "A D2C storefront for handcrafted South Indian pickles — slow-cured with natural ingredients and cold-pressed gingelly oil.",
    image: "/images/projects/deedis.png",
    imageAlt:
      "Deedis homepage hero: 'Taste the Tradition.' headline beside a photo of pickle spices being hand-mixed, with a 100% Authentic Nilgiris Recipes badge.",
    technologies: [],
    slug: "deedis",
    projectUrl: "https://deedispickel.vercel.app/",
  },
  {
    id: "f-gex-groups",
    title: "F-Gex Groups",
    category: "Technology × Financial Ecosystem",
    shortDescription:
      "A dual-division ecosystem uniting technology infrastructure development with institutional-grade financial education.",
    image: "/images/projects/fgex.png",
    imageAlt:
      "F-Gex Groups homepage hero: 'One Ecosystem. Two Specialized Divisions.' headline on a dark background with technology and finance division icons.",
    technologies: [],
    slug: "f-gex-groups",
    projectUrl: "https://f-gexgroups.vercel.app/",
  },
  {
    id: "pupilnetwork",
    title: "PupilNetwork",
    category: "EdTech · Collaborative Learning",
    shortDescription:
      "A collaborative study platform for Indian students — live study rooms, peer Q&A, and AI tutoring to master concepts faster, together.",
    image: "/images/projects/pupilnetwork.png",
    imageAlt:
      "PupilNetwork homepage hero: 'The future of collaborative study' headline with Start Learning Now and Explore Features call-to-action buttons.",
    technologies: [],
    slug: "pupilnetwork",
    projectUrl: "https://pupilnetwork.app/",
  },
  {
    id: "glamroyal-events",
    title: "Glamroyal Events",
    category: "Events · Hospitality",
    shortDescription:
      "A wedding and event management company's brand and booking presence — showcasing real celebrations across their service area.",
    image: "/images/projects/glamroyal.png",
    imageAlt:
      "Glamroyal Events homepage hero: a floral wedding stage photo from a real event, with a Plan Your Event call-to-action.",
    technologies: [],
    slug: "glamroyal-events",
    projectUrl: "https://glamroyal.in/",
  },
  {
    id: "smartbuyx",
    title: "SmartBuyX",
    category: "AI Commerce × Construction — In Progress",
    shortDescription:
      "India's AI-powered commerce and construction super-app — shop everyday products or estimate materials for a full build, all in one place. Currently in active development.",
    image: "/images/projects/smartbuyx.png",
    imageAlt:
      "SmartBuyX homepage hero: 'Shop. Build. Create. All in one place.' headline on a dark purple background with Get Started and Explore Marketplace buttons.",
    technologies: [],
    slug: "smartbuyx",
    projectUrl: "https://smartbuyx.in/",
  },
];
