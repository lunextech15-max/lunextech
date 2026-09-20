import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SOFT_WHITE, ACCENT } from "../theme";
import { displayFont, bodyFont } from "../fonts";

/** The LUNEX TECH wordmark reveal — the site has no separate logo image
 * asset (confirmed: only the Orbitron text wordmark, used everywhere from
 * the header to the existing BrandShowcase intro), so this reuses that
 * exact treatment rather than inventing a graphic mark. Used for both the
 * opening and closing beats. */
export const LogoReveal = ({
  delay = 0,
  fontSize = 92,
  tagline,
}: {
  delay?: number;
  fontSize?: number;
  tagline?: string;
}) => {
  const frame = useCurrentFrame() - delay;
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 28 });
  const lunexX = interpolate(logoIn, [0, 1], [-24, 0]);
  const techX = interpolate(logoIn, [0, 1], [24, 0]);
  const taglineOpacity = interpolate(frame, [26, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [26, 48], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize,
          letterSpacing: "0.03em",
          display: "flex",
          gap: fontSize * 0.18,
          opacity: logoIn,
        }}
      >
        <span style={{ color: SOFT_WHITE, transform: `translateX(${lunexX}px)`, display: "inline-block" }}>LUNEX</span>
        <span style={{ color: ACCENT, transform: `translateX(${techX}px)`, display: "inline-block" }}>TECH</span>
      </div>

      {tagline && (
        <div
          style={{
            marginTop: fontSize * 0.32,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: Math.round(fontSize * 0.16),
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: `${SOFT_WHITE}b3`,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: "center",
            whiteSpace: "pre-line",
            lineHeight: 1.6,
          }}
        >
          {tagline}
        </div>
      )}
    </div>
  );
};
