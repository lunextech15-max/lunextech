import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { Backdrop, TechnicalLabel } from "../Backdrop";
import { SOFT_WHITE, ACCENT } from "../theme";
import { displayFont, bodyFont } from "../fonts";

const POINTS = [
  { number: "01", title: "Production-ready foundations", detail: "Built once, proven, and ready to extend." },
  { number: "02", title: "Customized to your brand", detail: "Never a generic template with your name on it." },
  { number: "03", title: "Launch in weeks, not months", detail: "Skip the zero-to-one build, keep the quality." },
];

export const PreBuiltSoftware = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const labelIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headlineIn = spring({ frame: frame - 10, fps, config: { damping: 200 }, durationInFrames: 24 });
  const exitOpacity = interpolate(frame, [durationInFrames - 26, durationInFrames - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Backdrop glowX={0.68} glowY={0.3} intensity={0.85} />
      <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
        <div style={{ opacity: labelIn }}>
          <TechnicalLabel number="05" label="Pre-built software" />
        </div>

        <div
          style={{
            marginTop: 36,
            fontFamily: displayFont,
            fontWeight: 900,
            fontSize: 68,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: SOFT_WHITE,
            opacity: headlineIn,
            transform: `translateY(${interpolate(headlineIn, [0, 1], [24, 0])}px)`,
            maxWidth: 1100,
          }}
        >
          DON&apos;T START <span style={{ color: ACCENT }}>FROM ZERO.</span>
        </div>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 30, maxWidth: 900 }}>
          {POINTS.map((point, i) => {
            const start = 40 + i * 14;
            const itemIn = interpolate(frame, [start, start + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={point.number}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 22,
                  opacity: itemIn,
                  transform: `translateX(${interpolate(itemIn, [0, 1], [-20, 0])}px)`,
                }}
              >
                <span style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 20, color: ACCENT, flexShrink: 0 }}>
                  {point.number}
                </span>
                <div>
                  <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 27, color: SOFT_WHITE }}>
                    {point.title}
                  </div>
                  <div style={{ marginTop: 6, fontFamily: bodyFont, fontWeight: 400, fontSize: 17, color: `${SOFT_WHITE}80` }}>
                    {point.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
