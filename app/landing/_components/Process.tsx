import { motion } from "motion/react";
import { CORAL, CREAM, CYAN, INK } from "../lib/colors";
import { SectionHeader } from "./Modes";

function StepPick() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden>
      <circle cx="32" cy="32" r="22" fill="none" stroke={`${CREAM}40`} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="14" fill="none" stroke={`${CREAM}40`} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="6" fill={CYAN} />
      <line x1="32" y1="6" x2="32" y2="58" stroke={`${CREAM}30`} strokeWidth="1" />
      <line x1="6" y1="32" x2="58" y2="32" stroke={`${CREAM}30`} strokeWidth="1" />
      <circle cx="32" cy="32" r="3" fill={CORAL}>
        <animate attributeName="cx" values="32;46;32;18;32" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="32;32;46;32;32" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function StepType() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden>
      <rect x="8" y="22" width="48" height="22" rx="3" fill="none" stroke={`${CREAM}40`} strokeWidth="1.4" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={12 + i * 9}
          y={26}
          width="6"
          height="6"
          fill={CYAN}
          opacity="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1.6s"
            begin={`${i * 0.18}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      <rect x="20" y="36" width="24" height="4" fill={CREAM} opacity="0.7" />
    </svg>
  );
}

function StepRead() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden>
      <line x1="10" y1="50" x2="54" y2="50" stroke={`${CREAM}40`} strokeWidth="1.4" />
      {[16, 28, 12, 36, 44, 30].map((h, i) => (
        <rect
          key={i}
          x={12 + i * 7}
          y={50 - h}
          width="5"
          height={h}
          fill={i === 4 ? CORAL : CYAN}
          opacity={i === 4 ? 1 : 0.7}
          style={{
            transformOrigin: `${14.5 + i * 7}px 50px`,
            animation: `kz-bar2 1s ease ${i * 0.1}s both`,
          }}
        />
      ))}
      <style>{`@keyframes kz-bar2 { from { transform: scaleY(0); } to { transform: scaleY(1); } }`}</style>
    </svg>
  );
}

function StepReturn() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden>
      <path
        d="M50 20 A 18 18 0 1 1 32 14"
        fill="none"
        stroke={CYAN}
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 90,
          strokeDashoffset: 90,
          animation: "kz-return 2s ease infinite",
        }}
      />
      <path d="M28 8 L34 14 L28 20" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="3" fill={CORAL}>
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <style>{`@keyframes kz-return { 0%{stroke-dashoffset:90} 60%{stroke-dashoffset:0} 100%{stroke-dashoffset:0} }`}</style>
    </svg>
  );
}

const steps = [
  { n: "01", title: "Pick", line: "A timed run, a code drill, or a long quote — your choice, your weather.", art: <StepPick /> },
  { n: "02", title: "Type", line: "No popups, no prompts. Just text and the small sound of contact.", art: <StepType /> },
  { n: "03", title: "Read", line: "Granular stats — net WPM, raw WPM, accuracy curve, and error map.", art: <StepRead /> },
  { n: "04", title: "Return", line: "Tomorrow you do it again. The graph remembers; you don't have to.", art: <StepReturn /> },
];

export function Process() {
  return (
    <section id="process" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
      <SectionHeader
        kicker="§05 · the loop"
        title="A four-step ritual."
        sub="A simple cycle is what makes practice stick. Show up, type, read the numbers, come back tomorrow."
      />

      <div
        className="grid grid-cols-1 gap-px border md:grid-cols-2 lg:grid-cols-4"
        style={{ background: `${CREAM}10`, borderColor: `${CREAM}10` }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex min-h-[280px] flex-col p-7"
            style={{ background: INK }}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.3em]"
                style={{ color: CYAN }}
              >
                /{s.n}
              </span>
              <div className="h-16 w-16">{s.art}</div>
            </div>
            <h3
              className="mt-auto text-[30px] font-bold leading-tight tracking-[-0.01em]"
              style={{ color: CREAM }}
            >
              {s.title}
            </h3>
            <p
              className="mt-2 max-w-[28ch] text-[14px] leading-[1.65]"
              style={{ color: `${CREAM}99` }}
            >
              {s.line}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
