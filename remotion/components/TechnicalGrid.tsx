import { useCurrentFrame, useVideoConfig } from "remotion";
import { CARBON, ACCENT, LINE } from "../theme";

const CELL = 96;

/** Vertical-format background: fine technical grid, vignette, and a
 * controlled red glow that slowly drifts — same visual language as the
 * site's Backdrop, tuned for 1080x1920 instead of 16:9. */
export const TechnicalGrid = ({
  glowX = 0.5,
  glowY = 0.35,
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
        <pattern id="rg-grid" width={CELL} height={CELL} patternUnits="userSpaceOnUse" patternTransform={`translate(${drift} ${drift})`}>
          <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" stroke={LINE} strokeWidth={1} />
        </pattern>
        <radialGradient id="rg-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="40%" stopColor={CARBON} stopOpacity={0} />
          <stop offset="100%" stopColor={CARBON} stopOpacity={0.94} />
        </radialGradient>
        <radialGradient id="rg-glow">
          <stop offset="0%" stopColor={ACCENT} stopOpacity={0.14 * intensity} />
          <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect width={width} height={height} fill={CARBON} />
      <rect width={width} height={height} fill="url(#rg-grid)" opacity={0.4} />
      <circle cx={width * glowX} cy={height * glowY} r={width * 0.55} fill="url(#rg-glow)" />
      <rect width={width} height={height} fill="url(#rg-vignette)" />
    </svg>
  );
};
