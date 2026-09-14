// Shared "what we build" category list — sourced from the homepage section
// and reused by the standalone /capabilities page so the two never drift.

import type { BuildId } from "@/components/home/BuildVisuals";

export type BuildExample = {
  title: string;
  /** What this specific build is typically used for. */
  useCase: string;
  /** Who typically comes to us for this specific build. */
  audience: string[];
};

export type BuildCategory = {
  id: BuildId;
  number: string;
  title: string;
  description: string;
  examples: BuildExample[];
};

export const CAPABILITIES: BuildCategory[] = [
  {
    id: "websites",
    number: "01",
    title: "Websites",
    description:
      "High-impact digital experiences designed to make a powerful first impression.",
    examples: [
      {
        title: "Corporate Websites",
        useCase: "Establish trust and credibility online",
        audience: ["Enterprises", "Professional firms"],
      },
      {
        title: "Business Websites",
        useCase: "Give a growing business a professional home online",
        audience: ["Small & local businesses"],
      },
      {
        title: "Landing Pages",
        useCase: "Convert visitors from a campaign or launch",
        audience: ["Marketers", "Startups"],
      },
      {
        title: "Portfolio Websites",
        useCase: "Showcase work and attract new clients",
        audience: ["Creatives", "Freelancers", "Agencies"],
      },
      {
        title: "E-Commerce Experiences",
        useCase: "Sell products directly to customers online",
        audience: ["Retail brands", "Merchants"],
      },
      {
        title: "Interactive Websites",
        useCase: "Create a memorable, story-driven brand experience",
        audience: ["Premium brands", "Agencies"],
      },
    ],
  },
  {
    id: "webapps",
    number: "02",
    title: "Web Applications",
    description:
      "Powerful browser-based applications designed around real business needs.",
    examples: [
      {
        title: "Custom Web Apps",
        useCase: "Solve a specific business problem with software",
        audience: ["Growing businesses"],
      },
      {
        title: "Client Portals",
        useCase: "Give clients secure access to their own information",
        audience: ["Service businesses", "Agencies"],
      },
      {
        title: "Booking Platforms",
        useCase: "Let customers schedule and pay online",
        audience: ["Service providers", "Clinics & studios"],
      },
      {
        title: "Management Systems",
        useCase: "Run day-to-day operations from one dashboard",
        audience: ["Operations teams"],
      },
      {
        title: "Online Platforms",
        useCase: "Connect multiple users around a shared service",
        audience: ["Startups", "Marketplaces"],
      },
    ],
  },
  {
    id: "mobile",
    number: "03",
    title: "Mobile Applications",
    description:
      "Mobile experiences built to keep your product connected to your users.",
    examples: [
      {
        title: "Android Applications",
        useCase: "Reach customers on the world's most-used mobile platform",
        audience: ["Consumer brands"],
      },
      {
        title: "iOS Applications",
        useCase: "Deliver a premium mobile experience on Apple devices",
        audience: ["Consumer brands", "Startups"],
      },
      {
        title: "Cross-Platform Apps",
        useCase: "Launch on iOS and Android from one codebase",
        audience: ["Startups", "Lean teams"],
      },
      {
        title: "Customer Applications",
        useCase: "Keep customers engaged after they leave your site",
        audience: ["Retail & services"],
      },
      {
        title: "Business Applications",
        useCase: "Give staff the tools they need out in the field",
        audience: ["Field & operations teams"],
      },
    ],
  },
  {
    id: "products",
    number: "04",
    title: "Digital Products",
    description:
      "From an early concept to a complete digital product ready to grow.",
    examples: [
      {
        title: "SaaS Platforms",
        useCase: "Turn an idea into a subscription software business",
        audience: ["Founders", "Product teams"],
      },
      {
        title: "MVPs",
        useCase: "Test an idea in the market before scaling",
        audience: ["Early-stage founders"],
      },
      {
        title: "Startup Products",
        useCase: "Move fast from concept to a real product",
        audience: ["Startups"],
      },
      {
        title: "Subscription Platforms",
        useCase: "Build recurring revenue around a product",
        audience: ["Growing businesses"],
      },
      {
        title: "Custom Platforms",
        useCase: "Build exactly what off-the-shelf tools can't",
        audience: ["Enterprises", "Product teams"],
      },
    ],
  },
  {
    id: "ai",
    number: "05",
    title: "AI Systems",
    description:
      "Intelligent technology designed to simplify work and unlock new possibilities.",
    examples: [
      {
        title: "AI Integrations",
        useCase: "Add intelligence to tools already in use",
        audience: ["SaaS companies", "Enterprises"],
      },
      {
        title: "Custom AI Tools",
        useCase: "Automate a task unique to the business",
        audience: ["Operations-heavy businesses"],
      },
      {
        title: "Intelligent Assistants",
        useCase: "Handle support and repetitive requests automatically",
        audience: ["Customer-facing teams"],
      },
      {
        title: "Workflow Automation",
        useCase: "Remove manual steps from everyday processes",
        audience: ["Operations teams"],
      },
      {
        title: "AI-Powered Platforms",
        useCase: "Make a product smarter for every user",
        audience: ["SaaS companies"],
      },
    ],
  },
  {
    id: "systems",
    number: "06",
    title: "Business Systems",
    description:
      "Digital systems that organize operations and help businesses work smarter.",
    examples: [
      {
        title: "Admin Portals",
        useCase: "Manage a platform from a single control centre",
        audience: ["Product & operations teams"],
      },
      {
        title: "Dashboards",
        useCase: "See performance and data in real time",
        audience: ["Leadership", "Analysts"],
      },
      {
        title: "Internal Tools",
        useCase: "Replace spreadsheets with purpose-built software",
        audience: ["Growing teams"],
      },
      {
        title: "Employee Portals",
        useCase: "Give staff one place for HR, tasks and updates",
        audience: ["HR & internal teams"],
      },
      {
        title: "Management Systems",
        useCase: "Coordinate people, projects and resources",
        audience: ["Enterprises", "Institutions"],
      },
    ],
  },
];
