"use client";

import { motion } from "motion/react";
import { CORAL, CREAM, CYAN, INK } from "../lib/colors";
import { SectionHeader } from "./Modes";

function BigStat({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex min-h-[220px] flex-col overflow-hidden p-5 sm:p-6 ${className}`}
      style={{ background: INK }}
    >
      {children}
    </motion.div>
  );
}

function StatLabel({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div
          className="font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color: CYAN }}
        >
          {eyebrow}
        </div>
        <h3
          className="mt-2 text-[22px] font-bold leading-none tracking-[-0.01em]"
          style={{ color: CREAM }}
        >
          {title}
        </h3>
      </div>
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
          className="text-[40px] font-bold leading-none tracking-[-0.01em] sm:text-[46px]"
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
  const cx = 120;
  const cy = 130;
  const r = 90;
  const startAngle = -180;
  const endAngle = -44;
  const toPoint = (angle: number, radius = r) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };
  const arcPath = (from: number, to: number) => {
    const start = toPoint(from);
    const end = toPoint(to);
    const largeArc = Math.abs(to - from) > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };
  const needle = toPoint(endAngle, 78);

  return (
    <svg viewBox="0 0 240 160" className="mx-auto w-full max-w-[300px]" aria-hidden>
      <path
        d={arcPath(startAngle, 0)}
        fill="none"
        stroke={`${CREAM}1c`}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={arcPath(startAngle, endAngle)}
        fill="none"
        stroke={CYAN}
        strokeWidth="14"
        strokeLinecap="round"
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
            key={`tick-${i}`}
            x1={cx + r1 * Math.cos(rad)}
            y1={cy + r1 * Math.sin(rad)}
            x2={cx + r2 * Math.cos(rad)}
            y2={cy + r2 * Math.sin(rad)}
            stroke={`${CREAM}40`}
            strokeWidth="1.2"
          />
        );
      })}
      <line
        x1={cx}
        y1={cy}
        x2={needle.x}
        y2={needle.y}
        stroke={CREAM}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="6" fill={CYAN} />
    </svg>
  );
}

function AccuracyDonut({ className = "" }: { className?: string }) {
  const c = 2 * Math.PI * 56;
  return (
    <svg viewBox="0 0 160 160" width="100%" className={className} aria-hidden>
      <circle cx="80" cy="80" r="56" fill="none" stroke={`${CREAM}1c`} strokeWidth="12" />
      <circle
        cx="80"
        cy="80"
        r="56"
        fill="none"
        stroke={CYAN}
        strokeWidth="12"
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
        style={{
          strokeDasharray: c,
          strokeDashoffset: c,
          animation: "kz-acc 0.9s cubic-bezier(.2,.8,.2,1) forwards",
        }}
      />
      <text
        x="80"
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

function AccuracyBreakdown() {
  const modes: Array<[string, number]> = [
    ["words · 60s", 98],
    ["time · 30s", 96],
    ["code · ts", 95],
    ["quotes", 99],
  ];
  return (
    <div className="space-y-1.5">
      {modes.map(([label, value]) => (
        <div key={label} className="flex items-center gap-3">
          <span
            className="w-[88px] shrink-0 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: `${CREAM}80` }}
          >
            {label}
          </span>
          <div
            className="relative h-[6px] flex-1 overflow-hidden rounded-full"
            style={{ background: `${CREAM}12` }}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: CYAN,
                width: `${value}%`,
                animation: "kz-bar 0.8s cubic-bezier(.2,.8,.2,1) forwards",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </div>
          <span
            className="w-[32px] shrink-0 text-right font-mono text-[11px] tabular-nums"
            style={{ color: CREAM }}
          >
            {value}%
          </span>
        </div>
      ))}
      <style>{`@keyframes kz-bar { to { transform: scaleX(1); } }`}</style>
    </div>
  );
}

function AccuracyCard() {
  return (
    <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-stretch sm:gap-8">
      <div className="flex min-w-0 flex-col">
        <StatLabel eyebrow="accuracy" title="Clean contact" />
        <div className="mt-4">
          <AccuracyBreakdown />
        </div>
        <div className="mt-auto pt-4">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.24em]"
            style={{ color: `${CREAM}60` }}
          >
            across all modes
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className="text-[40px] font-bold leading-none tracking-[-0.01em] sm:text-[46px]"
              style={{ color: CREAM }}
            >
              97%
            </span>
            <span
              className="font-mono text-[11px]"
              style={{ color: CYAN }}
            >
              ↑ 4 pts vs last week
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[150px] sm:w-[180px]">
          <AccuracyDonut />
        </div>
      </div>
    </div>
  );
}

function ConsistencyChart() {
  const data = [40, 52, 48, 60, 58, 70, 66, 78, 76, 82, 80, 88, 86, 94];
  return (
    <div className="w-full min-w-0">
    <svg viewBox="0 0 240 160" width="100%" aria-hidden>
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
          animation: "kz-line 0.9s ease forwards",
        }}
      />
      {data.map((v, i) => (
        <circle
          key={`consistency-${v}`}
          cx={10 + (i * 220) / (data.length - 1)}
          cy={130 - v}
          r={i === data.length - 1 ? 4 : 2.4}
          fill={i === data.length - 1 ? CORAL : CYAN}
          style={{
            opacity: 0,
            animation: `kz-dot 0.3s ease ${0.05 * i + 0.6}s forwards`,
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
    </div>
  );
}

function ErrorDecayChart() {
  const bars = [88, 62, 48, 34, 26, 18];

  return (
    <div className="w-full min-w-0">
    <svg viewBox="0 0 240 160" width="100%" aria-hidden>
      {[34, 68, 102, 136].map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="128" stroke={`${CREAM}10`} strokeWidth="1" />
      ))}
      <path
        d="M35 126C65 94 90 78 113 70C139 61 160 48 205 26"
        fill="none"
        stroke={`${CREAM}1f`}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M35 126C65 94 90 78 113 70C139 61 160 48 205 26"
        fill="none"
        stroke={CYAN}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 360,
          strokeDashoffset: 360,
          animation: "kz-decay-line 0.9s ease forwards",
        }}
      />
      {bars.map((height, i) => (
        <rect
          key={`error-${height}`}
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
    </div>
  );
}

function SpeedSplit() {
  return (
    <div className="grid grid-cols-2 gap-px border" style={{ borderColor: `${CREAM}10`, background: `${CREAM}10` }}>
      {[
        ["raw", "126", "burst ceiling"],
        ["net", "112", "clean speed"],
      ].map(([label, value, note]) => (
        <div key={label} className="p-4" style={{ background: "#0d1016" }}>
          <div
            className="font-mono text-[9px] uppercase tracking-[0.24em]"
            style={{ color: `${CREAM}60` }}
          >
            {label}
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[34px] font-bold leading-none" style={{ color: CREAM }}>
              {value}
            </span>
            <span className="font-mono text-[10px]" style={{ color: CYAN }}>
              WPM
            </span>
          </div>
          <div className="mt-2 text-[12px]" style={{ color: `${CREAM}80` }}>
            {note}
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsShowcase() {
  return (
    <section id="stats" className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="§04 · honest numbers"
        title="Stats that don't lie about you."
        sub="KeyZen tracks raw speed, net WPM, accuracy, error decay, and consistency — the signals that actually predict whether you'll be faster next month."
      />

      <div
        className="grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:auto-rows-[280px]"
        style={{ background: `${CREAM}10`, borderColor: `${CREAM}10` }}
      >
        <BigStat index={0} className="justify-center gap-5 lg:col-span-1 lg:row-span-2 lg:p-8">
          <StatLabel eyebrow="speed split" title="Raw vs net" />
          <WPMGauge />
          <SpeedSplit />
        </BigStat>
        <BigStat index={1} className="lg:col-span-2">
          <AccuracyCard />
        </BigStat>
        <BigStat index={2} className="lg:col-span-1">
          <StatLabel eyebrow="consistency" title="Less wobble" />
          <ConsistencyChart />
          <StatFooter kpi="A+" unit="" note="streak · 28 days" />
        </BigStat>
        <BigStat index={3} className="lg:col-span-1">
          <StatLabel eyebrow="errors" title="Decay" />
          <ErrorDecayChart />
          <StatFooter kpi="-41%" unit="" note="this week" />
        </BigStat>
      </div>
    </section>
  );
}
