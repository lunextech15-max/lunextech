import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { AnimatedText } from "../../components/AnimatedText";
import { ProcessStep } from "../../components/ProcessStep";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { SOFT_WHITE, ACCENT, LINE } from "../../theme";
import { bodyFont } from "../../fonts";
import { SAFE_SIDE, SAFE_TOP } from "../../reel/safe-zone";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 240;
const script = getScriptFor("delivery");

const JOURNEY = ["Idea", "Strategy", "Design", "Development", "Launch"];
const JOURNEY_DURATION = 130;
const JOURNEY_STAGGER = 22;

const CAPABILITIES = ["STRATEGY", "DESIGN", "DEVELOPMENT", "INTEGRATION", "DEPLOYMENT", "SUPPORT"];
const TAGS_START = JOURNEY_DURATION;

export const Delivery = () => {
  return (
    <SceneTransition durationInFrames={DURATION}>
      <AbsoluteFill>
        <TechnicalGrid glowX={0.42} glowY={0.3} intensity={0.9} />

        <div style={{ position: "absolute", top: SAFE_TOP, left: SAFE_SIDE }}>
          <AnimatedText fontSize={22} fontWeight={700} color={`${SOFT_WHITE}66`} letterSpacing="0.3em" font="body">
            HOW WE DELIVER
          </AnimatedText>
        </div>

        <Sequence from={0} durationInFrames={JOURNEY_DURATION + 16} layout="none">
          <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "center", padding: `0 ${SAFE_SIDE}px` }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              {JOURNEY.map((step, i) => (
                <ProcessStep
                  key={step}
                  index={i}
                  label={step}
                  delay={i * JOURNEY_STAGGER}
                  isLast={i === JOURNEY.length - 1}
                  connectorLength={30}
                />
              ))}
            </div>
          </AbsoluteFill>
        </Sequence>

        <Sequence from={TAGS_START} durationInFrames={DURATION - TAGS_START} layout="none">
          <CapabilityTags />
        </Sequence>

        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} />
        <SceneVoiceOver id="delivery" />
      </AbsoluteFill>
    </SceneTransition>
  );
};

const CapabilityTags = () => {
  const frame = useCurrentFrame();
  const wrapOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "center", padding: `0 ${SAFE_SIDE}px` }}>
      <div style={{ opacity: wrapOpacity, display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 900 }}>
        {CAPABILITIES.map((tag, i) => {
          const start = i * 8;
          const tagOpacity = interpolate(frame, [start, start + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={tag}
              style={{
                opacity: tagOpacity,
                fontFamily: bodyFont,
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.1em",
                color: SOFT_WHITE,
                border: `1px solid ${LINE}`,
                padding: "10px 18px",
              }}
            >
              <span style={{ color: ACCENT, marginRight: 8 }}>•</span>
              {tag}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
