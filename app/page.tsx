"use client"

import { useState, useCallback } from "react"
import { useMountEffect } from "@/hooks/use-mount-effect"
import { cn } from "@/lib/utils"
import { useAppChrome } from "@/components/app-chrome"
import { Keyboard } from "@/components/ui/keyboard"
import { TypingTest } from "@/components/typing-test"
import { useSettings } from "@/components/settings-context"

export default function Page() {
  const { settingsOpen, setTypingActive, homeLogoHandlerRef } = useAppChrome()
  const [isFinished, setIsFinished] = useState(false)
  const [typingFocused, setTypingFocused] = useState(true)
  const [restartKey, setRestartKey] = useState(0)
  const { showKeyboard, soundEnabled } = useSettings()

  useMountEffect(() => {
    homeLogoHandlerRef.current = () => {
      setIsFinished(false)
      setRestartKey((k) => k + 1)
    }
    return () => {
      homeLogoHandlerRef.current = null
    }
  })

  const handleTypingActiveChange = useCallback(
    (active: boolean) => {
      setTypingActive(active)
    },
    [setTypingActive],
  )

  const handleKeyHighlight = useCallback((_key: string | null) => {}, [])

  const showFooter = !isFinished && showKeyboard

  return (
    <div className="flex flex-1 flex-col">
      <main
        className={cn(
          "flex flex-col px-6",
          isFinished
            ? "flex-1 justify-center px-10 py-2"
            : showFooter
              ? "flex-1 items-center justify-center lg:justify-end lg:pb-8"
              : "flex-1 items-center justify-center",
        )}
      >
        <TypingTest
          key={restartKey}
          onKeyHighlight={handleKeyHighlight}
          onFinished={setIsFinished}
          onTypingActiveChange={handleTypingActiveChange}
          onFocusChange={setTypingFocused}
          pauseTypingInputRefocus={settingsOpen}
        />
      </main>

      {!isFinished && (
        <footer
          className={cn(
            "hidden items-center justify-center border-t border-border lg:flex",
            showKeyboard
              ? "flex-1 flex-col"
              : "invisible h-0 overflow-hidden border-0",
          )}
        >
          <div className="scale-[0.85]">
            <Keyboard
              theme="classic"
              enableHaptics
              enableSound={soundEnabled}
              forceActive={soundEnabled && !showKeyboard}
              physicalKeysEnabled={typingFocused}
            />
          </div>
        </footer>
      )}
    </div>
  )
}
