import { Composition } from "remotion";
import { HeroReel, HERO_REEL } from "./HeroReel";
import { BrandShowcase, BRAND_SHOWCASE } from "./BrandShowcase";
import "./fonts";

export const RemotionRoot = () => (
  <>
    <Composition
      id="HeroReel"
      component={HeroReel}
      durationInFrames={HERO_REEL.durationInFrames}
      fps={HERO_REEL.fps}
      width={HERO_REEL.width}
      height={HERO_REEL.height}
    />
    <Composition
      id="BrandShowcase"
      component={BrandShowcase}
      durationInFrames={BRAND_SHOWCASE.durationInFrames}
      fps={BRAND_SHOWCASE.fps}
      width={BRAND_SHOWCASE.width}
      height={BRAND_SHOWCASE.height}
    />
  </>
);
