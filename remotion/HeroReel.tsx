import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const HERO_REEL = {
  fps: 30,
  durationInFrames: 300,
  width: 1920,
  height: 1080,
};

const CARBON = "#0b0b0b";
const ACCENT = "#ff1a1a";
const LINE = "#1a1a1a";
const SILVER = "#e5e5e5";

const CELL = 120;
const PARTICLE_COUNT = 42;

// Deterministic pseudo-random so every render is identical.
function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function hexagonPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

export const HeroReel = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // Every motion below is a whole number of cycles per loop, so the video loops seamlessly.
  const t = frame / durationInFrames;
  const drift = t * CELL;
  const spin = t * 360;
  const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);

  const cx = width * 0.68;
  const cy = height * 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: CARBON, overflow: "hidden" }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern
            id="grid"
            width={CELL}
            height={CELL}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${drift} ${drift})`}
          >
            <path
              d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
              fill="none"
              stroke={LINE}
              strokeWidth={1}
            />
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="55%" stopColor={CARBON} stopOpacity={0} />
            <stop offset="100%" stopColor={CARBON} stopOpacity={0.9} />
          </radialGradient>
          <radialGradient id="glow">
            <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
            <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width={width} height={height} fill="url(#grid)" opacity={0.7} />

        <circle cx={cx} cy={cy} r={420 + pulse * 40} fill="url(#glow)" />

        <g transform={`rotate(${spin} ${cx} ${cy})`}>
          <polygon
            points={hexagonPoints(cx, cy, 300)}
            fill="none"
            stroke={SILVER}
            strokeWidth={1.5}
            opacity={0.22}
          />
        </g>
        <g transform={`rotate(${-spin * 0.5} ${cx} ${cy})`}>
          <polygon
            points={hexagonPoints(cx, cy, 230)}
            fill="none"
            stroke={SILVER}
            strokeWidth={1}
            opacity={0.14}
            strokeDasharray="18 14"
          />
        </g>
        <g transform={`rotate(${spin / 3} ${cx} ${cy})`}>
          <polygon
            points={hexagonPoints(cx, cy, 150)}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2}
            opacity={0.55 + pulse * 0.3}
          />
        </g>
        <circle cx={cx} cy={cy} r={6 + pulse * 4} fill={ACCENT} opacity={0.9} />

        {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
          const cycles = 1 + Math.round(seeded(i + 200));
          const x = seeded(i) * width;
          const y = (1 - ((seeded(i + 100) + t * cycles) % 1)) * height;
          const size = 1.5 + seeded(i + 300) * 2.5;
          const red = seeded(i + 400) > 0.8;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={size}
              fill={red ? ACCENT : SILVER}
              opacity={red ? 0.7 : 0.12 + seeded(i + 500) * 0.3}
            />
          );
        })}

        <rect width={width} height={height} fill="url(#vignette)" />
      </svg>

      {[0, 0.5].map((phase, i) => {
        const y = ((t + phase) % 1) * (height + 400) - 200;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: y,
              height: 2,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,26,26,0) 25%, rgba(255,26,26,0.45) 55%, rgba(255,26,26,0) 85%, transparent 100%)`,
              boxShadow: "0 0 24px 4px rgba(255,26,26,0.25)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
