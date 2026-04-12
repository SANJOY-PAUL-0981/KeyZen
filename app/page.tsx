"use client"

import { useState, useCallback } from "react"
import { NextThemeSwitcher } from "@/components/kibo-ui/theme-switcher"
import { Keyboard } from "@/components/ui/keyboard"
import { TypingTest } from "@/components/typing-test"
import {
  IconCrown,
  IconInfoCircle,
  IconSettings,
} from "@tabler/icons-react"

export default function Page() {
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null)

  const handleKeyHighlight = useCallback((key: string | null) => {
    setHighlightedKey(key)
  }, [])

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-doto)] text-3xl font-bold text-primary">
            typecraft
          </span>
          <nav className="flex items-center gap-1 text-muted-foreground">
            <button className="rounded-lg p-2 transition-colors hover:text-foreground">
              <IconCrown size={18} />
            </button>
            <button className="rounded-lg p-2 transition-colors hover:text-foreground">
              <IconInfoCircle size={18} />
            </button>
            <button className="rounded-lg p-2 transition-colors hover:text-foreground">
              <IconSettings size={18} />
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <NextThemeSwitcher />
        </div>
      </header>

      {/* Main content - typing test centered */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10">
        <TypingTest onKeyHighlight={handleKeyHighlight} />
      </main>

      {/* Footer with keyboard */}
      <footer className="flex shrink-0 flex-col items-center gap-4 border-t border-border px-4 pb-6 pt-4">
        <div className="hidden scale-[0.85] lg:block">
          <Keyboard theme="classic" enableHaptics enableSound />
        </div>
      </footer>
    </div>
  )
}
