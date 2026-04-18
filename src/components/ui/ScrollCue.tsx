interface ScrollCueProps {
  text?: string;
}

export function ScrollCue({ text = "Scroll to explore" }: ScrollCueProps) {
  return (
    <div className="flex items-center" style={{ gap: 12 }}>
      <div
        className="flex-shrink-0"
        style={{
          width: 1,
          height: 38,
          background: "linear-gradient(to bottom, var(--c-gold), transparent)",
          animation: "needlePulse 2.2s ease-in-out infinite",
        }}
      />
      <span
        style={{
          fontFamily: "var(--f-sans)",
          fontSize: 9,
          fontWeight: 300,
          letterSpacing: "0.28em",
          textTransform: "uppercase" as const,
          color: "var(--c-gold)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
