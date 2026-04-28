import { CORAL, CREAM, CYAN, INK } from "../lib/colors";
import { SectionHeader } from "./Modes";

function BigStat({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-8" style={{ background: INK }}>
      {children}
    </div>
  );
}

function StatFooter({
  kpi,
  unit,
  note,
}: {
  kpi: string;
  unit: string;
  note: string;
}) {
  return (
    <div className="mt-auto pt-6">
      <div
        className="font-mono text-[10px] uppercase tracking-[0.24em]"
        style={{ color: `${CREAM}60` }}
      >
        {note}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          className="text-[56px] font-bold leading-none tracking-[-0.02em]"
          style={{ color: CREAM }}
        >
          {kpi}
        </span>
        {unit && (
          <span
            className="text-[16px]"
            style={{ fontFamily: "var(--font-mono)", color: CYAN }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function WPMGauge() {
  return (
    <svg viewBox="0 0 240 160" className="w-full" aria-hidden>
      <path
        d="M30 130 A 90 90 0 0 1 210 130"
        fill="none"
        stroke={`${CREAM}1c`}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M30 130 A 90 90 0 0 1 210 130"
        fill="none"
        stroke={CYAN}
        strokeWidth="14"
        strokeLinecap="round"
        style={{
          strokeDasharray: 283,
          strokeDashoffset: 283,
          animation: "kz-arc 2s cubic-bezier(.2,.8,.2,1) forwards",
        }}
      />
      {Array.from({ length: 11 }).map((_, i) => {
        const a = -180 + (i * 180) / 10;
        const r1 = 76;
        const r2 = 84;
        const cx = 120;
        const cy = 130;
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(rad)}
            y1={cy + r1 * Math.sin(rad)}
            x2={cx + r2 * Math.cos(rad)}
            y2={cy + r2 * Math.sin(rad)}
            stroke={`${CREAM}40`}
            strokeWidth="1.2"
          />
        );
      })}
      <g transform="translate(120 130)">
        <line x1="0" y1="0" x2="0" y2="-78" stroke={CREAM} strokeWidth="2" strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="-90"
            to="40"
            dur="1.6s"
            begin="0.3s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.2 0.8 0.2 1"
          />
        </line>
        <circle r="6" fill={CYAN} />
      </g>
      <style>{`@keyframes kz-arc { to { stroke-dashoffset: 56; } }`}</style>
    </svg>
  );
}

function AccuracyDonut() {
  const c = 2 * Math.PI * 56;
  return (
    <svg viewBox="0 0 200 160" className="w-full" aria-hidden>
      <circle cx="100" cy="80" r="56" fill="none" stroke={`${CREAM}1c`} strokeWidth="12" />
      <circle
        cx="100"
        cy="80"
        r="56"
        fill="none"
        stroke={CYAN}
        strokeWidth="12"
        strokeLinecap="round"
        transform="rotate(-90 100 80)"
        style={{
          strokeDasharray: c,
          strokeDashoffset: c,
          animation: "kz-acc 2s cubic-bezier(.2,.8,.2,1) forwards",
        }}
      />
      <text
        x="100"
        y="90"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="700"
        fontSize="32"
        fill={CREAM}
      >
        97%
      </text>
      <style>{`@keyframes kz-acc { to { stroke-dashoffset: ${c * 0.03 + 12}; } }`}</style>
    </svg>
  );
}

function ConsistencyChart() {
  const data = [40, 52, 48, 60, 58, 70, 66, 78, 76, 82, 80, 88, 86, 94];
  return (
    <svg viewBox="0 0 240 160" className="w-full" aria-hidden>
      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="10" y1={y} x2="230" y2={y} stroke={`${CREAM}10`} strokeWidth="1" />
      ))}
      <path
        d={
          "M10 130 " +
          data
            .map((v, i) => `L${10 + (i * 220) / (data.length - 1)} ${130 - v}`)
            .join(" ") +
          ` L230 130 Z`
        }
        fill={`${CYAN}22`}
      />
      <path
        d={
          "M10 " +
          (130 - data[0]) +
          " " +
          data
            .slice(1)
            .map((v, i) => `L${10 + ((i + 1) * 220) / (data.length - 1)} ${130 - v}`)
            .join(" ")
        }
        fill="none"
        stroke={CYAN}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 800,
          strokeDashoffset: 800,
          animation: "kz-line 1.8s ease forwards",
        }}
      />
      {data.map((v, i) => (
        <circle
          key={i}
          cx={10 + (i * 220) / (data.length - 1)}
          cy={130 - v}
          r={i === data.length - 1 ? 4 : 2.4}
          fill={i === data.length - 1 ? CORAL : CYAN}
          style={{
            opacity: 0,
            animation: `kz-dot 0.4s ease ${0.1 * i + 1.4}s forwards`,
          }}
        />
      ))}
      <text
        x="120"
        y="152"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="2"
        fill={`${CREAM}90`}
      >
        CONSISTENCY · 14D
      </text>
      <style>
        {`@keyframes kz-line { to { stroke-dashoffset: 0; } }
          @keyframes kz-dot { to { opacity: 1; } }`}
      </style>
    </svg>
  );
}

function ErrorDecayChart() {
  const bars = [88, 62, 48, 34, 26, 18];

  return (
    <svg viewBox="0 0 240 160" className="w-full" aria-hidden>
      {[34, 68, 102, 136].map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="128" stroke={`${CREAM}10`} strokeWidth="1" />
      ))}
      <path
        d="M24 126C58 94 86 78 112 70C142 61 166 48 216 26"
        fill="none"
        stroke={`${CREAM}1f`}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M24 126C58 94 86 78 112 70C142 61 166 48 216 26"
        fill="none"
        stroke={CYAN}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 360,
          strokeDashoffset: 360,
          animation: "kz-decay-line 1.7s ease forwards",
        }}
      />
      {bars.map((height, i) => (
        <rect
          key={i}
          x={28 + i * 34}
          y={128 - height}
          width="14"
          height={height}
          rx="2"
          fill={i === 0 ? `${CORAL}cc` : `${CYAN}${i > 3 ? "cc" : "99"}`}
          style={{
            transformOrigin: "bottom",
            animation: `kz-decay-bar 0.5s ease ${i * 0.08}s both`,
          }}
        />
      ))}
      <text
        x="120"
        y="152"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="2"
        fill={`${CREAM}90`}
      >
        ERRORS · LAST RUNS
      </text>
      <style>
        {`@keyframes kz-decay-line { to { stroke-dashoffset: 0; } }
          @keyframes kz-decay-bar { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }`}
      </style>
    </svg>
  );
}

export function StatsShowcase() {
  return (
    <section id="stats" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
      <SectionHeader
        kicker="§04 · honest numbers"
        title="Stats that don't lie about you."
        sub="KeyZen tracks raw speed, net WPM, accuracy, error decay, and consistency — the four numbers that actually predict whether you'll be faster next month."
      />

      <div
        className="grid grid-cols-1 gap-px border sm:grid-cols-2"
        style={{ background: `${CREAM}10`, borderColor: `${CREAM}10` }}
      >
        <BigStat>
          <WPMGauge />
          <StatFooter kpi="112" unit="WPM" note="rolling 7-day average" />
        </BigStat>
        <BigStat>
          <AccuracyDonut />
          <StatFooter kpi="97%" unit="" note="accuracy across all modes" />
        </BigStat>
        <BigStat>
          <ConsistencyChart />
          <StatFooter kpi="A+" unit="" note="streak · 28 days" />
        </BigStat>
        <BigStat>
          <ErrorDecayChart />
          <StatFooter kpi="-41%" unit="" note="error decay this week" />
        </BigStat>
      </div>
    </section>
  );
}
