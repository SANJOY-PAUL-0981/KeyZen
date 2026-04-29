"use client";

import { motion } from "motion/react";
import { CREAM, CYAN, INK } from "../lib/colors";
import { SectionHeader } from "./Modes";

const FAQS = [
  {
    q: "Is KeyZen free?",
    a: "Yes. You can open the test and start typing without an account, paywall, or trial gate.",
  },
  {
    q: "What makes the stats useful?",
    a: "KeyZen separates raw speed from net WPM, then pairs it with accuracy, consistency, and error decay so a fast but messy run does not look better than a cleaner one.",
  },
  {
    q: "Can I practice code and custom text?",
    a: "Yes. You can use built-in code drills, paste your own writing, or switch into a calmer zen mode when you want practice without a timer.",
  },
  {
    q: "Does the keyboard view work with my real keyboard?",
    a: "The landing preview reacts to physical key presses, and the app includes keyboard display options for matching the feel of your setup.",
  },
] as const;

export function FAQ() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
      <SectionHeader
        kicker="§07 · faq"
        title="Small answers before you start."
        sub="The short version: open it, type, read the signal, repeat."
      />

      <div
        className="border"
        style={{ background: `${CREAM}10`, borderColor: `${CREAM}10` }}
      >
        {FAQS.map((item, index) => (
          <motion.details
            key={item.q}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group border-b last:border-b-0"
            style={{ background: index % 2 === 0 ? INK : "#0d1016", borderColor: `${CREAM}10` }}
            open={index === 0}
          >
            <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-5 marker:hidden sm:px-7">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.26em]"
                style={{ color: CYAN }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[20px] font-bold leading-tight tracking-[-0.01em] sm:text-[24px]"
                style={{ color: CREAM }}
              >
                {item.q}
              </span>
              <span
                className="grid h-7 w-7 place-items-center border font-mono text-[16px] leading-none transition-transform group-open:rotate-45"
                style={{ borderColor: `${CREAM}16`, color: CYAN }}
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-6 pl-[72px] sm:px-7 sm:pl-[92px]">
              <p
                className="max-w-[68ch] text-[14px] leading-[1.7]"
                style={{ color: `${CREAM}a6` }}
              >
                {item.a}
              </p>
            </div>
          </motion.details>
        ))}
      </div>
    </section>
  );
}
