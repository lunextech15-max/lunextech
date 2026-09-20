import { interpolate, useCurrentFrame } from "remotion";
import { ACCENT, LINE } from "../theme";

/** Thin technical accent line — draws in over `drawInFrames`, then holds.
 * Used as dividers, connectors between process steps, and accent sweeps. */
export const GlowLine = ({
  orientation = "horizontal",
  length,
  delay = 0,
  drawInFrames = 18,
  glow = true,
  muted = false,
}: {
  orientation?: "horizontal" | "vertical";
  length: number;
  delay?: number;
  drawInFrames?: number;
  glow?: boolean;
  muted?: boolean;
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, drawInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isH = orientation === "horizontal";
  const color = muted ? LINE : ACCENT;

  return (
    <div
      style={{
        width: isH ? length : 1.5,
        height: isH ? 1.5 : length,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          transformOrigin: isH ? "left center" : "top center",
          transform: isH ? `scaleX(${progress})` : `scaleY(${progress})`,
          boxShadow: glow && !muted ? `0 0 12px 1px ${ACCENT}80` : undefined,
        }}
      />
    </div>
  );
};
