import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { Backdrop, TechnicalLabel } from "../Backdrop";
import { SOFT_WHITE, ACCENT } from "../theme";
import { displayFont, bodyFont } from "../fonts";

const PROCESS = ["Idea", "Design", "Technology", "Impact"];

export const WhoWeAre = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const labelIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1 = spring({ frame: frame - 12, fps, config: { damping: 200 }, durationInFrames: 24 });
  const line2 = spring({ frame: frame - 24, fps, config: { damping: 200 }, durationInFrames: 24 });
  const stepsIn = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 26, durationInFrames - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Backdrop glowX={0.28} glowY={0.3} intensity={0.7} />
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 140px" }}>
        <div style={{ opacity: labelIn }}>
          <TechnicalLabel number="02" label="Who we are" />
        </div>

        <div style={{ marginTop: 44, maxWidth: 1300 }}>
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 900,
              fontSize: 76,
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
              color: SOFT_WHITE,
              opacity: line1,
              transform: `translateY(${interpolate(line1, [0, 1], [24, 0])}px)`,
            }}
          >
            WE DON&apos;T JUST BUILD DIGITAL PRODUCTS.
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: displayFont,
              fontWeight: 900,
              fontSize: 76,
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
              color: SOFT_WHITE,
              opacity: line2,
              transform: `translateY(${interpolate(line2, [0, 1], [24, 0])}px)`,
            }}
          >
            WE BUILD <span style={{ color: ACCENT }}>WHAT&apos;S NEXT.</span>
          </div>
        </div>

        <div style={{ marginTop: 70, display: "flex", gap: 64, opacity: stepsIn }}>
          {PROCESS.map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: displayFont, color: `${SOFT_WHITE}4d`, fontSize: 15 }}>0{i + 1}</span>
              <span
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 500,
                  fontSize: 15,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: i === PROCESS.length - 1 ? ACCENT : `${SOFT_WHITE}b3`,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
