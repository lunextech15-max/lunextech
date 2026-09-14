import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { Backdrop } from "../Backdrop";
import { SOFT_WHITE, ACCENT } from "../theme";
import { displayFont, bodyFont } from "../fonts";

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const lunexX = interpolate(logoIn, [0, 1], [-40, 0]);
  const techX = interpolate(logoIn, [0, 1], [40, 0]);

  const taglineOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [30, 55], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const exitOpacity = interpolate(frame, [110, 138], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Backdrop glowX={0.5} glowY={0.42} intensity={1.2} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 900,
            fontSize: 128,
            letterSpacing: "0.05em",
            display: "flex",
            gap: 24,
            opacity: logoIn,
          }}
        >
          <span style={{ color: SOFT_WHITE, transform: `translateX(${lunexX}px)`, display: "inline-block" }}>
            LUNEX
          </span>
          <span style={{ color: ACCENT, transform: `translateX(${techX}px)`, display: "inline-block" }}>TECH</span>
        </div>

        <div
          style={{
            marginTop: 32,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: `${SOFT_WHITE}73`,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          From idea to impact.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
