import { Composition } from "remotion";
import { HeroReel, HERO_REEL } from "./HeroReel";

export const RemotionRoot = () => (
  <Composition
    id="HeroReel"
    component={HeroReel}
    durationInFrames={HERO_REEL.durationInFrames}
    fps={HERO_REEL.fps}
    width={HERO_REEL.width}
    height={HERO_REEL.height}
  />
);
