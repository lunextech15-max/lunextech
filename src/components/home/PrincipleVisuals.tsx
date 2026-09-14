// Small, lightweight abstract SVG motifs for Section 07 — one per principle.
// Same restrained palette as ProcessVisuals.tsx; pure vector, no images/icons.

const LINE = "rgba(229,229,229,0.16)";
const LINE_SOFT = "rgba(229,229,229,0.08)";
const SILVER = "rgba(229,229,229,0.55)";
const ACCENT = "#ff1a1a";

export type PrincipleId = "think" | "design" | "technology" | "evolve";

const common = {
  viewBox: "0 0 240 240",
  className: "why-svg",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
} as const;

function Think() {
  // Questions / exploration: a central point questioning outward to scattered possibilities.
  const points: [number, number][] = [
    [180, 70],
    [200, 130],
    [160, 190],
    [90, 200],
    [45, 150],
    [55, 80],
    [120, 45],
  ];
  return (
    <svg {...common}>
      <circle cx="120" cy="120" r="4" fill={ACCENT} className="why-pulse" />
      {points.map(([x, y], i) => (
        <line
          key={i}
          x1="120"
          y1="120"
          x2={x}
          y2={y}
          stroke={i === 2 ? ACCENT : LINE}
          strokeWidth={i === 2 ? 1.2 : 1}
          className={i === 2 ? "why-flow" : undefined}
        />
      ))}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 3 : 2.2} fill={i === 2 ? ACCENT : SILVER} opacity={i === 2 ? 0.9 : 0.45} />
      ))}
      <circle cx="120" cy="120" r="48" fill="none" stroke={LINE_SOFT} strokeDasharray="2 7" />
      <circle cx="120" cy="120" r="78" fill="none" stroke={LINE_SOFT} strokeDasharray="1 9" />
    </svg>
  );
}

function Design() {
  // Composition / balance: a picked-out grid axis with a balanced typographic block.
  return (
    <svg {...common}>
      <g stroke={LINE_SOFT}>
        {[50, 85, 120, 155, 190].map((v) => (
          <line key={`v${v}`} x1={v} y1="35" x2={v} y2="205" />
        ))}
        {[65, 100, 140, 175].map((h) => (
          <line key={`h${h}`} x1="35" y1={h} x2="205" y2={h} />
        ))}
      </g>
      <line x1="35" y1="120" x2="205" y2="120" stroke={ACCENT} strokeWidth="1.2" opacity="0.7" />
      <rect x="70" y="90" width="100" height="60" fill="none" stroke={SILVER} strokeWidth="1" />
      <rect x="86" y="106" width="46" height="8" fill={SILVER} opacity="0.55" />
      <rect x="86" y="122" width="68" height="4" fill={LINE} />
      <rect x="86" y="132" width="30" height="4" fill={ACCENT} className="why-pulse" />
      <circle cx="70" cy="90" r="2.5" fill={ACCENT} />
      <circle cx="170" cy="150" r="2.5" fill={ACCENT} />
    </svg>
  );
}

function Technology() {
  // Systems / connected modules: a small structured node network.
  const nodes: [number, number][] = [
    [120, 120],
    [120, 55],
    [180, 90],
    [180, 150],
    [120, 185],
    [60, 150],
    [60, 90],
  ];
  const links: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ];
  return (
    <svg {...common}>
      <circle cx="120" cy="120" r="82" fill="none" stroke={LINE_SOFT} strokeDasharray="2 8" />
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={i === 1 ? ACCENT : LINE}
          strokeWidth={i === 1 ? 1.3 : 1}
          className={i === 1 ? "why-flow" : undefined}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <rect
          key={i}
          x={x - 8}
          y={y - 8}
          width="16"
          height="16"
          rx="2"
          fill={i === 0 ? "#1a0a0a" : "#161616"}
          stroke={i === 0 ? ACCENT : LINE}
          transform={`rotate(45 ${x} ${y})`}
        />
      ))}
      <circle cx="120" cy="120" r="2.5" fill={ACCENT} className="why-pulse" />
    </svg>
  );
}

function Evolve() {
  // Growth / forward movement: ascending steps with an outward-reaching path.
  const bars = [
    { x: 55, h: 26 },
    { x: 90, h: 48 },
    { x: 125, h: 74 },
    { x: 160, h: 104 },
  ];
  return (
    <svg {...common}>
      <line x1="35" y1="190" x2="205" y2="190" stroke={LINE_SOFT} />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={190 - b.h}
          width="20"
          height={b.h}
          fill={i === bars.length - 1 ? "none" : "#171717"}
          stroke={i === bars.length - 1 ? ACCENT : LINE}
          strokeWidth={i === bars.length - 1 ? 1.3 : 1}
        />
      ))}
      <path
        d="M55 164 L90 142 L125 116 L180 68"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.2"
        opacity="0.8"
        className="why-flow"
      />
      <circle cx="180" cy="68" r="3.2" fill={ACCENT} className="why-pulse" />
      <circle cx="200" cy="50" r="2" fill={SILVER} opacity="0.5" />
      <circle cx="205" cy="66" r="1.4" fill={SILVER} opacity="0.35" />
    </svg>
  );
}

export default function PrincipleVisual({ id }: { id: PrincipleId }) {
  switch (id) {
    case "think":
      return <Think />;
    case "design":
      return <Design />;
    case "technology":
      return <Technology />;
    case "evolve":
      return <Evolve />;
  }
}
