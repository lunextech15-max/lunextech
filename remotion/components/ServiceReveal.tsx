import { interpolate, useCurrentFrame } from "remotion";
import { SOFT_WHITE, ACCENT } from "../theme";
import { displayFont } from "../fonts";
import { GlowLine } from "./GlowLine";

/** One service name filling its beat in the Services scene — number,
 * name, and a thin drawing accent line. Reused per-item so every service
 * gets identical treatment rather than bespoke per-item styling. */
export const ServiceReveal = ({
  index,
  name,
  durationInFrames,
}: {
  index: number;
  name: string;
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const y = interpolate(frame, [0, 14], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ gridArea: "1 / 1", opacity, transform: `translateY(${y}px)` }}>
      <span
        style={{
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 20,
          color: ACCENT,
          letterSpacing: "0.1em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        style={{
          marginTop: 14,
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: 58,
          lineHeight: 1.02,
          color: SOFT_WHITE,
          letterSpacing: "-0.01em",
          maxWidth: 820,
          whiteSpace: "pre-line",
        }}
      >
        {name}
      </div>
      <div style={{ marginTop: 22 }}>
        <GlowLine length={120} drawInFrames={16} />
      </div>
    </div>
  );
};
