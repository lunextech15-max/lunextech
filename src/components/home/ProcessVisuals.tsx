// Small, lightweight abstract SVG motifs for Section 05 — one per process stage.
// Same restrained palette as the rest of the site; pure vector, no images/icons.

const LINE = "rgba(229,229,229,0.16)";
const LINE_SOFT = "rgba(229,229,229,0.08)";
const SILVER = "rgba(229,229,229,0.55)";
const ACCENT = "#ff1a1a";

export type ProcessId = "discover" | "define" | "design" | "build" | "evolve";

const common = {
  viewBox: "0 0 240 240",
  className: "hww-svg",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
} as const;

function Discover() {
  // Exploration: a source point sending out thin signal paths to scattered points.
  const points: [number, number][] = [
    [190, 60],
    [205, 120],
    [175, 175],
    [110, 205],
    [55, 165],
    [45, 95],
  ];
  return (
    <svg {...common}>
      <circle cx="120" cy="120" r="4" fill={ACCENT} className="hww-pulse" />
      {points.map(([x, y], i) => (
        <line key={i} x1="120" y1="120" x2={x} y2={y} stroke={i === 0 ? ACCENT : LINE} strokeWidth={i === 0 ? 1.2 : 1} className={i === 0 ? "hww-flow" : undefined} />
      ))}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 3 : 2.5} fill={i === 0 ? ACCENT : SILVER} opacity={i === 0 ? 0.9 : 0.5} />
      ))}
      <circle cx="120" cy="120" r="60" fill="none" stroke={LINE_SOFT} strokeDasharray="2 8" />
      <circle cx="120" cy="120" r="92" fill="none" stroke={LINE_SOFT} strokeDasharray="1 10" />
    </svg>
  );
}

function Define() {
  // Structure: a quiet grid with one aligned axis picked out in red.
  return (
    <svg {...common}>
      <g stroke={LINE_SOFT}>
        {[48, 88, 128, 168, 208].map((v) => (
          <line key={`v${v}`} x1={v} y1="30" x2={v} y2="210" />
        ))}
        {[60, 100, 140, 180].map((h) => (
          <line key={`h${h}`} x1="30" y1={h} x2="220" y2={h} />
        ))}
      </g>
      <line x1="128" y1="30" x2="128" y2="210" stroke={ACCENT} strokeWidth="1.4" opacity="0.75" />
      <rect x="88" y="100" width="80" height="40" fill="none" stroke={SILVER} strokeWidth="1" />
      <circle cx="128" cy="100" r="3" fill={ACCENT} className="hww-pulse" />
      <circle cx="128" cy="140" r="3" fill={ACCENT} className="hww-pulse" />
    </svg>
  );
}

function Design() {
  // Composition: overlapping layout fragments and a baseline of type.
  return (
    <svg {...common}>
      <rect x="40" y="40" width="120" height="86" fill="none" stroke={LINE} />
      <rect x="76" y="94" width="124" height="86" fill="none" stroke={SILVER} strokeWidth="1.2" />
      <rect x="92" y="112" width="60" height="10" fill={SILVER} opacity="0.6" />
      <rect x="92" y="130" width="92" height="4" fill={LINE} />
      <rect x="92" y="140" width="70" height="4" fill={LINE} />
      <rect x="92" y="150" width="40" height="4" fill={ACCENT} className="hww-pulse" />
      <circle cx="76" cy="94" r="2.5" fill={ACCENT} />
      <circle cx="200" cy="180" r="2.5" fill={ACCENT} />
      <line x1="20" y1="200" x2="220" y2="200" stroke={LINE_SOFT} />
    </svg>
  );
}

function Build() {
  // Construction: stacked, connected modules.
  const layers = [
    { y: 150, w: 140, fill: "#151515" },
    { y: 112, w: 116, fill: "#1a1a1a" },
    { y: 74, w: 92, fill: "#1f1f1f" },
  ];
  return (
    <svg {...common}>
      {layers.map((l, i) => (
        <rect key={i} x={120 - l.w / 2} y={l.y} width={l.w} height="28" fill={l.fill} stroke={LINE} />
      ))}
      <rect x={120 - layers[2].w / 2} y={74} width={layers[2].w} height="28" fill="none" stroke={ACCENT} strokeWidth="1.2" />
      <line x1="120" y1="60" x2="120" y2="178" stroke={LINE_SOFT} strokeDasharray="2 6" />
      <circle cx="120" cy="60" r="3" fill={ACCENT} className="hww-pulse" />
      <line x1="60" y1="164" x2="40" y2="164" stroke={LINE} className="hww-flow" />
      <line x1="180" y1="126" x2="200" y2="126" stroke={LINE} className="hww-flow" />
      <circle cx="40" cy="164" r="2" fill={SILVER} />
      <circle cx="200" cy="126" r="2" fill={SILVER} />
    </svg>
  );
}

function Evolve() {
  // Growth: ascending, expanding bars moving forward.
  const bars = [
    { x: 48, h: 30 },
    { x: 86, h: 54 },
    { x: 124, h: 80 },
    { x: 162, h: 112 },
  ];
  return (
    <svg {...common}>
      <line x1="30" y1="200" x2="210" y2="200" stroke={LINE_SOFT} />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={200 - b.h}
          width="22"
          height={b.h}
          fill={i === bars.length - 1 ? "none" : "#171717"}
          stroke={i === bars.length - 1 ? ACCENT : LINE}
          strokeWidth={i === bars.length - 1 ? 1.4 : 1}
        />
      ))}
      <path d="M48 170 L86 146 L124 120 L184 78" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.8" className="hww-flow" />
      <circle cx="184" cy="78" r="3.5" fill={ACCENT} className="hww-pulse" />
    </svg>
  );
}

export default function ProcessVisual({ id }: { id: ProcessId }) {
  switch (id) {
    case "discover":
      return <Discover />;
    case "define":
      return <Define />;
    case "design":
      return <Design />;
    case "build":
      return <Build />;
    case "evolve":
      return <Evolve />;
  }
}
