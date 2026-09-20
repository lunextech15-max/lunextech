import { Series, AbsoluteFill } from "remotion";
import { Intro } from "./scenes/Intro";
import { WhoWeAre } from "./scenes/WhoWeAre";
import { WhatWeDo } from "./scenes/WhatWeDo";
import { Internships } from "./scenes/Internships";
import { PreBuiltSoftware } from "./scenes/PreBuiltSoftware";
import { SelectedWork } from "./scenes/SelectedWork";
import { Closing } from "./scenes/Closing";
import { SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";
import { CARBON } from "./theme";

const INTRO_DURATION = 140;
const WHO_WE_ARE_DURATION = 160;
const SERVICE_ITEM_DURATION = 36;
const INTERNSHIPS_DURATION = 150;
const PRE_BUILT_SOFTWARE_DURATION = 160;
const PROJECT_ITEM_DURATION = 42;
const PROJECTS_SHOWN = 5;
const CLOSING_DURATION = 90;

export const WHAT_WE_DO_DURATION = SERVICES.length * SERVICE_ITEM_DURATION;
export const SELECTED_WORK_DURATION = Math.min(PROJECTS.length, PROJECTS_SHOWN) * PROJECT_ITEM_DURATION;

export const BRAND_SHOWCASE = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames:
    INTRO_DURATION +
    WHO_WE_ARE_DURATION +
    WHAT_WE_DO_DURATION +
    INTERNSHIPS_DURATION +
    PRE_BUILT_SOFTWARE_DURATION +
    SELECTED_WORK_DURATION +
    CLOSING_DURATION,
};

export const BrandShowcase = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CARBON }}>
      <Series>
        <Series.Sequence durationInFrames={INTRO_DURATION}>
          <Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WHO_WE_ARE_DURATION}>
          <WhoWeAre />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WHAT_WE_DO_DURATION}>
          <WhatWeDo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={INTERNSHIPS_DURATION}>
          <Internships />
        </Series.Sequence>
        <Series.Sequence durationInFrames={PRE_BUILT_SOFTWARE_DURATION}>
          <PreBuiltSoftware />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SELECTED_WORK_DURATION}>
          <SelectedWork />
        </Series.Sequence>
        <Series.Sequence durationInFrames={CLOSING_DURATION}>
          <Closing />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
