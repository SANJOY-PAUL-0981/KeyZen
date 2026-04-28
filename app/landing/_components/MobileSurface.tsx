"use client";

import { useEffect, useRef, useState } from "react";
import { SOUND_PACKS } from "@/lib/settings-data";
import { CREAM, CYAN, CORAL } from "../lib/colors";
import { SectionHeader } from "./Modes";

const SWITCH_META: Record<string, { stem: string; feel: string }> = {
  "default":             { stem: CYAN,       feel: "clean · neutral" },
  "cherrymx-black-pbt":  { stem: "#2b2b2b",  feel: "linear · heavy" },
  "cherrymx-blue-pbt":   { stem: "#2f6fe0",  feel: "clicky · sharp" },
  "cherrymx-brown-pbt":  { stem: "#8a5a2b",  feel: "tactile · soft" },
  "cherrymx-red-pbt":    { stem: "#d7373f",  feel: "linear · light" },
  "mx-speed-silver":     { stem: "#c4ccd4",  feel: "linear · fast" },
  "eg-oreo":             { stem: "#1a1a2e",  feel: "tactile · creamy" },
  "topre-purple":        { stem: "#8b5cf6",  feel: "tactile · domed" },
  "creams":              { stem: "#f0d9c6",  feel: "linear · poppy" },
  "banana-split-lubed":  { stem: "#ffe135",  feel: "tactile · thocky" },
};

type Sprite = { sound: string; defines: Record<string, [number, number] | null> };

export function MobileSurface() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimer = useRef<number | null>(null);
  const spriteCache = useRef<Map<string, Sprite>>(new Map());

  useEffect(() => () => {
    if (stopTimer.current) window.clearTimeout(stopTimer.current);
    audioRef.current?.pause();
  }, []);

  async function play(packId: string) {
    const pack = SOUND_PACKS.find(p => p.id === packId);
    if (!pack) return;

    setPressedId(packId);
    setActiveId(packId);
    window.setTimeout(() => setPressedId(null), 140);

    if (audioRef.current) audioRef.current.pause();
    if (stopTimer.current) window.clearTimeout(stopTimer.current);

    let startMs = 0;
    let durMs = 220;

    if (pack.configUrl) {
      try {
        let sprite = spriteCache.current.get(pack.configUrl);
        if (!sprite) {
          const res = await fetch(pack.configUrl);
          sprite = (await res.json()) as Sprite;
          spriteCache.current.set(pack.configUrl, sprite);
        }
        const entries = Object.values(sprite.defines).filter(Boolean) as [number, number][];
        if (entries.length) {
          const pick = entries[Math.floor(Math.random() * entries.length)];
          startMs = pick[0];
          durMs = pick[1];
        }
      } catch {
        // fall through to defaults
      }
    }

    const audio = new Audio(pack.url);
    audio.preload = "auto";
    audioRef.current = audio;
    audio.currentTime = startMs / 1000;
    audio.play().catch(() => {});
    stopTimer.current = window.setTimeout(() => {
      audio.pause();
      setActiveId((cur) => (cur === packId ? null : cur));
    }, durMs + 60);
  }

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:hidden">
      <SectionHeader
        kicker="§01 · the surface"
        title={
          <>
            Pick a feel.{" "}
            <span style={{ color: `${CREAM}55` }}>Hear before you type.</span>
          </>
        }
        sub="Ten switches, ten personalities. Tap one to sample its voice."
      />

      <div
        className="relative border"
        style={{ borderColor: `${CREAM}14`, background: "#0d1016" }}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          style={{ borderColor: `${CREAM}10` }}
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: CYAN }}
          >
            ▮ switch lab
          </div>
          <NowPlaying active={!!activeId} />
        </div>

        <ul className="divide-y" style={{ borderColor: `${CREAM}08` }}>
          {SOUND_PACKS.map((pack, i) => {
            const meta = SWITCH_META[pack.id] ?? { stem: CYAN, feel: "—" };
            const isPressed = pressedId === pack.id;
            const isActive = activeId === pack.id;
            return (
              <li
                key={pack.id}
                style={{ borderColor: `${CREAM}0d` }}
                className="border-t first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => play(pack.id)}
                  className="group flex w-full items-center gap-3 px-3 py-3 text-left transition-[transform,background] active:bg-white/[0.03]"
                  style={{
                    transform: isPressed ? "translateY(1px)" : "translateY(0)",
                  }}
                >
                  <span
                    className="w-6 shrink-0 self-stretch pt-1 text-left font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{ color: isActive ? CYAN : `${CREAM}40` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <SwitchStem color={meta.stem} active={isActive} />

                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate text-[15px] font-semibold leading-tight tracking-[-0.01em]"
                      style={{ color: CREAM }}
                    >
                      {pack.label}
                    </div>
                    <div
                      className="mt-1 truncate font-mono text-[10px] tracking-[0.16em]"
                      style={{ color: `${CREAM}70` }}
                    >
                      {meta.feel}
                    </div>
                  </div>

                  <PlayPulse active={isActive} />
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="border-t px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${CREAM}10`, color: `${CREAM}55` }}
        >
          tap a row · sample the stem
        </div>
      </div>
    </section>
  );
}

function SwitchStem({ color, active }: { color: string; active: boolean }) {
  return (
    <div
      className="relative grid h-10 w-10 shrink-0 place-items-center border"
      style={{
        borderColor: `${CREAM}14`,
        background: "#0a0c10",
      }}
    >
      <svg viewBox="0 0 48 48" width={28} height={28} aria-hidden>
        <rect x="6" y="6" width="36" height="36" rx="2" fill="#0d1016" />
        <rect x="8" y="8" width="32" height="32" rx="1.5" fill={`${CREAM}06`} />
        <g transform="translate(24 24)">
          <rect x="-9" y="-2.75" width="18" height="5.5" rx="1" fill={color} />
          <rect x="-2.75" y="-9" width="5.5" height="18" rx="1" fill={color} />
        </g>
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: active ? `inset 0 0 0 1px ${CYAN}` : "none",
          transition: "box-shadow 200ms ease",
        }}
      />
    </div>
  );
}

function PlayPulse({ active }: { active: boolean }) {
  return (
    <div className="relative grid h-9 w-9 shrink-0 place-items-center">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: active ? CYAN : `${CREAM}1f`,
          transition: "border-color 200ms ease",
        }}
      />
      {active && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${CYAN}`,
            animation: "mobileSurfacePulse 700ms ease-out 1",
          }}
        />
      )}
      <svg viewBox="0 0 16 16" width={11} height={11} aria-hidden>
        <path d="M4 2.5 13 8 4 13.5z" fill={active ? CYAN : `${CREAM}80`} />
      </svg>
      <style jsx>{`
        @keyframes mobileSurfacePulse {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function NowPlaying({ active }: { active: boolean }) {
  const bars = 5;
  return (
    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: active ? CORAL : `${CREAM}40` }}>
      <span>{active ? "live" : "idle"}</span>
      <svg viewBox="0 0 30 14" width={30} height={14} aria-hidden>
        {Array.from({ length: bars }).map((_, i) => (
          <rect
            key={i}
            x={i * 6}
            y={5}
            width={3}
            height={4}
            fill={active ? CORAL : `${CREAM}30`}
          >
            {active && (
              <animate
                attributeName="height"
                values="3;11;5;9;3"
                dur={`${0.55 + i * 0.07}s`}
                repeatCount="indefinite"
                begin={`${i * 0.05}s`}
              />
            )}
            {active && (
              <animate
                attributeName="y"
                values="6;1;4;2;6"
                dur={`${0.55 + i * 0.07}s`}
                repeatCount="indefinite"
                begin={`${i * 0.05}s`}
              />
            )}
          </rect>
        ))}
      </svg>
    </div>
  );
}
