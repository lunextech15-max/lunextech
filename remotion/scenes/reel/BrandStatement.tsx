import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { AnimatedText } from "../../components/AnimatedText";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { ACCENT } from "../../theme";
import { SAFE_SIDE } from "../../reel/safe-zone";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 180;
const script = getScriptFor("brand-statement");

// Reduced visual activity per the brief — the statement itself carries the
// scene, so the grid glow is dialed way down and nothing else competes.
export const BrandStatement = () => {
  const frame = useCurrentFrame();
  const gridOpacity = interpolate(frame, [0, 30], [0.4, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <SceneTransition durationInFrames={DURATION}>
      <AbsoluteFill>
        <AbsoluteFill style={{ opacity: gridOpacity }}>
          <TechnicalGrid glowX={0.5} glowY={0.5} intensity={0.5} />
        </AbsoluteFill>

        <AbsoluteFill style={{ padding: `0 ${SAFE_SIDE}px`, alignItems: "flex-start", justifyContent: "center" }}>
          <AnimatedText reveal="mask" fontSize={62}>
            NOT JUST
          </AnimatedText>
          <div style={{ marginTop: -4 }}>
            <AnimatedText reveal="mask" fontSize={62} delay={14}>
              SOFTWARE.
            </AnimatedText>
          </div>

          <div style={{ marginTop: 48 }}>
            <AnimatedText reveal="mask" fontSize={38} fontWeight={700} delay={54} color={ACCENT} style={{ maxWidth: 620 }}>
              SOLUTIONS BUILT TO MOVE BUSINESSES FORWARD.
            </AnimatedText>
          </div>
        </AbsoluteFill>

        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} />
        <SceneVoiceOver id="brand-statement" />
      </AbsoluteFill>
    </SceneTransition>
  );
};
