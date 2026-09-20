import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SOFT_WHITE, ACCENT } from "../theme";
import { bodyFont } from "../fonts";
import { SAFE_BOTTOM, SAFE_SIDE } from "../reel/safe-zone";

// NOTE: `durationInFrames` is a required prop, not read from
// useVideoConfig() — see the SceneTransition comment for why: that hook
// always returns the ROOT composition's duration, not a nested Sequence's.

function normalize(word: string): string {
  return word.toLowerCase().replace(/[.,!?—-]/g, "");
}

/** Splits the full line into ~5-word chunks — captions show ONE chunk at a
 * time, cycling across the scene's duration, rather than the whole
 * sentence at once. A 25+ word VO line rendered as one static block wraps
 * to 3+ lines and shows every highlighted word simultaneously; real
 * captions (and this brief's "premium minimal, 1-2 lines") read a few
 * words at a time, synced to speech. */
function chunkWords(text: string, maxWordsPerChunk = 5): string[] {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += maxWordsPerChunk) {
    chunks.push(words.slice(i, i + maxWordsPerChunk).join(" "));
  }
  return chunks;
}

/** Premium minimal caption — one short chunk on screen at a time (max ~5
 * words, wraps to at most 2 lines), cycling across the scene, sitting
 * inside the bottom safe zone, highlighting only the words the scene
 * marks important in LUNEX red. The only subtitle component in the
 * project — every scene uses this rather than rolling its own captions. */
export const Subtitle = ({
  text,
  highlightWords,
  durationInFrames,
  fadeFrames = 8,
}: {
  text: string;
  highlightWords: string[];
  durationInFrames: number;
  fadeFrames?: number;
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const highlightSet = new Set(highlightWords.map(normalize));
  const chunks = chunkWords(text);
  const framesPerChunk = durationInFrames / chunks.length;
  const activeIndex = Math.min(chunks.length - 1, Math.floor(frame / framesPerChunk));
  const chunkStart = activeIndex * framesPerChunk;
  const localFrame = frame - chunkStart;

  const opacity = Math.min(
    interpolate(localFrame, [0, fadeFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(localFrame, [framesPerChunk - fadeFrames, framesPerChunk], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const words = chunks[activeIndex].split(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: SAFE_SIDE,
        right: SAFE_SIDE,
        bottom: SAFE_BOTTOM,
        width: width - SAFE_SIDE * 2,
        opacity,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.4,
          letterSpacing: "0.01em",
        }}
      >
        {words.map((word, wi) => (
          <span key={wi} style={{ color: highlightSet.has(normalize(word)) ? ACCENT : SOFT_WHITE }}>
            {word}
            {wi < words.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};
