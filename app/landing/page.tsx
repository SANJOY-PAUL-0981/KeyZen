"use client"

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { CornerBrackets } from "@/components/corner-brackets"
import { CREAM, CYAN, INK } from "./lib/colors"
import BackgroundGrid from "./_components/BackgroundGrid"
import { Modes } from "./_components/Modes"
import { StatsShowcase } from "./_components/StatsShowcase"
import { Hero } from "./_components/Hero"
import { KeyboardStrip } from "./_components/KeyboardStrip"
import { LanguageSupport } from "./_components/LanguageSupport"
import { Process } from "./_components/Process"
import { SoundWave } from "./_components/SoundWave"
import { FinalCTA } from "./_components/FinalCTA"
import { Footer } from "./_components/Footer"

export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-sans"
      style={{ background: INK, color: CREAM }}
    >
      <BackgroundGrid />
      <NoiseOverlay />
      <TopBar />
      <Hero />
      <KeyboardStrip />
      <Modes />
      <LanguageSupport />
      <StatsShowcase />
      <Process />
      <SoundWave />
      <FinalCTA />
      <Footer />
    </div>
  )
}

function NoiseOverlay() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-1 h-full w-full opacity-[0.05] mix-blend-overlay"
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}

function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 0)
  })

  return (
    <motion.header
      className="sticky top-0 z-30 w-full px-3"
      animate={{
        backgroundColor: scrolled ? `${INK}d6` : `${INK}00`,
        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="mx-auto flex max-w-5xl items-center justify-between border px-6"
        animate={{
          marginTop: scrolled ? 10 : 0,
          paddingTop: scrolled ? 12 : 28,
          paddingBottom: scrolled ? 12 : 28,
          backgroundColor: scrolled ? "rgba(13,16,22,0.82)" : "rgba(13,16,22,0)",
          borderColor: scrolled ? `${CREAM}18` : `${CREAM}00`,
          borderRadius: scrolled ? 12 : 0,
          boxShadow: scrolled
            ? `0 22px 70px rgba(0,0,0,0.42), inset 0 1px 0 ${CYAN}18`
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className="flex items-center gap-3">
          <span
            className="font-(family-name:--font-doto) text-[28px] leading-none font-bold"
            style={{ color: CYAN }}
          >
            KeyZen
          </span>
          <div
            className="hidden text-[12px] sm:block"
            style={{ color: `${CREAM}99` }}
          >
            v.1.0 · <span style={{ color: CYAN }}>beta</span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-8 text-[13px] md:flex"
          style={{ color: `${CREAM}cc` }}
        >
          <a href="#modes" className="transition-colors hover:text-white">
            Modes
          </a>
          <a href="#languages" className="transition-colors hover:text-white">
            Languages
          </a>
          <a href="#stats" className="transition-colors hover:text-white">
            Stats
          </a>
          <a href="#process" className="transition-colors hover:text-white">
            Process
          </a>
          <a href="#open" className="transition-colors hover:text-white">
            Source
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/sh17va"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffff"
            className="bi bi-twitter-x"
            viewBox="0 0 16 16"
            id="Twitter-X--Streamline-Bootstrap"
            height="18"
            width="18"
          >
            <desc>Twitter X Streamline Icon: https://streamlinehq.com</desc>
            <path
              d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
              strokeWidth="1"
            ></path>
          </svg>
          </a>
          <CornerBrackets>
            <Button variant="noborderradius" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowUpRight weight="bold" />
                <span>Launch</span>
              </Link>
            </Button>
          </CornerBrackets>
        </div>
      </motion.div>
    </motion.header>
  )
}
