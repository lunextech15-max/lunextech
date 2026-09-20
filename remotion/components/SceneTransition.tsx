import type { ReactNode } from "react";
import { interpolate, useCurrentFrame, AbsoluteFill, Easing } from "remotion";

/** The one shared enter/exit language every reel scene uses — a soft
 * blur-to-focus + fade + slight scale-settle on the way in, and a plain
 * fade on the way out. Wrapping every scene in this (instead of each scene
 * inventing its own transition) is what keeps the motion language coherent
 * across cuts instead of feeling like eight different templates stitched
 * together.
 *
 * `durationInFrames` MUST be this scene's own local Sequence duration,
 * passed explicitly — useVideoConfig() always returns the OUTER/root
 * composition's duration, not a nested Sequence's, so reading it from
 * there would compute the outro fade against the whole reel's length
 * instead of this one scene's. */
export const SceneTransition = ({
  children,
  durationInFrames,
  introFrames = 20,
  outroFrames = 18,
}: {
  children: ReactNode;
  durationInFrames: number;
  introFrames?: number;
  outroFrames?: number;
}) => {
  const frame = useCurrentFrame();

  const inProgress = interpolate(frame, [0, introFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const outProgress = interpolate(frame, [durationInFrames - outroFrames, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const opacity = Math.min(inProgress, outProgress);
  const blur = interpolate(inProgress, [0, 1], [8, 0]);
  const scale = interpolate(inProgress, [0, 1], [1.03, 1]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        filter: blur > 0.15 ? `blur(${blur}px)` : undefined,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
