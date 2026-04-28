"use client";

import { useEffect, useState } from "react";
import { GithubLogo } from "@phosphor-icons/react";
import { CORAL, CREAM, CYAN, INK } from "../lib/colors";
import Link from "next/link";

function CornerCross({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: { top: -7, left: -7 },
    tr: { top: -7, right: -7 },
    bl: { bottom: -7, left: -7 },
    br: { bottom: -7, right: -7 },
  } as const;
  return (
    <div className="absolute z-20" style={map[pos]}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <line x1="7" y1="0" x2="7" y2="14" stroke={CYAN} strokeWidth="1.4" />
        <line x1="0" y1="7" x2="14" y2="7" stroke={CYAN} strokeWidth="1.4" />
      </svg>
    </div>
  );
}

function PixelHeart() {
  const pixels = [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ];
  return (
    <svg viewBox="0 0 70 60" width="160" height="140" aria-hidden>
      {pixels.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x * 10}
              y={y * 10}
              width="9"
              height="9"
              fill={CYAN}
              style={{
                opacity: 0,
                animation: `kz-heart 0.25s ease ${(x + y) * 0.06}s forwards`,
              }}
            />
          ) : null
        )
      )}
      <style>{`@keyframes kz-heart { to { opacity: 1; } }`}</style>
    </svg>
  );
}

function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/shivabhattacharjee/KeyZen")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  return (
    <a
      href="https://github.com/shivabhattacharjee/KeyZen"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-white/5"
      style={{ borderColor: `${CYAN}55`, color: CREAM }}
    >
      <GithubLogo size={14} weight="fill" />
      <span className="font-(family-name:--font-doto)">star on github</span>
      <span
        className="px-1.5 py-0.5"
        style={{
          background: `${CYAN}20`,
          color: CYAN,
          fontFamily: "var(--font-mono)",
        }}
      >
        {stars !== null ? `★ ${stars.toLocaleString()}` : "★ —"}
      </span>
    </a>
  );
}

export function FinalCTA() {
  return (
    <section id="open" className="relative z-10 mx-auto max-w-5xl px-6 py-28">
      <div
        className="relative overflow-hidden border p-10 text-center sm:p-16"
        style={{ borderColor: `${CREAM}1a`, background: "#0d1016" }}
      >
        <CornerCross pos="tl" />
        <CornerCross pos="tr" />
        <CornerCross pos="bl" />
        <CornerCross pos="br" />

        <div
          className="absolute inset-0 -z-0 opacity-30"
          style={{
            background:
              `radial-gradient(circle at 80% 20%, ${CYAN}40 0%, transparent 50%), radial-gradient(circle at 10% 90%, ${CORAL}30 0%, transparent 55%)`,
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: CYAN }}
          >
            §end · begin
          </div>
          <h2
            className="mt-4 text-[clamp(36px,6vw,72px)] font-bold leading-[1.02] tracking-[-0.02em]"
            style={{ color: CREAM }}
          >
            Put your fingers
            <br />
            <span style={{ color: CYAN }}>where your eyes are.</span>
          </h2>
          <p
            className="mt-5 max-w-xl text-[15px] leading-[1.7]"
            style={{ color: `${CREAM}b0` }}
          >
            No login, no card. Open the test, take a breath, and start typing.
            The first run takes 30 seconds. The thousandth one earns you a
            quietly faster brain.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.24em]"
              style={{ background: CYAN, color: INK }}
            >
              launch keyzen
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M2 7 H12 M8 3 L12 7 L8 11"
                  fill="none"
                  stroke={INK}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-12">
            <PixelHeart />
          </div>
        </div>
      </div>
    </section>
  );
}
