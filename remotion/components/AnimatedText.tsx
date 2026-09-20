import type { CSSProperties } from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { SOFT_WHITE } from "../theme";
import { displayFont, bodyFont } from "../fonts";

type Reveal = "mask" | "rise";

/** Generic headline/label text with a mask-reveal (clip-path wipe, for
 * confident display headlines) or rise (fade + translateY, for lighter
 * supporting lines). Every scene's typography goes through this instead of
 * hand-rolling its own interpolate() calls, so the reveal pacing/easing
 * stays identical across scenes. */
export const AnimatedText = ({
  children,
  delay = 0,
  durationInFrames = 22,
  reveal = "rise",
  font = "display",
  fontSize = 56,
  fontWeight = 900,
  color = SOFT_WHITE,
  letterSpacing = "-0.01em",
  uppercase = true,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  durationInFrames?: number;
  reveal?: Reveal;
  font?: "display" | "body";
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  letterSpacing?: string;
  uppercase?: boolean;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame() - delay;
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const baseStyle: CSSProperties = {
    fontFamily: font === "display" ? displayFont : bodyFont,
    fontWeight,
    fontSize,
    color,
    letterSpacing,
    textTransform: uppercase ? "uppercase" : "none",
    lineHeight: 1.04,
    ...style,
  };

  if (reveal === "mask") {
    return (
      <div style={{ overflow: "hidden", display: "inline-block" }}>
        <div
          style={{
            ...baseStyle,
            transform: `translateY(${interpolate(progress, [0, 1], [100, 0])}%)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        ...baseStyle,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [22, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};
