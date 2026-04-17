export function IntroLoaderMark() {
  return (
    <>
      <svg
        id="burjSvg"
        className="relative z-[2]"
        width="54"
        height="124"
        viewBox="0 0 54 124"
        fill="none"
        style={{ filter: "drop-shadow(0 0 10px rgba(200,169,110,.12))" }}
      >
        <path
          id="burjPath"
          d="M27,2 L27,20 L26,20 L26,29 L24,29 L24,41
             L22,41 L22,54 L20,54 L20,67
             L16,67 L16,81 L11,81 L11,97
             L6,97 L6,120 L48,120
             L48,97 L43,97 L43,81 L38,81
             L38,67 L34,67 L34,54 L32,54
             L32,41 L30,41 L30,29 L28,29 L28,20 Z"
          stroke="#C8A96E"
          strokeWidth="1.2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line className="b-accent" x1="6" y1="97" x2="48" y2="97" stroke="rgba(200,169,110,.28)" strokeWidth=".6" opacity="0" />
        <line className="b-accent" x1="11" y1="81" x2="43" y2="81" stroke="rgba(200,169,110,.22)" strokeWidth=".6" opacity="0" />
        <line className="b-accent" x1="16" y1="67" x2="38" y2="67" stroke="rgba(200,169,110,.18)" strokeWidth=".6" opacity="0" />
        <line className="b-accent" x1="20" y1="54" x2="34" y2="54" stroke="rgba(200,169,110,.14)" strokeWidth=".6" opacity="0" />
        <line className="b-accent" x1="22" y1="41" x2="32" y2="41" stroke="rgba(200,169,110,.1)" strokeWidth=".6" opacity="0" />
        <line id="burjGround" x1="1" y1="120" x2="53" y2="120" stroke="rgba(200,169,110,.4)" strokeWidth="1" strokeLinecap="round" opacity="0" />
      </svg>

      <svg
        id="loaderRing"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"
        viewBox="0 0 172 172"
        fill="none"
        style={{ width: 172, height: 172 }}
      >
        <circle cx="86" cy="86" r="78" stroke="rgba(200,169,110,.08)" strokeWidth="1" />
        <circle
          id="ringProgress"
          cx="86"
          cy="86"
          r="78"
          stroke="#C8A96E"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="490.1"
          strokeDashoffset="490.1"
          transform="rotate(-90 86 86)"
        />
        <line x1="86" y1="6" x2="86" y2="16" stroke="rgba(200,169,110,.4)" strokeWidth="1" />
        <line x1="166" y1="86" x2="156" y2="86" stroke="rgba(200,169,110,.4)" strokeWidth="1" />
        <line x1="86" y1="166" x2="86" y2="156" stroke="rgba(200,169,110,.4)" strokeWidth="1" />
        <line x1="6" y1="86" x2="16" y2="86" stroke="rgba(200,169,110,.4)" strokeWidth="1" />
      </svg>
    </>
  );
}
