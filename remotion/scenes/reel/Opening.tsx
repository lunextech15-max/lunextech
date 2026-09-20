import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { LogoReveal } from "../../components/LogoReveal";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 150;
const script = getScriptFor("opening");

export const Opening = () => {
  const frame = useCurrentFrame();
  const gridOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <SceneTransition durationInFrames={DURATION} introFrames={1} outroFrames={20}>
      <AbsoluteFill>
        <AbsoluteFill style={{ opacity: gridOpacity }}>
          <TechnicalGrid glowX={0.5} glowY={0.4} intensity={1.1} />
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <LogoReveal delay={44} fontSize={80} tagline={"DIGITAL SOLUTIONS.\nBUILT DIFFERENT."} />
        </AbsoluteFill>
        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} />
        <SceneVoiceOver id="opening" />
      </AbsoluteFill>
    </SceneTransition>
  );
};
