export function GoldDivider() {
  return (
    <div className="flex items-center" style={{ gap: 12 }}>
      <div className="flex-1" style={{ height: 1, background: "rgba(200,169,110,0.2)" }} />
      <div
        className="flex-shrink-0 rotate-45"
        style={{ width: 5, height: 5, border: "1px solid rgba(200,169,110,0.5)" }}
      />
      <div className="flex-1" style={{ height: 1, background: "rgba(200,169,110,0.2)" }} />
    </div>
  );
}
