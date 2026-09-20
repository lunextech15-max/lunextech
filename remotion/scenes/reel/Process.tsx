import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { AnimatedText } from "../../components/AnimatedText";
import { ProcessStep } from "../../components/ProcessStep";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { SOFT_WHITE } from "../../theme";
import { SAFE_SIDE, SAFE_TOP } from "../../reel/safe-zone";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 360;
const script = getScriptFor("process");

const STEPS = ["Discover", "Define", "Design", "Build", "Test", "Deliver"];
const TITLE_HOLD = 44;
const STEP_STAGGER = 46;

export const Process = () => {
  return (
    <SceneTransition durationInFrames={DURATION}>
      <AbsoluteFill>
        <TechnicalGrid glowX={0.5} glowY={0.28} intensity={1} />

        <div style={{ position: "absolute", top: SAFE_TOP, left: SAFE_SIDE }}>
          <AnimatedText fontSize={22} fontWeight={700} color={`${SOFT_WHITE}66`} letterSpacing="0.3em" font="body">
            OUR PROCESS
          </AnimatedText>
        </div>

        <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "center", padding: `0 ${SAFE_SIDE}px` }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {STEPS.map((step, i) => (
              <ProcessStepGated
                key={step}
                index={i}
                label={step}
                delay={TITLE_HOLD + i * STEP_STAGGER}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </AbsoluteFill>

        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} />
        <SceneVoiceOver id="process" />
      </AbsoluteFill>
    </SceneTransition>
  );
};

// Steps are engineered to reveal progressively (never all at once, per the
// brief) — this just gates ProcessStep's own entrance animation on
// whether we've reached its delay frame yet at all, so it stays invisible
// (not just un-animated) before its turn.
const ProcessStepGated = ({
  index,
  label,
  delay,
  isLast,
}: {
  index: number;
  label: string;
  delay: number;
  isLast: boolean;
}) => {
  const frame = useCurrentFrame();
  const visible = interpolate(frame, [delay - 1, delay], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity: visible }}>
      <ProcessStep index={index} label={label} delay={delay} isLast={isLast} />
    </div>
  );
};
