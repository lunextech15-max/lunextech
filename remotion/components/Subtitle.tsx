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

/** Splits into at most 2 lines, balancing word count rather than just
 * cutting at the midpoint character, so short trailing words don't end up
 * alone on their own line. */
function splitLines(text: string): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length <= 7) return [text];

  const bestSplit = Math.ceil(words.length / 2);
  const line1 = words.slice(0, bestSplit).join(" ");
  const line2 = words.slice(bestSplit).join(" ");
  return [line1, line2];
}

/** Premium minimal caption block — max 2 lines, sits inside the bottom
 * safe zone (never behind Reels UI), fades in/out, and highlights only the
 * words the scene marks as important in LUNEX red. This is the ONLY
 * subtitle component in the project — every scene uses this rather than
 * each rolling its own caption styling. */
export const Subtitle = ({
  text,
  highlightWords,
  durationInFrames,
  fadeFrames = 12,
}: {
  text: string;
  highlightWords: string[];
  durationInFrames: number;
  fadeFrames?: number;
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const opacity = Math.min(
    interpolate(frame, [0, fadeFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - fadeFrames, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const highlightSet = new Set(highlightWords.map(normalize));
  const lines = splitLines(text);

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
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 30,
            lineHeight: 1.4,
            letterSpacing: "0.01em",
          }}
        >
          {line.split(" ").map((word, wi) => (
            <span key={wi} style={{ color: highlightSet.has(normalize(word)) ? ACCENT : SOFT_WHITE }}>
              {word}
              {wi < line.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
