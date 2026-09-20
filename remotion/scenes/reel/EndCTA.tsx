import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { LogoReveal } from "../../components/LogoReveal";
import { GlowLine } from "../../components/GlowLine";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { SOFT_WHITE, ACCENT } from "../../theme";
import { bodyFont } from "../../fonts";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 150;
const script = getScriptFor("end-cta");

// The live domain, not a fabricated one — matches src/lib/site.ts today.
const DOMAIN = "lunextech.vercel.app";

export const EndCTA = () => {
  const frame = useCurrentFrame();
  const lineIn = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stackIn = interpolate(frame, [60, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stackY = interpolate(frame, [60, 82], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const domainIn = interpolate(frame, [88, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaIn = interpolate(frame, [110, 128], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <SceneTransition durationInFrames={DURATION} outroFrames={26}>
      <AbsoluteFill>
        <TechnicalGrid glowX={0.5} glowY={0.42} intensity={1.2} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <LogoReveal fontSize={72} />

          <div style={{ marginTop: 30, opacity: lineIn }}>
            <GlowLine length={80} drawInFrames={16} />
          </div>

          <div
            style={{
              marginTop: 26,
              opacity: stackIn,
              transform: `translateY(${stackY}px)`,
              fontFamily: bodyFont,
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: "0.06em",
              color: SOFT_WHITE,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            DESIGN. BUILD. GROW.
          </div>

          <div
            style={{
              marginTop: 14,
              opacity: domainIn,
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: `${SOFT_WHITE}66`,
            }}
          >
            WEB &bull; SOFTWARE &bull; AI &bull; DESIGN
          </div>

          <div
            style={{
              marginTop: 36,
              opacity: domainIn,
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "0.05em",
              color: ACCENT,
            }}
          >
            {DOMAIN}
          </div>

          <div
            style={{
              marginTop: 20,
              opacity: ctaIn,
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: `${SOFT_WHITE}80`,
            }}
          >
            Let&apos;s build something.
          </div>
        </AbsoluteFill>

        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} fadeFrames={10} />
        <SceneVoiceOver id="end-cta" />
      </AbsoluteFill>
    </SceneTransition>
  );
};
