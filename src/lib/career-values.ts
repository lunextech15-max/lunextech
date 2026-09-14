// "What we value" principles for the Careers page — distinct from
// src/lib/principles.ts (the design/build philosophy shown on /about and
// /careers' own culture framing); these are specifically about how people
// work at LUNEX TECH.

export type CareerValue = {
  number: string;
  title: string;
  description: string;
};

export const CAREER_VALUES: CareerValue[] = [
  { number: "01", title: "CURIOSITY", description: "Ask questions. Explore possibilities." },
  { number: "02", title: "OWNERSHIP", description: "Take responsibility for your work." },
  { number: "03", title: "THINKING", description: "Challenge assumptions and solve problems." },
  { number: "04", title: "BUILDING", description: "Turn ideas into something real." },
];
