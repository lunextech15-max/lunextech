import { AbsoluteFill, interpolate, useCurrentFrame, Sequence } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { AnimatedText } from "../../components/AnimatedText";
import { GlowLine } from "../../components/GlowLine";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { SOFT_WHITE, ACCENT } from "../../theme";
import { bodyFont } from "../../fonts";
import { SAFE_SIDE } from "../../reel/safe-zone";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 210;
const script = getScriptFor("who-we-are");

const KEYWORDS = ["IDEAS", "DIGITAL EXPERIENCES", "REAL BUSINESSES"];
const KEYWORD_START = 90;
const KEYWORD_BEAT = 40;

export const WhoWeAre = () => {
  return (
    <SceneTransition durationInFrames={DURATION}>
      <AbsoluteFill>
        <TechnicalGrid glowX={0.3} glowY={0.3} intensity={0.9} />
        <AbsoluteFill style={{ padding: `0 ${SAFE_SIDE}px`, justifyContent: "center" }}>
          <div style={{ marginBottom: 24 }}>
            <AnimatedText fontSize={22} fontWeight={700} color={`${SOFT_WHITE}66`} letterSpacing="0.3em" font="body">
              WHO WE ARE
            </AnimatedText>
          </div>

          <AnimatedText reveal="mask" fontSize={64} delay={12}>
            LUNEX
          </AnimatedText>
          <div style={{ marginTop: -6 }}>
            <AnimatedText reveal="mask" fontSize={64} delay={20} color={ACCENT}>
              TECH.
            </AnimatedText>
          </div>

          <div style={{ marginTop: 50, height: 90 }}>
            {KEYWORDS.map((word, i) => (
              <Sequence key={word} from={KEYWORD_START + i * KEYWORD_BEAT} durationInFrames={KEYWORD_BEAT} layout="none">
                <KeywordBeat word={word} />
              </Sequence>
            ))}
          </div>
        </AbsoluteFill>
        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} />
        <SceneVoiceOver id="who-we-are" />
      </AbsoluteFill>
    </SceneTransition>
  );
};

const KeywordBeat = ({ word }: { word: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, KEYWORD_BEAT - 8, KEYWORD_BEAT], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", opacity }}>
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 38,
          color: SOFT_WHITE,
          letterSpacing: "0.02em",
        }}
      >
        {word}
      </div>
      <div style={{ marginTop: 14 }}>
        <GlowLine length={200} drawInFrames={20} />
      </div>
    </div>
  );
};
