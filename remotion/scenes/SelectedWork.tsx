import { AbsoluteFill, Sequence, Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Backdrop, TechnicalLabel } from "../Backdrop";
import { SOFT_WHITE, ACCENT, LINE, CARBON } from "../theme";
import { displayFont, bodyFont } from "../fonts";
import { PROJECTS } from "@/lib/projects";

const ITEM_DURATION = 42;
const SHOWN = PROJECTS.slice(0, 5);

const ProjectItem = ({ index }: { index: number }) => {
  const frame = useCurrentFrame();
  const project = SHOWN[index];

  const opacity = interpolate(frame, [0, 10, ITEM_DURATION - 10, ITEM_DURATION], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, 14], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, opacity, display: "flex", alignItems: "center", padding: "0 140px", gap: 90 }}>
      <div
        style={{
          width: 720,
          height: 460,
          border: `1px solid ${LINE}`,
          overflow: "hidden",
          transform: `translateX(${x}px)`,
          flexShrink: 0,
          background: CARBON,
        }}
      >
        {project.image && (
          <Img src={staticFile(project.image)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        )}
      </div>

      <div style={{ transform: `translateX(${x}px)`, maxWidth: 560 }}>
        <span style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 20, color: ACCENT, letterSpacing: "0.15em" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div style={{ marginTop: 16, fontFamily: displayFont, fontWeight: 900, fontSize: 54, color: SOFT_WHITE, lineHeight: 1.02 }}>
          {project.title.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          {project.category}
        </div>
        <div style={{ marginTop: 20, fontFamily: bodyFont, fontWeight: 400, fontSize: 19, lineHeight: 1.5, color: `${SOFT_WHITE}99` }}>
          {project.shortDescription}
        </div>
      </div>
    </div>
  );
};

export const SelectedWork = () => {
  const frame = useCurrentFrame();
  const total = SHOWN.length * ITEM_DURATION;
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [total - 20, total - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Backdrop glowX={0.5} glowY={0.5} intensity={0.8} />
      <div style={{ position: "absolute", top: 70, left: 140, opacity: labelOpacity }}>
        <TechnicalLabel number="06" label="Selected work" />
      </div>
      {SHOWN.map((project, i) => (
        <Sequence key={project.id} from={i * ITEM_DURATION} durationInFrames={ITEM_DURATION} layout="none">
          <ProjectItem index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
