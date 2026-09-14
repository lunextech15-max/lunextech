import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { Backdrop } from "../Backdrop";
import { SOFT_WHITE, ACCENT } from "../theme";
import { displayFont, bodyFont } from "../fonts";

export const Closing = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 24 });
  const lineIn = interpolate(frame, [18, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const contactIn = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 18, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Backdrop glowX={0.5} glowY={0.42} intensity={1.3} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 900,
            fontSize: 96,
            letterSpacing: "0.04em",
            color: SOFT_WHITE,
            opacity: logoIn,
            transform: `scale(${interpolate(logoIn, [0, 1], [0.9, 1])})`,
          }}
        >
          LUNEX <span style={{ color: ACCENT }}>TECH</span>
        </div>

        <div
          style={{
            marginTop: 30,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "0.02em",
            color: `${SOFT_WHITE}cc`,
            opacity: lineIn,
          }}
        >
          Let&apos;s build what&apos;s next.
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: `${SOFT_WHITE}66`,
            opacity: contactIn,
          }}
        >
          lunextech15@gmail.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
