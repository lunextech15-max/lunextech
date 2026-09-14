// Shared "why LUNEX TECH" principles — sourced from the homepage section and
// reused by the standalone /about page so the two never drift apart.

import type { PrincipleId } from "@/components/home/PrincipleVisuals";

export type Principle = { id: PrincipleId; number: string; title: string[]; description: string };

export const PRINCIPLES: Principle[] = [
  {
    id: "think",
    number: "01",
    title: ["Think before", "we build."],
    description:
      "Before choosing tools or writing code, we focus on understanding the problem, the people and the goal. The right solution starts with asking the right questions.",
  },
  {
    id: "design",
    number: "02",
    title: ["Design with", "purpose."],
    description:
      "Design is more than making something look good. Every interaction, screen and detail should have a reason to exist. We focus on experiences that are clear, useful and memorable.",
  },
  {
    id: "technology",
    number: "03",
    title: ["Technology", "that fits."],
    description:
      "We don't choose technology simply because it is popular. We choose tools and systems based on what the product actually needs.",
  },
  {
    id: "evolve",
    number: "04",
    title: ["Built to", "evolve."],
    description:
      "A product should not only work on launch day. We think about flexibility, improvement and future growth from the beginning.",
  },
];
