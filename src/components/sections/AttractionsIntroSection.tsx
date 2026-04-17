export function AttractionsIntroSection() {
  return (
    <div
      id="attractions-intro"
      className="fixed inset-0 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ zIndex: 83, opacity: 0, pointerEvents: "none", background: "var(--c-void)", padding: "80px 48px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%,rgba(200,149,60,.08) 0%,transparent 62%),var(--c-void)",
        }}
      />

      <div
        className="absolute flex items-center"
        style={{
          top: 36, left: 48,
          fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: ".22em",
          color: "rgba(200,169,110,.45)", fontWeight: 400, gap: 10,
        }}
      >
        07 — Attractions
        <span style={{ width: 24, height: 1, background: "rgba(200,169,110,.25)", display: "block" }} />
      </div>

      <span
        className="ai-eyebrow flex items-center justify-center relative"
        style={{
          zIndex: 2, fontFamily: "var(--f-sans)", fontSize: 10, fontWeight: 300,
          letterSpacing: ".32em", textTransform: "uppercase",
          color: "var(--c-gold)", marginBottom: 28, gap: 16,
          opacity: 0, transform: "translateY(12px)",
        }}
      >
        <span style={{ width: 32, height: 1, background: "rgba(200,169,110,.4)", display: "block" }} />
        Entertainment &amp; Experiences
        <span style={{ width: 32, height: 1, background: "rgba(200,169,110,.4)", display: "block" }} />
      </span>

      <h1
        className="ai-headline"
        style={{
          fontFamily: "var(--f-serif)", fontSize: "clamp(42px,6vw,80px)",
          fontWeight: 400, color: "var(--c-white)",
          lineHeight: 1.05, letterSpacing: "-.02em",
          position: "relative", zIndex: 2,
          opacity: 0, transform: "translateY(18px)",
        }}
      >
        Attractions at<br />
        <em style={{ fontStyle: "italic", color: "var(--c-cream)" }}>Dubai Mall</em>
      </h1>

      <div
        className="ai-divider flex items-center relative"
        style={{ zIndex: 2, gap: 20, width: 200, margin: "24px auto 28px", opacity: 0 }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,.2)" }} />
        <div style={{ width: 5, height: 5, border: "1px solid rgba(200,169,110,.4)", transform: "rotate(45deg)", flexShrink: 0 }} />
        <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,.2)" }} />
      </div>

      <p
        className="ai-sub"
        style={{
          fontFamily: "var(--f-sans)", fontSize: "clamp(13px,1.3vw,16px)",
          fontWeight: 300, color: "var(--c-stone)",
          lineHeight: 1.75, maxWidth: 560,
          margin: "0 auto 40px",
          position: "relative", zIndex: 2,
          opacity: 0, transform: "translateY(12px)",
        }}
      >
        From the mesmerising Dubai Fountain to the underwater wonders of the
        Dubai Aquarium, experience world-class entertainment and cultural
        landmarks that transform every visit into an unforgettable journey.
      </p>

      <div
        className="ai-stats flex items-center justify-center relative"
        style={{ zIndex: 2, gap: 56, opacity: 0, transform: "translateY(14px)" }}
      >
        {[
          { num: "20", sup: "+", label: "Attractions" },
          { num: "10M", sup: "+", label: "Annual Visitors" },
          { num: "5",   sup: "",  label: "Signature Experiences" },
        ].map((s, i) => (
          <div key={i} style={{ display: "contents" }}>
            {i > 0 && <div style={{ width: 1, height: 32, background: "rgba(200,169,110,.18)", flexShrink: 0 }} />}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: "clamp(30px,3.5vw,44px)",
                fontWeight: 700, color: "var(--c-white)", letterSpacing: "-.02em", lineHeight: 1,
              }}>
                {s.num}
                {s.sup && <sub style={{ fontSize: ".42em", color: "var(--c-gold)", fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, verticalAlign: "super" }}>{s.sup}</sub>}
              </div>
              <div style={{
                fontFamily: "var(--f-sans)", fontSize: 9, fontWeight: 300,
                letterSpacing: ".18em", textTransform: "uppercase",
                color: "var(--c-muted)", marginTop: 7,
              }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="ai-scroll absolute flex flex-col items-center"
        style={{ bottom: 36, left: "50%", transform: "translateX(-50%)", gap: 8, zIndex: 2, opacity: 0 }}
      >
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom,var(--c-gold),transparent)", animation: "needlePulse 2.2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "var(--f-sans)", fontSize: 9, fontWeight: 300, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(200,169,110,.5)" }}>
          Explore
        </span>
      </div>
    </div>
  );
}
