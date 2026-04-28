"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GithubLogo, XLogo } from "@phosphor-icons/react"
import { CORAL, CREAM, CYAN } from "../lib/colors"

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="mb-4 font-mono text-[10px] tracking-[0.28em] uppercase"
      style={{ color: CYAN }}
    >
      {children}
    </h4>
  )
}

function FooterList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-[14px]" style={{ color: `${CREAM}b0` }}>
      {items.map((it) => (
        <li key={it}>
          <a href={`#${it}`} className="transition-colors hover:text-white">
            ↳ {it}
          </a>
        </li>
      ))}
    </ul>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center border transition-colors hover:bg-white/5"
      style={{ borderColor: `${CREAM}24`, color: CREAM }}
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer
      className="relative z-10 border-t pt-16 pb-10"
      style={{ borderColor: `${CREAM}14`, background: "#07090d" }}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <span
            className="flex items-center gap-2 font-(family-name:--font-doto) text-[44px] leading-none font-bold"
            style={{ color: CYAN }}
          >
            <Link href="/">KeyZen</Link>
          </span>
          <p
            className="mt-4 max-w-sm text-[14px] leading-[1.7]"
            style={{ color: `${CREAM}99` }}
          >
            A typing studio for people who care about how their fingers move.
            Open source, local-first, ad-free, and quietly opinionated.
          </p>
          
        </div>

        <div className="md:col-span-3">
          <FooterTitle>navigate</FooterTitle>
          <FooterList items={["Modes", "Stats", "Process", "Launch"]} />
        </div>

        <div className="md:col-span-4">
          <FooterTitle>support the project</FooterTitle>
          <p
            className="mb-5 text-[14px] leading-[1.65]"
            style={{ color: `${CREAM}99` }}
          >
            Stars genuinely help. So does opening a PR with the keyboard layout
            you wish existed.
          </p>
          <GitHubStarButton />
        </div>
      </div>
    </footer>
  )
}

function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch("https://api.github.com/repos/shivabhattacharjee/KeyZen")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(null))
  }, [])

  return (
    <a
      href="https://github.com/shivabhattacharjee/KeyZen"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors hover:bg-white/5"
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
  )
}
