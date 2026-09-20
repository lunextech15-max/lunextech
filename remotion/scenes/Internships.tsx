import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { Backdrop, TechnicalLabel } from "../Backdrop";
import { SOFT_WHITE, ACCENT, LINE } from "../theme";
import { displayFont, bodyFont } from "../fonts";
import { PROGRAMS } from "@/lib/programs";

// Real program titles/format from src/lib/programs.ts — never invented copy.
const TRACKS = PROGRAMS.map((p) => ({ title: p.title.join(" "), format: p.format }));

export const Internships = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const labelIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headlineIn = spring({ frame: frame - 10, fps, config: { damping: 200 }, durationInFrames: 24 });
  const gridIn = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 26, durationInFrames - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Backdrop glowX={0.32} glowY={0.28} intensity={0.85} />
      <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
        <div style={{ opacity: labelIn }}>
          <TechnicalLabel number="04" label="Internships" />
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
            maxWidth: 1200,
          }}
        >
          REAL PROJECTS. <span style={{ color: ACCENT }}>REAL GROWTH.</span>
        </div>

        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: LINE,
            border: `1px solid ${LINE}`,
            maxWidth: 1300,
            opacity: gridIn,
            transform: `translateY(${interpolate(gridIn, [0, 1], [16, 0])}px)`,
          }}
        >
          {TRACKS.map((track) => (
            <div key={track.title} style={{ background: "#000000", padding: "26px 28px" }}>
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 21,
                  color: SOFT_WHITE,
                  lineHeight: 1.15,
                }}
              >
                {track.title}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: bodyFont,
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: `${SOFT_WHITE}66`,
                }}
              >
                {track.format}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 17,
            letterSpacing: "0.05em",
            color: `${SOFT_WHITE}99`,
            opacity: gridIn,
          }}
        >
          3 months · Hands-on · Real LUNEX TECH projects
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
