// Abstract SVG compositions for Section 04 — What We Build. Pure vector, no images.
// Palette is restricted to the brand tokens: charcoal surfaces, silver lines, one red.

const LINE = "rgba(229,229,229,0.14)";
const LINE_SOFT = "rgba(229,229,229,0.07)";
const PANEL = "#131313";
const PANEL_ALT = "#0f0f0f";
const GREY_1 = "#181818";
const GREY_2 = "#1c1c1c";
const RED_PANEL = "#1a0a0a";
const SILVER = "rgba(229,229,229,0.55)";
const ACCENT = "#ff1a1a";

export type BuildId = "websites" | "webapps" | "mobile" | "products" | "ai" | "systems";

const common = {
  viewBox: "0 0 800 600",
  className: "wwb-svg",
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

function Label({
  x,
  y,
  children,
  color = ACCENT,
}: {
  x: number | string;
  y: number | string;
  children: string;
  color?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize="11"
      letterSpacing="2"
      fontFamily="var(--font-sans)"
      className="wwb-detail"
    >
      {children}
    </text>
  );
}

/* 01 — Websites: premium abstract browser window with typography fragments. */
function Websites() {
  return (
    <svg {...common}>
      {/* depth frame behind */}
      <g className="wwb-detail">
        <rect x="130" y="40" width="620" height="440" rx="6" fill={PANEL_ALT} stroke={LINE_SOFT} />
      </g>

      {/* browser frame */}
      <rect x="80" y="90" width="620" height="440" rx="6" fill={PANEL} stroke={LINE} />
      <rect x="80" y="90" width="620" height="36" rx="6" fill={GREY_1} />
      <rect x="80" y="110" width="620" height="16" fill={GREY_1} />
      <line x1="80" y1="126" x2="700" y2="126" stroke={LINE} />
      <circle cx="102" cy="108" r="4" fill={LINE} />
      <circle cx="118" cy="108" r="4" fill={LINE} />
      <circle cx="134" cy="108" r="4" fill={ACCENT} opacity="0.8" />
      <rect x="260" y="101" width="260" height="14" rx="7" fill={LINE_SOFT} />
      <rect x="272" y="106" width="90" height="4" rx="2" fill={LINE} />

      {/* navigation */}
      <rect x="112" y="145" width="12" height="12" rx="2" fill={SILVER} />
      <rect x="130" y="149" width="40" height="4" rx="2" fill={SILVER} />
      <TextLines x="440" y="149" widths={[30]} />
      <TextLines x="490" y="149" widths={[30]} />
      <TextLines x="540" y="149" widths={[30]} />
      <TextLines x="590" y="149" widths={[24]} />
      <rect x="628" y="140" width="48" height="20" rx="2" fill="none" stroke={SILVER} />
      <rect x="640" y="148" width="24" height="4" rx="2" fill={SILVER} />

      {/* display typography fragments */}
      <rect x="112" y="200" width="300" height="30" rx="3" fill={SILVER} />
      <rect x="112" y="240" width="220" height="30" rx="3" fill={SILVER} />
      <rect x="112" y="280" width="140" height="30" rx="3" fill={ACCENT} />
      <rect x="262" y="280" width="90" height="30" rx="3" fill="none" stroke={LINE} />
      <TextLines x="112" y="332" widths={[230, 190]} gap={12} />

      {/* CTA */}
      <rect x="112" y="372" width="110" height="30" rx="2" fill="none" stroke={SILVER} />
      <rect x="130" y="385" width="50" height="4" rx="2" fill={SILVER} />
      <line x1="190" y1="387" x2="206" y2="387" stroke={ACCENT} />
      <path d="M202 383 L206 387 L202 391" fill="none" stroke={ACCENT} />

      {/* hero visual card */}
      <rect x="450" y="190" width="220" height="212" rx="4" fill={PANEL_ALT} stroke={LINE} />
      <rect x="468" y="208" width="184" height="110" rx="3" fill={GREY_1} />
      <line x1="468" y1="318" x2="652" y2="208" stroke={LINE_SOFT} />
      <circle cx="640" cy="222" r="3" fill={ACCENT} className="wwb-pulse" />
      <rect x="468" y="334" width="40" height="4" rx="2" fill={ACCENT} />
      <TextLines x="468" y="350" widths={[140, 100]} gap={12} />

      {/* feature row */}
      <line x1="112" y1="430" x2="670" y2="430" stroke={LINE} />
      {[112, 300, 488].map((x) => (
        <g key={x}>
          <rect x={x} y="448" width="12" height="12" rx="2" fill="none" stroke={SILVER} />
          <TextLines x={x + 22} y="452" widths={[100, 70]} gap={12} />
        </g>
      ))}

      {/* footer */}
      <g className="wwb-detail">
        <line x1="112" y1="498" x2="670" y2="498" stroke={LINE_SOFT} />
        <TextLines x="112" y="508" widths={[60]} />
        <TextLines x="610" y="508" widths={[60]} />
      </g>

      <Label x="80" y="556">PAGE / 01</Label>

      {/* scan */}
      <rect x="80" y="90" width="620" height="2" fill={ACCENT} opacity="0.5" className="wwb-scan" />
    </svg>
  );
}

/* 02 — Web Applications: layered application interface with a floating record panel. */
function WebApplications() {
  const rows = [310, 338, 366, 394, 422, 450];
  return (
    <svg {...common}>
      {/* depth layers */}
      <g className="wwb-detail">
        <rect x="200" y="50" width="540" height="400" rx="4" fill={PANEL_ALT} stroke={LINE_SOFT} />
        <rect x="150" y="90" width="540" height="400" rx="4" fill={PANEL} stroke={LINE} />
        <g stroke={LINE_SOFT}>
          <line x1="100" y1="130" x2="200" y2="50" />
          <line x1="640" y1="130" x2="740" y2="50" />
        </g>
      </g>

      {/* front application */}
      <rect x="100" y="130" width="540" height="400" rx="4" fill={GREY_1} stroke={LINE} />
      <rect x="100" y="130" width="540" height="34" rx="4" fill={GREY_2} />
      <rect x="100" y="150" width="540" height="14" fill={GREY_2} />
      <line x1="100" y1="164" x2="640" y2="164" stroke={LINE} />
      <rect x="116" y="142" width="10" height="10" rx="2" fill={SILVER} />
      <TextLines x="134" y="145" widths={[50]} color={SILVER} />
      <rect x="440" y="140" width="120" height="14" rx="7" fill={LINE_SOFT} />
      <circle cx="616" cy="147" r="6" fill={LINE} />

      {/* sidebar */}
      <rect x="100" y="164" width="124" height="362" fill={PANEL_ALT} />
      <line x1="224" y1="164" x2="224" y2="530" stroke={LINE} />
      <TextLines x="120" y="190" widths={[64]} />
      <rect x="100" y="206" width="2" height="16" fill={ACCENT} />
      <TextLines x="120" y="214" widths={[52]} color={SILVER} />
      <TextLines x="120" y="238" widths={[70]} />
      <TextLines x="120" y="262" widths={[46]} />
      <TextLines x="120" y="286" widths={[60]} />
      <line x1="116" y1="470" x2="208" y2="470" stroke={LINE_SOFT} />
      <TextLines x="120" y="486" widths={[40]} />

      {/* stats tiles */}
      {[244, 372, 500].map((x, i) => (
        <g key={x}>
          <rect x={x} y="184" width="112" height="56" rx="3" fill={PANEL} stroke={LINE} />
          <TextLines x={x + 12} y="196" widths={[40]} />
          <rect x={x + 12} y="216" width="50" height="8" rx="2" fill={SILVER} />
          {i === 1 && <rect x={x + 70} y="218" width="16" height="4" rx="2" fill={ACCENT} />}
        </g>
      ))}

      {/* data table */}
      <rect x="244" y="260" width="368" height="250" rx="3" fill={PANEL} stroke={LINE} />
      <line x1="244" y1="290" x2="612" y2="290" stroke={LINE} />
      <rect x="260" y="273" width="40" height="3" rx="1.5" fill={LINE} />
      <rect x="350" y="273" width="36" height="3" rx="1.5" fill={LINE} />
      <rect x="440" y="273" width="36" height="3" rx="1.5" fill={LINE} />
      <rect x="520" y="273" width="30" height="3" rx="1.5" fill={LINE} />
      <rect x="245" y="354" width="366" height="26" fill={RED_PANEL} />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="260" y={y - 2} width="70" height="4" rx="2" fill={SILVER} />
          <rect x="350" y={y - 2} width="60" height="4" rx="2" fill={LINE} />
          <rect x="440" y={y - 2} width="50" height="4" rx="2" fill={LINE} />
          <rect x="520" y={y - 2} width="40" height="4" rx="2" fill={LINE} />
          <circle cx="596" cy={y} r="3" fill={i === 2 ? ACCENT : LINE} className={i === 2 ? "wwb-pulse" : undefined} />
          <line x1="244" y1={y + 14} x2="612" y2={y + 14} stroke={LINE_SOFT} />
        </g>
      ))}

      {/* connection to floating record panel */}
      <path d="M602 366 L660 366 L660 470" fill="none" stroke={LINE} />
      <path d="M602 366 L660 366 L660 470" fill="none" stroke={ACCENT} opacity="0.7" className="wwb-flow" />

      {/* floating record panel */}
      <rect x="600" y="470" width="170" height="100" rx="4" fill={GREY_2} stroke={LINE} />
      <rect x="604" y="470" width="162" height="2" fill={ACCENT} />
      <Label x="616" y="492" color={SILVER}>
        RECORD
      </Label>
      <TextLines x="616" y="506" widths={[110, 80, 130]} />

      <Label x="100" y="556">APP / 02</Label>
    </svg>
  );
}

/* 03 — Mobile Applications: three floating phone screens with subtle depth. */
function MobileApplications() {
  const toggles = [240, 276, 312, 348];
  const bars = [40, 70, 55, 90, 65, 110, 80];
  return (
    <svg {...common}>
      {/* ground */}
      <line x1="120" y1="572" x2="680" y2="572" stroke={LINE_SOFT} />

      {/* left screen — settings */}
      <g opacity="0.75">
        <rect x="140" y="130" width="140" height="360" rx="18" fill={PANEL_ALT} stroke={LINE} />
        <rect x="186" y="142" width="48" height="5" rx="2.5" fill={LINE} />
        <TextLines x="156" y="166" widths={[50]} color={SILVER} />
        <TextLines x="156" y="186" widths={[90, 70]} gap={12} />
        {toggles.map((y, i) => (
          <g key={y}>
            <rect x="156" y={y - 2} width="50" height="4" rx="2" fill={LINE} />
            <rect
              x="232"
              y={y - 6}
              width="28"
              height="12"
              rx="6"
              fill={i === 2 ? RED_PANEL : LINE_SOFT}
              stroke={i === 2 ? ACCENT : LINE}
            />
            <circle cx={i === 2 ? 254 : 238} cy={y} r="4" fill={i === 2 ? ACCENT : SILVER} />
            <line x1="156" y1={y + 16} x2="264" y2={y + 16} stroke={LINE_SOFT} />
          </g>
        ))}
        <rect x="156" y="430" width="108" height="26" rx="4" fill="none" stroke={LINE} />
        <rect x="190" y="441" width="40" height="4" rx="2" fill={LINE} />
      </g>

      {/* right screen — analytics */}
      <g opacity="0.9">
        <rect x="520" y="110" width="140" height="380" rx="18" fill={PANEL} stroke={LINE} />
        <rect x="566" y="122" width="48" height="5" rx="2.5" fill={LINE} />
        <TextLines x="536" y="146" widths={[46]} color={SILVER} />
        <rect x="536" y="166" width="70" height="14" rx="2" fill={SILVER} />
        <rect x="614" y="170" width="24" height="6" rx="1" fill={ACCENT} opacity="0.85" />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={536 + i * 15}
            y={300 - h}
            width="9"
            height={h}
            rx="1"
            fill={i === 5 ? ACCENT : LINE}
            opacity={i === 5 ? 0.85 : 1}
          />
        ))}
        <line x1="536" y1="300" x2="644" y2="300" stroke={LINE} />
        <TextLines x="536" y="320" widths={[80, 60, 90]} gap={12} />
        <rect x="536" y="372" width="108" height="40" rx="4" fill={PANEL_ALT} stroke={LINE_SOFT} />
        <rect x="536" y="420" width="108" height="40" rx="4" fill={PANEL_ALT} stroke={LINE_SOFT} />
      </g>

      {/* connections between screens */}
      <line x1="280" y1="250" x2="320" y2="250" stroke={LINE} strokeDasharray="3 5" />
      <path d="M480 300 L520 300" fill="none" stroke={ACCENT} opacity="0.6" className="wwb-flow wwb-flow--slow" />

      {/* center screen — primary */}
      <rect x="320" y="70" width="160" height="460" rx="18" fill={GREY_1} stroke={SILVER} />
      <rect x="376" y="82" width="48" height="6" rx="3" fill={LINE} />
      <TextLines x="336" y="98" widths={[20]} />
      <rect x="444" y="98" width="20" height="4" rx="2" fill={LINE} />
      <rect x="336" y="118" width="90" height="10" rx="2" fill={SILVER} />
      <rect x="336" y="134" width="30" height="4" rx="2" fill={ACCENT} />

      <rect x="336" y="156" width="128" height="90" rx="6" fill={PANEL} stroke={LINE} />
      <path d="M348 230 L372 200 L396 214 L420 184 L452 196" fill="none" stroke={SILVER} strokeWidth="1.5" />
      <circle cx="420" cy="184" r="3" fill={ACCENT} className="wwb-pulse" />

      {[266, 306, 346].map((y) => (
        <g key={y}>
          <rect x="336" y={y} width="128" height="30" rx="4" fill={PANEL_ALT} stroke={LINE_SOFT} />
          <circle cx="352" cy={y + 15} r="6" fill={LINE} />
          <TextLines x="366" y={y + 9} widths={[60, 40]} gap={8} />
        </g>
      ))}

      <rect x="336" y="400" width="128" height="32" rx="4" fill={RED_PANEL} stroke={ACCENT} />
      <rect x="376" y="414" width="48" height="4" rx="2" fill={ACCENT} />

      <line x1="332" y1="486" x2="468" y2="486" stroke={LINE} />
      {[352, 384, 416, 448].map((x, i) => (
        <rect key={x} x={x - 6} y="494" width="12" height="12" rx="3" fill={i === 0 ? SILVER : LINE} />
      ))}
      <rect x="372" y="512" width="56" height="3" rx="1.5" fill={LINE} />

      {/* labels */}
      <Label x="140" y="516" color={SILVER}>
        SETTINGS
      </Label>
      <Label x="320" y="556">SCREEN / 03</Label>
      <Label x="520" y="516" color={SILVER}>
        ANALYTICS
      </Label>
    </svg>
  );
}

/* 04 — Digital Products: modular ecosystem of connected screens and blocks. */
function DigitalProducts() {
  const chart = [30, 44, 26, 56, 40];
  return (
    <svg {...common}>
      {/* orbit */}
      <rect x="270" y="190" width="260" height="220" rx="8" fill="none" stroke={LINE_SOFT} strokeDasharray="2 8" />

      {/* connectors */}
      <g fill="none" stroke={LINE}>
        <path d="M310 260 L280 260 L280 135 L250 135" />
        <path d="M490 260 L530 260 L530 120 L560 120" />
        <path d="M310 340 L280 340 L280 445 L230 445" />
        <path d="M490 340 L530 340 L530 450 L580 450" />
        <line x1="400" y1="160" x2="400" y2="230" />
        <line x1="400" y1="370" x2="400" y2="440" />
      </g>
      <g stroke={LINE_SOFT}>
        <line x1="250" y1="135" x2="360" y2="135" />
        <line x1="360" y1="465" x2="230" y2="465" />
      </g>
      <path d="M490 260 L530 260 L530 120 L560 120" fill="none" stroke={ACCENT} opacity="0.8" className="wwb-flow" />
      {[
        [280, 260],
        [530, 260],
        [280, 340],
        [530, 340],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill={SILVER} />
      ))}

      {/* product core */}
      <rect x="310" y="230" width="180" height="140" rx="4" fill={GREY_2} stroke={SILVER} />
      <line x1="314" y1="230" x2="486" y2="230" stroke={ACCENT} strokeWidth="2" />
      <Label x="330" y="252" color={SILVER}>
        PRODUCT CORE
      </Label>
      <TextLines x="330" y="264" widths={[120, 90, 100]} gap={12} />
      {[330, 372, 414].map((x, i) => (
        <g key={x}>
          <rect x={x} y="310" width="34" height="30" rx="2" fill={PANEL} stroke={LINE} />
          {i === 1 && <circle cx={x + 17} cy="325" r="3" fill={ACCENT} className="wwb-pulse" />}
        </g>
      ))}

      {/* module 01 — mini screen */}
      <rect x="90" y="80" width="160" height="110" rx="4" fill={PANEL} stroke={LINE} />
      <line x1="90" y1="100" x2="250" y2="100" stroke={LINE} />
      <circle cx="102" cy="90" r="2.5" fill={LINE} />
      <circle cx="112" cy="90" r="2.5" fill={LINE} />
      <TextLines x="104" y="114" widths={[80, 110, 60]} gap={12} />
      <rect x="104" y="160" width="50" height="14" rx="2" fill="none" stroke={LINE} />

      {/* module 02 — metrics */}
      <rect x="560" y="70" width="150" height="100" rx="4" fill={PANEL} stroke={LINE} />
      <TextLines x="576" y="84" widths={[40]} color={SILVER} />
      {chart.map((h, i) => (
        <rect key={i} x={576 + i * 22} y={150 - h} width="12" height={h} rx="1" fill={i === 3 ? ACCENT : LINE} opacity={i === 3 ? 0.85 : 1} />
      ))}
      <line x1="576" y1="150" x2="694" y2="150" stroke={LINE_SOFT} />

      {/* module 03 — stacked layers */}
      <rect x="80" y="380" width="150" height="130" rx="4" fill={PANEL_ALT} stroke={LINE} />
      <rect x="96" y="400" width="118" height="36" rx="3" fill={GREY_1} stroke={LINE} />
      <rect x="104" y="416" width="118" height="36" rx="3" fill={GREY_1} stroke={LINE} />
      <rect x="112" y="432" width="110" height="36" rx="3" fill={GREY_2} stroke={SILVER} />
      <TextLines x="96" y="486" widths={[60]} />

      {/* module 04 — companion mobile */}
      <rect x="580" y="380" width="150" height="140" rx="4" fill={PANEL} stroke={LINE} />
      <rect x="656" y="396" width="52" height="108" rx="8" fill={PANEL_ALT} stroke={LINE} />
      <rect x="666" y="412" width="32" height="6" rx="2" fill={SILVER} />
      <TextLines x="666" y="428" widths={[32, 24, 32]} gap={10} />
      <rect x="666" y="480" width="32" height="10" rx="2" fill="none" stroke={LINE} />
      <TextLines x="596" y="404" widths={[30, 30, 30]} />

      {/* modules 05 / 06 — small blocks */}
      <rect x="360" y="110" width="80" height="50" rx="4" fill={PANEL} stroke={LINE} />
      <TextLines x="374" y="126" widths={[50, 30]} gap={12} />
      <rect x="360" y="440" width="80" height="50" rx="4" fill={PANEL} stroke={LINE} />
      <TextLines x="374" y="456" widths={[50, 30]} gap={12} />

      {/* release ruler */}
      <g className="wwb-detail" stroke={LINE_SOFT}>
        <line x1="80" y1="560" x2="720" y2="560" />
        {Array.from({ length: 17 }, (_, i) => (
          <line key={i} x1={80 + i * 40} y1="556" x2={80 + i * 40} y2="564" stroke={i === 8 ? ACCENT : undefined} />
        ))}
      </g>
      <Label x="580" y="546">MODULE / 04</Label>
    </svg>
  );
}

/* 05 — AI Systems: flowing intelligence paths, nodes and red energy. */
function AiSystems() {
  const inputs: [number, number][] = [
    [110, 150],
    [110, 250],
    [110, 350],
    [110, 450],
  ];
  const hidden: [number, number][] = [
    [330, 200],
    [330, 300],
    [330, 400],
  ];
  const core: [number, number] = [540, 300];
  const outputs: [number, number][] = [
    [720, 220],
    [720, 380],
  ];
  const link = (a: [number, number], b: [number, number]) => {
    const mx = (a[0] + b[0]) / 2;
    return `M${a[0]} ${a[1]} C ${mx} ${a[1]}, ${mx} ${b[1]}, ${b[0]} ${b[1]}`;
  };
  const pairs: [[number, number], [number, number]][] = [
    [inputs[0], hidden[0]],
    [inputs[0], hidden[1]],
    [inputs[1], hidden[0]],
    [inputs[1], hidden[1]],
    [inputs[2], hidden[1]],
    [inputs[2], hidden[2]],
    [inputs[3], hidden[1]],
    [inputs[3], hidden[2]],
    [hidden[0], core],
    [hidden[1], core],
    [hidden[2], core],
    [core, outputs[0]],
    [core, outputs[1]],
  ];
  return (
    <svg {...common}>
      {/* column guides */}
      <g className="wwb-detail" stroke={LINE_SOFT} strokeDasharray="2 6">
        {[110, 330, 540, 720].map((x) => (
          <line key={x} x1={x} y1="100" x2={x} y2="500" />
        ))}
      </g>

      {/* flow paths */}
      {pairs.map(([a, b], i) => (
        <path key={i} d={link(a, b)} fill="none" stroke={LINE} strokeWidth="1.2" />
      ))}
      <path
        d={`${link(inputs[1], hidden[0])} ${link(hidden[0], core)}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.6"
        opacity="0.9"
        className="wwb-flow"
      />
      <path d={link(core, outputs[0])} fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.55" className="wwb-flow wwb-flow--slow" />

      {/* input nodes */}
      {inputs.map(([x, y]) => (
        <g key={y}>
          <rect x="64" y={y - 2} width="28" height="4" rx="2" fill={LINE} />
          <rect x={x - 6} y={y - 6} width="12" height="12" rx="2" fill={PANEL} stroke={LINE} />
        </g>
      ))}

      {/* hidden nodes */}
      {hidden.map(([x, y]) => (
        <g key={y}>
          <circle cx={x} cy={y} r="9" fill={PANEL} stroke={LINE} />
          <circle cx={x} cy={y} r="3" fill={SILVER} />
        </g>
      ))}

      {/* core */}
      <circle cx={core[0]} cy={core[1]} r="50" fill="none" stroke={ACCENT} opacity="0.12" />
      <circle cx={core[0]} cy={core[1]} r="30" fill="none" stroke={ACCENT} opacity="0.3" />
      <circle cx={core[0]} cy={core[1]} r="14" fill={RED_PANEL} stroke={ACCENT} />
      <circle cx={core[0]} cy={core[1]} r="4" fill={ACCENT} className="wwb-pulse" />

      {/* output nodes */}
      {outputs.map(([x, y]) => (
        <g key={y}>
          <rect x={x - 7} y={y - 7} width="14" height="14" rx="2" fill={PANEL} stroke={SILVER} />
          <rect x={x + 16} y={y - 2} width="24" height="4" rx="2" fill={LINE} />
        </g>
      ))}

      {/* labels */}
      <Label x="80" y="118" color={SILVER}>
        SIGNAL IN
      </Label>
      <Label x="512" y="238">CORE / 05</Label>
      <Label x="690" y="190" color={SILVER}>
        OUTPUT
      </Label>

      {/* ruler + progress */}
      <g className="wwb-detail">
        <g stroke={LINE_SOFT}>
          <line x1="60" y1="540" x2="740" y2="540" />
          {Array.from({ length: 21 }, (_, i) => (
            <line key={i} x1={60 + i * 34} y1="536" x2={60 + i * 34} y2="544" />
          ))}
        </g>
        <rect x="110" y="556" width="200" height="4" rx="2" fill={LINE_SOFT} />
        <rect x="110" y="556" width="120" height="4" rx="2" fill={ACCENT} opacity="0.8" />
      </g>
      <Label x="330" y="562" color={SILVER}>
        PROCESS / 05
      </Label>
    </svg>
  );
}

/* 06 — Business Systems: dashboard fragments wired into a system map. */
function BusinessSystems() {
  const bars = [40, 64, 52, 88, 70, 104, 84, 118];
  const modules = [90, 190, 290];
  return (
    <svg {...common}>
      {/* dashboard */}
      <rect x="70" y="70" width="380" height="280" rx="4" fill={PANEL} stroke={LINE} />
      <rect x="70" y="70" width="380" height="30" rx="4" fill={GREY_1} />
      <rect x="70" y="86" width="380" height="14" fill={GREY_1} />
      <line x1="70" y1="100" x2="450" y2="100" stroke={LINE} />
      <TextLines x="86" y="83" widths={[60]} color={SILVER} />
      <circle cx="420" cy="85" r="3" fill={LINE} />
      <circle cx="434" cy="85" r="3" fill={LINE} />

      {[86, 206, 326].map((x, i) => (
        <g key={x}>
          <rect x={x} y="114" width="108" height="54" rx="3" fill={PANEL_ALT} stroke={LINE_SOFT} />
          <TextLines x={x + 10} y="124" widths={[36]} />
          <rect x={x + 10} y="144" width="44" height="8" rx="2" fill={SILVER} />
          {i === 2 && <rect x={x + 64} y="146" width="20" height="4" rx="2" fill={ACCENT} />}
        </g>
      ))}

      <rect x="86" y="182" width="228" height="150" rx="3" fill={PANEL_ALT} stroke={LINE_SOFT} />
      {bars.map((h, i) => (
        <rect key={i} x={100 + i * 27} y={318 - h} width="14" height={h} rx="1" fill={i === 7 ? ACCENT : LINE} opacity={i === 7 ? 0.85 : 1} />
      ))}
      <line x1="96" y1="318" x2="304" y2="318" stroke={LINE} />

      <rect x="326" y="182" width="108" height="150" rx="3" fill={PANEL_ALT} stroke={LINE_SOFT} />
      <TextLines x="338" y="198" widths={[70, 50, 80, 60, 72]} gap={22} />
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={i} cx="424" cy={200 + i * 22} r="2.5" fill={LINE} />
      ))}

      {/* bus + connectors to system map */}
      <line x1="485" y1="120" x2="485" y2="320" stroke={LINE_SOFT} />
      {[120, 220, 320].map((y, i) => (
        <g key={y}>
          <line x1="450" y1={y} x2="520" y2={y} stroke={LINE} />
          <circle cx="485" cy={y} r="3" fill={i === 1 ? ACCENT : SILVER} className={i === 1 ? "wwb-pulse" : undefined} />
        </g>
      ))}
      <path d="M450 220 L520 220" fill="none" stroke={ACCENT} opacity="0.7" className="wwb-flow" />

      {/* modules */}
      <Label x="520" y="78" color={SILVER}>
        SYSTEM MAP
      </Label>
      {modules.map((y, i) => (
        <g key={y}>
          <rect x="520" y={y} width="140" height="60" rx="4" fill={PANEL} stroke={LINE} />
          {i === 2 && <rect x="520" y={y + 4} width="2" height="52" fill={ACCENT} />}
          <TextLines x="534" y={y + 16} widths={i === 0 ? [70, 100] : i === 1 ? [90, 60] : [80, 50]} color={i === 2 ? SILVER : LINE} />
          <line x1="660" y1={y + 30} x2="675" y2={y + 30} stroke={LINE_SOFT} />
        </g>
      ))}

      {/* rail + data store */}
      <line x1="675" y1="120" x2="675" y2="320" stroke={LINE_SOFT} />
      <line x1="675" y1="220" x2="690" y2="220" stroke={LINE_SOFT} />
      <rect x="690" y="170" width="50" height="100" rx="6" fill={PANEL_ALT} stroke={LINE} />
      <line x1="690" y1="200" x2="740" y2="200" stroke={LINE} />
      <line x1="690" y1="240" x2="740" y2="240" stroke={LINE} />

      {/* ops log strip */}
      <g stroke={LINE_SOFT}>
        <line x1="260" y1="350" x2="260" y2="390" />
        <line x1="590" y1="350" x2="590" y2="390" />
      </g>
      <rect x="70" y="390" width="670" height="130" rx="4" fill={PANEL_ALT} stroke={LINE} />
      <line x1="90" y1="430" x2="720" y2="430" stroke={LINE} />
      <g className="wwb-detail" stroke={LINE_SOFT}>
        {Array.from({ length: 15 }, (_, i) => (
          <line key={i} x1={90 + i * 45} y1="426" x2={90 + i * 45} y2="434" />
        ))}
      </g>
      {[180, 300, 420, 540, 660].map((x) => (
        <circle key={x} cx={x} cy="430" r="4" fill={x === 420 ? ACCENT : PANEL} stroke={x === 420 ? "none" : SILVER} />
      ))}
      <TextLines x="90" y="458" widths={[80, 60, 100]} />
      <TextLines x="560" y="458" widths={[120, 90, 60]} />

      <Label x="70" y="546">OPS LOG / 06</Label>
    </svg>
  );
}

export default function BuildVisual({ id }: { id: BuildId }) {
  switch (id) {
    case "websites":
      return <Websites />;
    case "webapps":
      return <WebApplications />;
    case "mobile":
      return <MobileApplications />;
    case "products":
      return <DigitalProducts />;
    case "ai":
      return <AiSystems />;
    case "systems":
      return <BusinessSystems />;
  }
}
