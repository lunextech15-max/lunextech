// Shared "how we work" process steps — sourced from the homepage section and
// reused by the standalone /about page so the two never drift apart.

import type { ProcessId } from "@/components/home/ProcessVisuals";

export type ProcessStep = { id: ProcessId; number: string; title: string; description: string };

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "Understand the idea, problem, audience and goals.",
  },
  {
    id: "define",
    number: "02",
    title: "Define",
    description: "Transform possibilities into a clear strategy and direction.",
  },
  {
    id: "design",
    number: "03",
    title: "Design",
    description: "Shape the experience, interface, identity and product vision.",
  },
  {
    id: "build",
    number: "04",
    title: "Build",
    description: "Turn the vision into a functional digital product.",
  },
  {
    id: "evolve",
    number: "05",
    title: "Evolve",
    description: "Test, improve and prepare the product to grow.",
  },
];
