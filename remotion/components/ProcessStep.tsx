import { interpolate, useCurrentFrame } from "remotion";
import { SOFT_WHITE, ACCENT, LINE } from "../theme";
import { displayFont, bodyFont } from "../fonts";
import { GlowLine } from "./GlowLine";

/** One step in a vertical process/timeline list — number, label, and a
 * connecting line down to the next step that draws in as the step becomes
 * active. Shared by the Process scene (Discover -> Deliver) and the
 * Delivery scene (Idea -> Launch), so both read as the same system. */
export const ProcessStep = ({
  index,
  label,
  delay,
  isLast = false,
  connectorLength = 46,
  active = true,
}: {
  index: number;
  label: string;
  delay: number;
  isLast?: boolean;
  connectorLength?: number;
  active?: boolean;
}) => {
  const frame = useCurrentFrame() - delay;
  const opacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(frame, [0, 16], [-18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotScale = interpolate(frame, [0, 12], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26, opacity, transform: `translateX(${x}px)` }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: active ? ACCENT : "transparent",
            border: `1.5px solid ${active ? ACCENT : LINE}`,
            boxShadow: active ? `0 0 14px 2px ${ACCENT}80` : undefined,
            transform: `scale(${dotScale})`,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 13,
            color: `${SOFT_WHITE}66`,
            letterSpacing: "0.15em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 32,
            color: SOFT_WHITE,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
      </div>

      {!isLast && (
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <GlowLine orientation="vertical" length={connectorLength} delay={delay + 14} drawInFrames={16} muted={!active} />
        </div>
      )}
    </div>
  );
};
