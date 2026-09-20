// Voice-over script for LunexReel, one entry per scene. `text` is exactly
// what should be sent to a TTS engine once one is available (see
// reel-audio-config.ts). `highlightWords` are the words the Subtitle
// component renders in the LUNEX red accent instead of soft-white.
//
// `estimatedSpeechFrames` is a placeholder — words-per-second at a calm,
// natural pace (~2.3 wps), NOT a measured duration. Once real VO audio
// exists, replace it with the actual clip length in frames so captions and
// scene timing lock to the real audio instead of this estimate.

const FPS = 30;
const WORDS_PER_SECOND = 2.3;

export type ReelScriptEntry = {
  id: string;
  text: string;
  highlightWords: string[];
  estimatedSpeechFrames: number;
};

function estimateFrames(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.round((words / WORDS_PER_SECOND) * FPS);
}

const RAW_SCRIPT: Omit<ReelScriptEntry, "estimatedSpeechFrames">[] = [
  {
    id: "opening",
    text: "Every great digital product starts with an idea.",
    highlightWords: ["idea"],
  },
  {
    id: "who-we-are",
    text: "At Lunex Tech, we turn ideas into powerful digital experiences built for real businesses.",
    highlightWords: ["ideas", "digital", "experiences", "real", "businesses"],
  },
  {
    id: "what-we-do",
    text: "From design and development to intelligent automation, we build technology around your goals.",
    highlightWords: ["design", "development", "automation", "goals"],
  },
  {
    id: "services",
    text: "From websites and applications, to UI/UX, AI automation, eCommerce, business tools and MVP development — we create solutions designed around what your business actually needs.",
    highlightWords: ["websites", "applications", "UI/UX", "AI", "eCommerce", "business"],
  },
  {
    id: "process",
    text: "Our process is simple. We understand the problem, define the right solution, design the experience, build it, test it, and prepare it for launch.",
    highlightWords: ["understand", "define", "design", "build", "test", "launch"],
  },
  {
    id: "delivery",
    text: "From the first idea to the final launch, we handle the complete digital journey.",
    highlightWords: ["idea", "launch", "complete", "journey"],
  },
  {
    id: "brand-statement",
    text: "We don't just build software. We build solutions designed to move businesses forward.",
    highlightWords: ["software", "solutions", "move", "forward"],
  },
  {
    id: "end-cta",
    text: "Lunex Tech. Let's build what's next.",
    highlightWords: ["build", "next"],
  },
];

export const REEL_SCRIPT: ReelScriptEntry[] = RAW_SCRIPT.map((entry) => ({
  ...entry,
  estimatedSpeechFrames: estimateFrames(entry.text),
}));

export const getScriptFor = (id: string): ReelScriptEntry => {
  const entry = REEL_SCRIPT.find((e) => e.id === id);
  if (!entry) throw new Error(`No reel script entry for scene "${id}"`);
  return entry;
};
