import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — KeyZen",
  description: "Page not found.",
}

// Pixel cat sprite.
//   # = outline (foreground)
//   w = body fill (card)
//   e = eye
//   . = transparent
const CAT: readonly string[] = [
  "..##......##..",
  ".#ww#....#ww#.",
  ".#wwww####www#",
  ".#we#wwwwww#e#",
  ".#wwwwwwwwwww#",
  ".#wwww####www#",
  ".#wwwwwwwwwww#",
  "..#wwwwwwwww#.",
  "..#wwwwwwwww#.",
  "...#wwwwwwww#.",
  "...#w##ww##w#.",
  "...#w#..#w##..",
  "...##....##...",
]

const PX = 5 // one "pixel" in svg units

function CatPixels() {
  const cells: { x: number; y: number; kind: "#" | "w" | "e" }[] = []
  CAT.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const ch = row[c]
      if (ch === "#" || ch === "w" || ch === "e") {
        cells.push({ x: c * PX, y: r * PX, kind: ch })
      }
    }
  })
  return (
    <>
      {cells.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={PX}
          height={PX}
          className={p.kind === "w" ? "fill-card" : "fill-foreground"}
        />
      ))}
    </>
  )
}

function PixelCatWithSign() {
  // viewBox wide enough to fit "PAGE NOT FOUND" in doto without clipping.
  // Cat matrix 14x13 cells at PX=5 = 70x65.
  return (
    <svg
      viewBox="-6 -6 200 170"
      shapeRendering="crispEdges"
      overflow="visible"
      preserveAspectRatio="xMidYMax meet"
      className="h-32 w-44 sm:h-40 sm:w-56"
      aria-hidden="true"
    >
      {/* Sign board */}
      <g className="cat-sign">
        <rect
          x="6"
          y="4"
          width="168"
          height="36"
          className="fill-card"
          stroke="currentColor"
          strokeWidth={PX / 2}
        />
        {/* pixel corner studs */}
        <rect x="6" y="4" width={PX} height={PX} className="fill-foreground" />
        <rect x="169" y="4" width={PX} height={PX} className="fill-foreground" />
        <rect x="6" y="35" width={PX} height={PX} className="fill-foreground" />
        <rect x="169" y="35" width={PX} height={PX} className="fill-foreground" />
        <text
          x="90"
          y="27"
          textAnchor="middle"
          className="fill-foreground font-(family-name:--font-doto)"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="1"
        >
          PAGE NOT FOUND
        </text>
      </g>

      {/* Arm: stepped pixels from sign bottom to cat's top-left paw */}
      {[
        { x: 48, y: 44 },
        { x: 54, y: 50 },
        { x: 60, y: 56 },
        { x: 66, y: 62 },
      ].map((p, i) => (
        <rect
          key={`arm-${i}`}
          x={p.x}
          y={p.y}
          width={PX}
          height={PX}
          className="fill-foreground"
        />
      ))}

      {/* Cat body */}
      <g transform="translate(60, 68)">
        <CatPixels />
      </g>

      {/* Tail curling up on the right */}
      {[
        { x: 140, y: 108 },
        { x: 145, y: 103 },
        { x: 145, y: 98 },
        { x: 145, y: 93 },
        { x: 140, y: 88 },
      ].map((p, i) => (
        <rect
          key={`tail-${i}`}
          x={p.x}
          y={p.y}
          width={PX}
          height={PX}
          className="fill-foreground"
        />
      ))}
    </svg>
  )
}

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex max-w-xl flex-col items-center text-center">
        {/* 404 with cat peeking on top of the last "4" */}
        <div className="relative flex items-center justify-center">
          <span className="font-(family-name:--font-doto) text-[10rem] font-bold leading-none text-foreground sm:text-[14rem]">
            40
          </span>
          <span className="relative inline-block font-(family-name:--font-doto) text-[10rem] font-bold leading-none text-foreground sm:text-[14rem]">
            {/* Cat sits on top of the 4 — slides up from behind it on mount */}
            <div
              className="cat-slide pointer-events-none absolute bottom-full left-1/2 z-0"
              aria-hidden="true"
            >
              <PixelCatWithSign />
            </div>
            <span className="relative z-10 bg-background">4</span>
          </span>
        </div>

        <p className="mt-10 leading-relaxed text-muted-foreground">
          Looks like you mistyped the URL. Even the best typists miss sometimes.
        </p>

        <Link
          href="/"
          className="mt-6 text-sm text-primary underline-offset-4 hover:underline"
        >
          &#8592; Back to typing test
        </Link>
      </div>
    </main>
  )
}
