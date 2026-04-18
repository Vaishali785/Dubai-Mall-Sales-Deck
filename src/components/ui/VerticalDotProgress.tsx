import type { CSSProperties } from "react";

interface VerticalDotProgressProps {
  id?: string;
  count: number;
  activeIndex: number;
  onSelect?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
  dotClassName?: string;
  gap?: number;
}

export function VerticalDotProgress({
  id,
  count,
  activeIndex,
  onSelect,
  className,
  style,
  dotClassName = "",
  gap = 24,
}: VerticalDotProgressProps) {
  return (
    <div
      id={id}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap,
        ...style,
      }}
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            aria-label={`Go to item ${index + 1}`}
            onClick={() => onSelect?.(index)}
            className={dotClassName}
            style={{
              appearance: "none",
              padding: 0,
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: `1px solid ${isActive ? "var(--c-gold)" : "rgba(200,169,110,.3)"}`,
              background: isActive ? "var(--c-gold)" : "transparent",
              boxShadow: isActive ? "0 0 8px rgba(200,169,110,.4)" : "none",
              cursor: onSelect ? "pointer" : "default",
              transition: "all .4s cubic-bezier(.25,0,0,1)",
            }}
          />
        );
      })}
    </div>
  );
}
