// Abstract SVG compositions for Section 03. Pure vector, no images.
// Palette is restricted to the brand tokens: charcoal surfaces, silver lines, one red.

const LINE = "rgba(229,229,229,0.14)";
const LINE_SOFT = "rgba(229,229,229,0.07)";
const PANEL = "#131313";
const PANEL_ALT = "#0f0f0f";
const SILVER = "rgba(229,229,229,0.55)";
const ACCENT = "#ff1a1a";

export type ServiceId =
  | "experiences"
  | "product"
  | "uiux"
  | "ai"
  | "systems";

const common = {
  viewBox: "0 0 800 600",
  className: "wwd-svg",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
} as const;

function TextLines({
  x,
  y,
  widths,
  gap = 14,
  color = LINE,
}: {
  x: number | string;
  y: number | string;
  widths: number[];
  gap?: number;
  color?: string;
}) {
  const top = Number(y);
  return (
    <g>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={top + i * gap} width={w} height={4} rx={2} fill={color} />
      ))}
    </g>
  );
}

function DigitalExperiences() {
  return (
    <svg {...common}>
      {/* browser frame */}
      <rect x="90" y="70" width="620" height="440" rx="6" fill={PANEL} stroke={LINE} />
      <rect x="90" y="70" width="620" height="34" rx="6" fill={PANEL_ALT} />
      <line x1="90" y1="104" x2="710" y2="104" stroke={LINE} />
      <circle cx="112" cy="87" r="4" fill={LINE} />
      <circle cx="128" cy="87" r="4" fill={LINE} />
      <circle cx="144" cy="87" r="4" fill={ACCENT} opacity="0.8" />
      <rect x="300" y="80" width="200" height="14" rx="3" fill={LINE_SOFT} />

      {/* nav */}
      <TextLines x="124" y="130" widths={[40]} color={SILVER} />
      <TextLines x="520" y="130" widths={[34]} />
      <TextLines x="570" y="130" widths={[34]} />
      <TextLines x="620" y="130" widths={[34]} />

      {/* display typography */}
      <rect x="124" y="180" width="330" height="26" rx="3" fill={SILVER} />
      <rect x="124" y="218" width="250" height="26" rx="3" fill={SILVER} />
      <rect x="124" y="256" width="150" height="26" rx="3" fill={ACCENT} />
      <TextLines x="124" y="310" widths={[240, 200, 220]} gap={12} />

      {/* CTA */}
      <rect x="124" y="366" width="120" height="30" rx="2" fill="none" stroke={SILVER} />
      <rect x="146" y="379" width="60" height="4" rx="2" fill={SILVER} />
      <circle cx="226" cy="381" r="3" fill={ACCENT} />

      {/* side visual panel */}
      <rect x="500" y="170" width="180" height="230" rx="4" fill={PANEL_ALT} stroke={LINE} />
      <path d="M520 360 L560 300 L600 330 L640 250 L660 280" fill="none" stroke={SILVER} strokeWidth="1.5" />
      <circle cx="640" cy="250" r="4" fill={ACCENT} className="wwd-pulse" />
      <line x1="520" y1="380" x2="660" y2="380" stroke={LINE} />

      {/* footer strip */}
      <line x1="124" y1="450" x2="680" y2="450" stroke={LINE} />
      <TextLines x="124" y="466" widths={[80]} />
      <TextLines x="600" y="466" widths={[80]} />

      {/* scan */}
      <rect x="90" y="70" width="620" height="2" fill={ACCENT} opacity="0.5" className="wwd-scan" />
    </svg>
  );
}

function ProductDevelopment() {
  const layer = (y: number, fill: string, stroke: string) => (
    <path d={`M400 ${y - 70} L600 ${y} L400 ${y + 70} L200 ${y} Z`} fill={fill} stroke={stroke} />
  );
  return (
    <svg {...common}>
      {/* stacked isometric layers */}
      <g>
        {layer(430, PANEL_ALT, LINE)}
        {layer(350, PANEL, LINE)}
        {layer(270, "#181818", LINE)}
        <path d="M400 130 L600 200 L400 270 L200 200 Z" fill="#1c1c1c" stroke={SILVER} />
        {/* red edge on top layer */}
        <path d="M400 130 L600 200" stroke={ACCENT} strokeWidth="2" />
      </g>

      {/* vertical connectors */}
      <line x1="400" y1="270" x2="400" y2="500" stroke={LINE} strokeDasharray="3 6" />
      <line x1="200" y1="200" x2="200" y2="430" stroke={LINE_SOFT} />
      <line x1="600" y1="200" x2="600" y2="430" stroke={LINE_SOFT} />

      {/* nodes on layers */}
      <circle cx="400" cy="270" r="4" fill={SILVER} />
      <circle cx="400" cy="350" r="4" fill={SILVER} />
      <circle cx="400" cy="430" r="4" fill={ACCENT} className="wwd-pulse" />

      {/* annotation panels */}
      <rect x="80" y="90" width="150" height="70" rx="3" fill={PANEL} stroke={LINE} />
      <TextLines x="94" y="106" widths={[60, 100, 80]} gap={16} />
      <line x1="230" y1="125" x2="330" y2="180" stroke={LINE} />

      <rect x="570" y="440" width="150" height="70" rx="3" fill={PANEL} stroke={LINE} />
      <TextLines x="584" y="456" widths={[100, 60, 90]} gap={16} />
      <rect x="584" y="496" width="40" height="4" rx="2" fill={ACCENT} />
      <line x1="570" y1="475" x2="470" y2="440" stroke={LINE} />

      {/* ticks */}
      <g stroke={LINE_SOFT}>
        <line x1="60" y1="540" x2="740" y2="540" />
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={60 + i * 40} y1="536" x2={60 + i * 40} y2="544" />
        ))}
      </g>
    </svg>
  );
}

function UiUxDesign() {
  return (
    <svg {...common}>
      {/* grid */}
      <g stroke={LINE_SOFT}>
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={80 + i * 53.3} y1="60" x2={80 + i * 53.3} y2="540" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="80" y1={60 + i * 60} x2="720" y2={60 + i * 60} />
        ))}
      </g>

      {/* wireframe blocks */}
      <rect x="80" y="60" width="640" height="60" fill="none" stroke={LINE} />
      <rect x="96" y="82" width="70" height="16" fill={LINE} rx="2" />
      <rect x="600" y="82" width="104" height="16" fill="none" stroke={LINE} rx="2" />

      <rect x="80" y="140" width="400" height="200" fill="none" stroke={LINE} />
      <line x1="80" y1="140" x2="480" y2="340" stroke={LINE_SOFT} />
      <line x1="480" y1="140" x2="80" y2="340" stroke={LINE_SOFT} />

      <rect x="500" y="140" width="220" height="90" fill="none" stroke={LINE} />
      <TextLines x="516" y="160" widths={[120, 180, 90]} gap={18} />

      {/* selected component with handles */}
      <g>
        <rect x="500" y="250" width="220" height="90" fill={PANEL} stroke={ACCENT} />
        <TextLines x="516" y="272" widths={[140, 100]} gap={18} color={SILVER} />
        <rect x="516" y="314" width="60" height="12" rx="2" fill={ACCENT} />
        {[
          [500, 250],
          [720, 250],
          [500, 340],
          [720, 340],
        ].map(([x, y]) => (
          <rect key={`${x}${y}`} x={x - 3} y={y - 3} width="6" height="6" fill={ACCENT} />
        ))}
        <text x="500" y="242" fill={ACCENT} fontSize="9" letterSpacing="2" fontFamily="var(--font-sans)">
          COMPONENT / 04
        </text>
      </g>

      {/* lower cards */}
      {[80, 296, 512].map((x) => (
        <g key={x}>
          <rect x={x} y="360" width="192" height="180" fill="none" stroke={LINE} />
          <rect x={x + 14} y="376" width="164" height="70" fill={PANEL} />
          <TextLines x={x + 14} y="466" widths={[100, 140, 80]} gap={16} />
        </g>
      ))}

      {/* measurement */}
      <g stroke={ACCENT} opacity="0.7">
        <line x1="80" y1="555" x2="480" y2="555" />
        <line x1="80" y1="549" x2="80" y2="561" />
        <line x1="480" y1="549" x2="480" y2="561" />
      </g>
      <text x="268" y="575" fill={ACCENT} fontSize="9" letterSpacing="2" fontFamily="var(--font-sans)" opacity="0.8">
        8 COL
      </text>
    </svg>
  );
}

function AiAutomation() {
  const paths = [
    "M60 300 C 200 300, 220 140, 400 140 S 600 300, 740 300",
    "M60 300 C 200 300, 220 460, 400 460 S 600 300, 740 300",
    "M60 300 C 240 300, 260 220, 400 220 S 560 300, 740 300",
    "M60 300 C 240 300, 260 380, 400 380 S 560 300, 740 300",
    "M60 300 L 740 300",
  ];
  return (
    <svg {...common}>
      {/* faint grid */}
      <g stroke={LINE_SOFT}>
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1="60" y1={120 + i * 60} x2="740" y2={120 + i * 60} />
        ))}
      </g>

      {/* flow paths */}
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={LINE} strokeWidth="1.2" />
      ))}
      {/* energy paths */}
      <path d={paths[2]} fill="none" stroke={ACCENT} strokeWidth="1.6" className="wwd-flow" opacity="0.9" />
      <path d={paths[1]} fill="none" stroke={ACCENT} strokeWidth="1.2" className="wwd-flow wwd-flow--slow" opacity="0.55" />

      {/* nodes */}
      {[
        [60, 300],
        [400, 140],
        [400, 220],
        [400, 300],
        [400, 380],
        [400, 460],
        [740, 300],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill="none" stroke={LINE} />
          <circle cx={x} cy={y} r="3.5" fill={i === 3 ? ACCENT : SILVER} className={i === 3 ? "wwd-pulse" : undefined} />
        </g>
      ))}
      <circle cx="400" cy="300" r="26" fill="none" stroke={ACCENT} opacity="0.35" />
      <circle cx="400" cy="300" r="44" fill="none" stroke={ACCENT} opacity="0.15" />

      {/* labels */}
      <TextLines x="60" y="322" widths={[50, 30]} gap={10} />
      <TextLines x="690" y="322" widths={[50, 30]} gap={10} />
      <rect x="340" y="500" width="120" height="30" rx="2" fill={PANEL} stroke={LINE} />
      <rect x="352" y="513" width="60" height="4" rx="2" fill={SILVER} />
      <circle cx="440" cy="515" r="3" fill={ACCENT} />
    </svg>
  );
}

function DigitalSystems() {
  const nodes: [number, number][] = [
    [400, 300],
    [240, 200],
    [560, 200],
    [240, 400],
    [560, 400],
    [400, 120],
    [400, 480],
    [120, 300],
    [680, 300],
  ];
  const links: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [2, 5],
    [3, 6],
    [4, 6],
    [1, 7],
    [3, 7],
    [2, 8],
    [4, 8],
  ];
  return (
    <svg {...common}>
      {/* concentric structure */}
      <circle cx="400" cy="300" r="200" fill="none" stroke={LINE_SOFT} strokeDasharray="2 10" />
      <circle cx="400" cy="300" r="120" fill="none" stroke={LINE_SOFT} />

      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={i < 4 ? "rgba(255,26,26,0.45)" : LINE}
          strokeWidth={i < 4 ? 1.4 : 1}
        />
      ))}

      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x - 16}
            y={y - 16}
            width="32"
            height="32"
            rx="3"
            fill={i === 0 ? "#1a0a0a" : PANEL}
            stroke={i === 0 ? ACCENT : LINE}
            transform={`rotate(45 ${x} ${y})`}
          />
          <circle cx={x} cy={y} r="3" fill={i === 0 ? ACCENT : SILVER} className={i === 0 ? "wwd-pulse" : undefined} />
        </g>
      ))}

      {/* system labels */}
      <g>
        <rect x="60" y="60" width="140" height="56" rx="3" fill={PANEL} stroke={LINE} />
        <TextLines x="74" y="76" widths={[70, 100]} gap={16} />
        <rect x="74" y="104" width="30" height="3" rx="1.5" fill={ACCENT} />
      </g>
      <g>
        <rect x="600" y="484" width="140" height="56" rx="3" fill={PANEL} stroke={LINE} />
        <TextLines x="614" y="500" widths={[100, 60]} gap={16} />
        <TextLines x="614" y="528" widths={[40]} color={SILVER} />
      </g>

      {/* status ticks */}
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={620 + i * 22} y="70" width="12" height="4" rx="2" fill={i < 4 ? SILVER : ACCENT} />
      ))}
    </svg>
  );
}

export default function ServiceVisual({ id }: { id: ServiceId }) {
  switch (id) {
    case "experiences":
      return <DigitalExperiences />;
    case "product":
      return <ProductDevelopment />;
    case "uiux":
      return <UiUxDesign />;
    case "ai":
      return <AiAutomation />;
    case "systems":
      return <DigitalSystems />;
  }
}
