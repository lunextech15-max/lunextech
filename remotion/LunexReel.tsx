import { Series, AbsoluteFill, Audio, staticFile } from "remotion";
import { Opening } from "./scenes/reel/Opening";
import { WhoWeAre } from "./scenes/reel/WhoWeAre";
import { WhatWeDo } from "./scenes/reel/WhatWeDo";
import { Services } from "./scenes/reel/Services";
import { Process } from "./scenes/reel/Process";
import { Delivery } from "./scenes/reel/Delivery";
import { BrandStatement } from "./scenes/reel/BrandStatement";
import { EndCTA } from "./scenes/reel/EndCTA";
import { REEL_AUDIO, MUSIC_VOLUME } from "./audio/reel-audio-config";
import { CARBON } from "./theme";
import { REEL_WIDTH, REEL_HEIGHT } from "./reel/safe-zone";

// Scene durations — see remotion/audio/reel-script.ts for the matching
// voice-over text per scene. These are currently sized off the brief's
// approximate timing (0:00-0:05, 0:05-0:12, etc), NOT measured VO audio —
// once real voice-over clips exist, re-time each scene to the actual clip
// length (with ~0.3-0.8s breathing room per the brief) rather than these
// placeholders, so narration never gets cut off early.
const OPENING_DURATION = 150; // 0:00-0:05
const WHO_WE_ARE_DURATION = 210; // 0:05-0:12
const WHAT_WE_DO_DURATION = 180; // 0:12-0:18
const SERVICES_DURATION = 360; // 0:18-0:30
const PROCESS_DURATION = 360; // 0:30-0:42
const DELIVERY_DURATION = 240; // 0:42-0:50
const BRAND_STATEMENT_DURATION = 180; // 0:50-0:56
const END_CTA_DURATION = 150; // 0:56-1:01 (a touch past 1:00 to let the CTA breathe)

export const LUNEX_REEL = {
  fps: 30,
  width: REEL_WIDTH,
  height: REEL_HEIGHT,
  durationInFrames:
    OPENING_DURATION +
    WHO_WE_ARE_DURATION +
    WHAT_WE_DO_DURATION +
    SERVICES_DURATION +
    PROCESS_DURATION +
    DELIVERY_DURATION +
    BRAND_STATEMENT_DURATION +
    END_CTA_DURATION,
};

export const LunexReel = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CARBON }}>
      {/* Background music — silent until REEL_AUDIO.music is set (see
          remotion/audio/reel-audio-config.ts). Sits under the voice-over
          per the brief; once real VO clips exist, this should duck further
          under each one rather than staying at one flat level. */}
      {REEL_AUDIO.music && <Audio src={staticFile(REEL_AUDIO.music)} volume={MUSIC_VOLUME} />}

      <Series>
        <Series.Sequence durationInFrames={OPENING_DURATION}>
          <Opening />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WHO_WE_ARE_DURATION}>
          <WhoWeAre />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WHAT_WE_DO_DURATION}>
          <WhatWeDo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SERVICES_DURATION}>
          <Services />
        </Series.Sequence>
        <Series.Sequence durationInFrames={PROCESS_DURATION}>
          <Process />
        </Series.Sequence>
        <Series.Sequence durationInFrames={DELIVERY_DURATION}>
          <Delivery />
        </Series.Sequence>
        <Series.Sequence durationInFrames={BRAND_STATEMENT_DURATION}>
          <BrandStatement />
        </Series.Sequence>
        <Series.Sequence durationInFrames={END_CTA_DURATION}>
          <EndCTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
