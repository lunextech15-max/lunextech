// Shared service list — sourced from the homepage "What We Do" section and
// reused by the standalone /capabilities page so the two never drift apart.

import type { ServiceId } from "@/components/home/ServiceVisuals";

export type Service = { id: ServiceId; title: string; description: string };

export const SERVICES: Service[] = [
  {
    id: "experiences",
    title: "Digital Experiences",
    description:
      "We create powerful digital experiences that capture attention and leave a lasting impression.",
  },
  {
    id: "product",
    title: "Product Development",
    description:
      "We transform ambitious ideas into functional, scalable digital products.",
  },
  {
    id: "uiux",
    title: "UI / UX Design",
    description:
      "We design intuitive interfaces where clarity, creativity and functionality work together.",
  },
  {
    id: "ai",
    title: "AI & Automation",
    description:
      "We build intelligent systems and automation that simplify work and unlock new possibilities.",
  },
  {
    id: "systems",
    title: "Digital Systems",
    description:
      "We create connected digital systems designed to support growth and long-term innovation.",
  },
];
