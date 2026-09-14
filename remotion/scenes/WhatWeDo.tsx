import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop, TechnicalLabel } from "../Backdrop";
import { SOFT_WHITE, ACCENT } from "../theme";
import { displayFont, bodyFont } from "../fonts";
import { SERVICES } from "@/lib/services";

const ITEM_DURATION = 36;

const ServiceItem = ({ index }: { index: number }) => {
  const frame = useCurrentFrame();
  const service = SERVICES[index];

  const opacity = interpolate(frame, [0, 8, ITEM_DURATION - 8, ITEM_DURATION], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 10], [22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ gridArea: "1 / 1", opacity, transform: `translateY(${y}px)`, maxWidth: 1100, alignSelf: "center" }}>
      <span style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 22, color: ACCENT }}>
        0{index + 1}
      </span>
      <div style={{ marginTop: 14, fontFamily: displayFont, fontWeight: 900, fontSize: 70, color: SOFT_WHITE, lineHeight: 1 }}>
        {service.title.toUpperCase()}
      </div>
      <div style={{ marginTop: 20, fontFamily: bodyFont, fontWeight: 400, fontSize: 24, color: `${SOFT_WHITE}99`, maxWidth: 780 }}>
        {service.description}
      </div>
    </div>
  );
};

export const WhatWeDo = () => {
  const frame = useCurrentFrame();
  const total = SERVICES.length * ITEM_DURATION;
  const exitOpacity = interpolate(frame, [total - 20, total - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Backdrop glowX={0.68} glowY={0.5} intensity={0.9} />
      <AbsoluteFill style={{ padding: "0 140px" }}>
        <div style={{ marginTop: 90 }}>
          <TechnicalLabel number="03" label="What we do" />
        </div>
        <div style={{ position: "absolute", top: 40, bottom: 0, left: 140, right: 140, display: "grid" }}>
          {SERVICES.map((service, i) => (
            <Sequence key={service.id} from={i * ITEM_DURATION} durationInFrames={ITEM_DURATION} layout="none">
              <ServiceItem index={i} />
            </Sequence>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
