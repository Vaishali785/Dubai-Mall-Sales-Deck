import { forwardRef } from "react"

interface Props {
  count?: number
}

export const BlindSlats = forwardRef<HTMLDivElement, Props>(({ count = 18 }, ref) => {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex flex-col"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="blind-slat w-full flex-[1_0_auto] bg-depth"
          style={{ minHeight: `calc(100vh / ${count} + 1px)` }}
        />
      ))}
    </div>
  )
})

BlindSlats.displayName = "BlindSlats"

