import { useEffect, useRef } from "react";

interface UseWheelHandlerOptions {
  onScroll: (direction: 1 | -1) => void;
  cooldown?: number;
}

export function useWheelHandler({ onScroll, cooldown = 700 }: UseWheelHandlerOptions) {
  const onScrollRef = useRef(onScroll);
  onScrollRef.current = onScroll;

  useEffect(() => {
    let lastWheel = 0;
    let touchStartY = 0;

    function handleWheel(e: WheelEvent) {
      const now = Date.now();
      if (now - lastWheel < cooldown) return;
      lastWheel = now;
      onScrollRef.current(e.deltaY > 0 ? 1 : -1);
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
      const now = Date.now();
      if (now - lastWheel < cooldown) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
      lastWheel = now;
      onScrollRef.current(delta > 0 ? 1 : -1);
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cooldown]);
}
