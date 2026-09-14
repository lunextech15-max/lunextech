import type { CSSProperties } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CARBON, ACCENT, LINE, SOFT_WHITE } from "./theme";

const CELL = 110;

/** Shared grid + vignette + glow background for every scene — same
 * technical-minimal language as the site's page-hero.css treatment. */
export const Backdrop = ({
  glowX = 0.5,
  glowY = 0.4,
  intensity = 1,
}: {
  glowX?: number;
  glowY?: number;
  intensity?: number;
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const drift = (frame / durationInFrames) * CELL;

  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="bd-grid" width={CELL} height={CELL} patternUnits="userSpaceOnUse" patternTransform={`translate(${drift} ${drift})`}>
          <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" stroke={LINE} strokeWidth={1} />
        </pattern>
        <radialGradient id="bd-vignette" cx="50%" cy="50%" r="75%">
          <stop offset="45%" stopColor={CARBON} stopOpacity={0} />
          <stop offset="100%" stopColor={CARBON} stopOpacity={0.92} />
        </radialGradient>
        <radialGradient id="bd-glow">
          <stop offset="0%" stopColor={ACCENT} stopOpacity={0.16 * intensity} />
          <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect width={width} height={height} fill={CARBON} />
      <rect width={width} height={height} fill="url(#bd-grid)" opacity={0.5} />
      <circle cx={width * glowX} cy={height * glowY} r={width * 0.32} fill="url(#bd-glow)" />
      <rect width={width} height={height} fill="url(#bd-vignette)" />
    </svg>
  );
};

/** Small "0X / LABEL" technical micro-label, matching the site's SectionHeader. */
export const TechnicalLabel = ({ number, label, style }: { number: string; label: string; style?: CSSProperties }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, ...style }}>
    <span style={{ color: ACCENT, fontSize: 22, fontWeight: 700 }}>{number}</span>
    <span style={{ width: 32, height: 1, background: `${ACCENT}99` }} />
    <span
      style={{
        color: `${SOFT_WHITE}66`,
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  </div>
);
