import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { TechnicalGrid } from "../../components/TechnicalGrid";
import { Subtitle } from "../../components/Subtitle";
import { SceneVoiceOver } from "../../components/SceneVoiceOver";
import { SceneTransition } from "../../components/SceneTransition";
import { SOFT_WHITE, ACCENT } from "../../theme";
import { displayFont } from "../../fonts";
import { SAFE_SIDE } from "../../reel/safe-zone";
import { getScriptFor } from "../../audio/reel-script";

const DURATION = 180;
const script = getScriptFor("what-we-do");

const PHRASES = [
  { text: "WE DESIGN.", color: SOFT_WHITE },
  { text: "WE BUILD.", color: SOFT_WHITE },
  { text: "WE AUTOMATE.", color: ACCENT },
];
const BEAT = 52;

export const WhatWeDo = () => {
  return (
    <SceneTransition durationInFrames={DURATION}>
      <AbsoluteFill>
        <TechnicalGrid glowX={0.6} glowY={0.45} intensity={1} />
        {PHRASES.map((phrase, i) => (
          <Sequence key={phrase.text} from={i * BEAT} durationInFrames={BEAT + 20} layout="none">
            <Phrase text={phrase.text} color={phrase.color} />
          </Sequence>
        ))}
        <Subtitle text={script.text} highlightWords={script.highlightWords} durationInFrames={DURATION} />
        <SceneVoiceOver id="what-we-do" />
      </AbsoluteFill>
    </SceneTransition>
  );
};

const Phrase = ({ text, color }: { text: string; color: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 16], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: SAFE_SIDE,
        top: "50%",
        opacity,
        transform: `translateY(-50%) translateY(${y}px)`,
        fontFamily: displayFont,
        fontWeight: 900,
        fontSize: 76,
        lineHeight: 1.05,
        letterSpacing: "-0.01em",
        color,
      }}
    >
      {text}
    </div>
  );
};
