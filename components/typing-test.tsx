"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { generateWords } from "@/lib/words";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import {
  IconAt,
  IconClock,
  IconLetterA,
  IconQuote,
  IconMountain,
  IconRefresh,
} from "@tabler/icons-react";

type TestMode = "time" | "words" | "quote" | "zen";
type TimeOption = 15 | 30 | 60 | 120;
type WordOption = 10 | 25 | 50 | 100;

interface TypingTestProps {
  onKeyHighlight?: (key: string | null) => void;
}

export function TypingTest({ onKeyHighlight }: TypingTestProps) {
  const [mode, setMode] = useState<TestMode>("time");
  const [timeOption, setTimeOption] = useState<TimeOption>(30);
  const [wordOption, setWordOption] = useState<WordOption>(25);
  const [punctuation, setPunctuation] = useState(false);

  const [words, setWords] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Track per-word input for error highlighting
  const [wordInputs, setWordInputs] = useState<string[]>([]);

  // WPM / accuracy
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const inputRef = useRef<HTMLInputElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabPressedRef = useRef(false);

  const wordCount = useMemo(() => {
    if (mode === "time") return 200;
    if (mode === "words") return wordOption;
    return 100;
  }, [mode, wordOption]);

  // Generate words on mount & mode change
  const resetTest = useCallback(() => {
    const newWords = generateWords(wordCount, { punctuation });
    setWords(newWords);
    setTyped("");
    setWordIndex(0);
    setCharIndex(0);
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setWordInputs([]);
    setCorrectChars(0);
    setTotalChars(0);
    setWpm(0);
    setAccuracy(100);
    if (mode === "time") {
      setTimeLeft(timeOption);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (wordsContainerRef.current) {
      wordsContainerRef.current.scrollTop = 0;
    }
    inputRef.current?.focus();
  }, [wordCount, mode, timeOption, punctuation]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

  // Scroll active word into view — snap by one line height when word enters 3rd row
  useEffect(() => {
    if (!activeWordRef.current || !wordsContainerRef.current) return;
    const container = wordsContainerRef.current;
    const word = activeWordRef.current;
    const lineHeight = word.offsetHeight;
    const wordTop = word.offsetTop;

    // Snap scrollTop so the active word is always within the first 2 visible rows
    if (wordTop >= container.scrollTop + lineHeight * 2) {
      // Word moved into 3rd row — scroll down by one line
      container.scrollTop = wordTop - lineHeight;
    } else if (wordTop < container.scrollTop) {
      // Word moved above visible area (backspace to prev word) — scroll up
      container.scrollTop = wordTop;
    }
  }, [wordIndex]);

  // Timer for time mode
  useEffect(() => {
    if (started && mode === "time" && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setFinished(true);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [started, mode, finished]);

  // Calculate WPM
  useEffect(() => {
    if (started && startTime && !finished) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      if (elapsed > 0) {
        setWpm(Math.round(correctChars / 5 / elapsed));
      }
    }
  }, [correctChars, started, startTime, finished, typed]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        tabPressedRef.current = true;
        // Clear tab state after a short window
        setTimeout(() => {
          tabPressedRef.current = false;
        }, 1000);
        return;
      }

      if (e.key === "Enter" && tabPressedRef.current) {
        e.preventDefault();
        tabPressedRef.current = false;
        resetTest();
        return;
      }

      if (finished) return;

      if (!started) {
        setStarted(true);
        setStartTime(Date.now());
      }

      const currentWord = words[wordIndex];

      if (e.key === " ") {
        e.preventDefault();
        if (typed.length === 0) return;

        // Record this word's input
        setWordInputs((prev) => [...prev, typed]);

        // Count correct chars
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
          if (typed[i] === currentWord[i]) correct++;
        }
        setCorrectChars((prev) => prev + correct);
        setTotalChars((prev) => prev + currentWord.length);

        if (totalChars + currentWord.length > 0) {
          setAccuracy(
            Math.round(
              ((correctChars + correct) / (totalChars + currentWord.length)) *
                100,
            ),
          );
        }

        // Move to next word
        if (wordIndex + 1 >= words.length) {
          setFinished(true);
          return;
        }
        setWordIndex((prev) => prev + 1);
        setTyped("");
        onKeyHighlight?.(null);
        return;
      }

      if (e.key === "Backspace") {
        if (typed.length === 0 && wordIndex > 0) {
          // Go back to previous word and restore its typed input
          const prevInput = wordInputs[wordIndex - 1];
          setWordIndex((prev) => prev - 1);
          setTyped(prevInput);
          setWordInputs((prev) => prev.slice(0, -1));
        } else {
          setTyped((prev) => prev.slice(0, -1));
        }
        return;
      }

      if (e.key.length === 1) {
        const nextTyped = typed + e.key;
        setTyped(nextTyped);

        // Highlight next expected key
        const nextCharIndex = nextTyped.length;
        if (nextCharIndex < currentWord.length) {
          onKeyHighlight?.(currentWord[nextCharIndex]);
        } else {
          onKeyHighlight?.(" ");
        }
      }
    },
    [
      finished,
      started,
      words,
      wordIndex,
      typed,
      correctChars,
      totalChars,
      resetTest,
      onKeyHighlight,
    ],
  );

  const handleFocus = () => inputRef.current?.focus();

  // Results screen
  if (finished) {
    const elapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 1;
    const finalWpm = Math.round(correctChars / 5 / elapsed);

    return (
      <div
        className="flex w-full max-w-4xl flex-col items-center gap-8"
        onClick={handleFocus}
      >
        <div className="flex items-center gap-12">
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground">wpm</span>
            <span className="font-mono text-5xl font-bold text-primary">
              {finalWpm}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground">acc</span>
            <span className="font-mono text-5xl font-bold text-primary">
              {accuracy}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-center">
            <span>characters</span>
            <span className="font-mono text-foreground">
              {correctChars}/{totalChars}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>words</span>
            <span className="font-mono text-foreground">{wordIndex}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>time</span>
            <span className="font-mono text-foreground">
              {Math.round(elapsed * 60)}s
            </span>
          </div>
        </div>

        <button
          onClick={resetTest}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconRefresh size={18} />
          restart
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex w-full max-w-4xl flex-col items-center gap-6"
      onClick={handleFocus}
    >
      {/* Mode selector */}
      <div className="flex items-center gap-1">
        {/* Punctuation toggle */}
        <button
          onClick={() => setPunctuation(!punctuation)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            punctuation ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <IconAt size={14} />
          punctuation
        </button>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Mode tabs */}
        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as TestMode)}
          className="flex items-center"
        >
          <TabsList>
            {[
              { value: "time", icon: IconClock, label: "time" },
              { value: "words", icon: IconLetterA, label: "words" },
              { value: "quote", icon: IconQuote, label: "quote" },
              { value: "zen", icon: IconMountain, label: "zen" },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger key={value} value={value} className="gap-1.5 px-3 text-xs">
                <Icon size={13} />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Time / word-count tabs — always visible, disabled in zen/quote */}
        {mode === "words" ? (
          <Tabs
            value={String(wordOption)}
            onValueChange={(v) => setWordOption(Number(v) as WordOption)}
            className="flex items-center"
          >
            <TabsList>
              {[10, 25, 50, 100].map((w) => (
                <TabsTrigger key={w} value={String(w)} className="px-3 text-xs">
                  {w}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <Tabs
            value={String(timeOption)}
            onValueChange={(v) => {
              if (mode === "time") setTimeOption(Number(v) as TimeOption);
            }}
            className="flex items-center"
          >
            <TabsList>
              {[15, 30, 60, 120].map((t) => (
                <TabsTrigger
                  key={t}
                  value={String(t)}
                  disabled={mode !== "time"}
                  className="px-3 text-xs"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* Words display — timer anchored top-left inside, space always reserved */}
      <div className="relative w-full">
        {/* Timer top-left — always occupies space, invisible before start */}
        <div className="mb-3 h-8">
          {mode === "time" && (
            <span
              className={cn(
                "font-mono text-2xl font-bold text-primary transition-opacity duration-200",
                started ? "opacity-100" : "opacity-0",
              )}
            >
              {timeLeft}
            </span>
          )}
          {mode === "words" && started && (
            <span className="font-mono text-sm text-muted-foreground">
              {wordIndex}/{wordOption}
            </span>
          )}
        </div>

      <div
        ref={wordsContainerRef}
        className="relative h-[8.5rem] w-full overflow-hidden font-mono text-2xl leading-relaxed"
      >
        <input
          ref={inputRef}
          className="absolute opacity-0"
          onKeyDown={handleKeyDown}
          value={typed}
          onChange={() => {}}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        <LayoutGroup id="words">
        <div className="flex flex-wrap gap-x-2.5 gap-y-1">
          {words.map((word, wIdx) => {
            const isActive = wIdx === wordIndex;
            const isPast = wIdx < wordIndex;
            const wordInput = isPast ? wordInputs[wIdx] : isActive ? typed : "";
            // cursor sits before typed.length, or after last char if at/past end
            const cursorAtEnd = isActive && typed.length >= word.length;

            return (
              <div
                key={`${word}-${wIdx}`}
                ref={isActive ? activeWordRef : undefined}
                className="relative"
              >
                {word.split("").map((char, cIdx) => {
                  let color = "text-muted-foreground/40";
                  if (isPast || isActive) {
                    if (cIdx < wordInput.length) {
                      color = wordInput[cIdx] === char ? "text-foreground" : "text-destructive";
                    }
                  }
                  const isLastChar = cIdx === word.length - 1;

                  return (
                    <span key={cIdx} className="relative inline-block">
                      {/* Cursor before this char */}
                      {isActive && cIdx === typed.length && (
                        <motion.span
                          layoutId={`cursor-w${wordIndex}`}
                          className="typing-cursor absolute -left-px top-[2px] h-[1.2em] w-[2px] rounded-full bg-primary"
                          transition={{ type: "spring", stiffness: 600, damping: 35 }}
                        />
                      )}
                      {/* Cursor after last char (typed at or past end) */}
                      {isActive && isLastChar && cursorAtEnd && (
                        <motion.span
                          layoutId={`cursor-w${wordIndex}`}
                          className="typing-cursor absolute -right-px top-[2px] h-[1.2em] w-[2px] rounded-full bg-primary"
                          transition={{ type: "spring", stiffness: 600, damping: 35 }}
                        />
                      )}
                      <span className={cn("transition-colors duration-75", color)}>
                        {char}
                      </span>
                    </span>
                  );
                })}
                {/* Extra typed chars beyond word length */}
                {(isActive || isPast) &&
                  wordInput.length > word.length &&
                  wordInput.slice(word.length).split("").map((char, eIdx) => (
                    <span key={`extra-${eIdx}`} className="text-destructive/60">
                      {char}
                    </span>
                  ))}
              </div>
            );
          })}
        </div>
        </LayoutGroup>
      </div>
      </div>{/* end words wrapper */}

      {/* Restart button */}
      <button
        onClick={resetTest}
        className="mt-2 rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
        title="Restart test"
      >
        <IconRefresh size={18} />
      </button>

      {/* Keyboard shortcuts hint */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            tab
          </kbd>
          {" + "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            enter
          </kbd>
          {" "}- restart test
        </span>
      </div>
    </div>
  );
}
