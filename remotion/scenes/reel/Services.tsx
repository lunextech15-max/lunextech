import { AbsoluteFill, Sequence } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { AnimatedText } from "../../components/AnimatedText";
import { ServiceReveal } from "../../components/ServiceReveal";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { SOFT_WHITE } from "../../theme";
import { SAFE_SIDE, SAFE_TOP } from "../../reel/safe-zone";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 360;
const script = getScriptFor("services");

// The 8 core services from the brief — two per visual beat, four beats.
const SERVICES = [
  "WEBSITE\nDEVELOPMENT",
  "APPLICATION\nDEVELOPMENT",
  "UI / UX\nDESIGN",
  "AI SOLUTIONS &\nAUTOMATION",
  "ECOMMERCE\nSOLUTIONS",
  "BUSINESS DASHBOARDS\n& TOOLS",
  "MVP\nDEVELOPMENT",
  "DIGITAL\nBRANDING",
];

const TITLE_HOLD = 40;
const BEAT = Math.floor((DURATION - TITLE_HOLD) / 4);

export const Services = () => {
  return (
    <SceneTransition durationInFrames={DURATION}>
      <AbsoluteFill>
        <TechnicalGrid glowX={0.45} glowY={0.32} intensity={0.95} />

        <div style={{ position: "absolute", top: SAFE_TOP, left: SAFE_SIDE }}>
          <AnimatedText fontSize={22} fontWeight={700} color={`${SOFT_WHITE}66`} letterSpacing="0.3em" font="body">
            WHAT WE DO
          </AnimatedText>
        </div>

        {Array.from({ length: 4 }).map((_, beatIndex) => (
          <Sequence key={beatIndex} from={TITLE_HOLD + beatIndex * BEAT} durationInFrames={BEAT} layout="none">
            <AbsoluteFill style={{ padding: `0 ${SAFE_SIDE}px`, justifyContent: "center", gap: 44 }}>
              <div style={{ display: "grid" }}>
                <ServiceReveal index={beatIndex * 2} name={SERVICES[beatIndex * 2]} durationInFrames={BEAT} />
              </div>
              <div style={{ display: "grid" }}>
                <ServiceReveal index={beatIndex * 2 + 1} name={SERVICES[beatIndex * 2 + 1]} durationInFrames={BEAT} />
              </div>
            </AbsoluteFill>
          </Sequence>
        ))}

        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} />
        <SceneVoiceOver id="services" />
      </AbsoluteFill>
    </SceneTransition>
  );
};
