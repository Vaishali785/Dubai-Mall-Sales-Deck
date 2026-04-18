import { gsap } from "gsap"
import { useEffect, useRef } from "react"

/**
 * FinaleSection — cinematic closing experience for The Dubai Mall.
 * Stack: React + Tailwind + GSAP (with @gsap/react useGSAP).
 *
 * Flow:
 *  1. Entry        — previous section fades to black, motion slows.
 *  2. Convergence  — background compresses, golden core ignites.
 *  3. Silhouette   — Dubai Mall architecture emerges from light.
 *  4. Expansion    — light spreads, sculpting depth.
 *  5. Text         — heading reveals line-by-line, blur → sharp.
 *  6. Parallax     — light + silhouette respond to mouse.
 *  7. CTA          — soft glowing pulse, intensifies on hover.
 *  8. Exit         — light dims, footer rises.
 */
type FinaleSectionProps = {
	onReady?: (setActive: (active: boolean) => void, animateIn: () => void) => void
	onBackEdge?: () => void
}

const FINALE_SCRUB_FACTOR = 0.00075
const REVERSE_SCROLL_THRESHOLD = 140

const FinaleSection = ({ onReady, onBackEdge }: FinaleSectionProps) => {
	const root = useRef<HTMLElement | null>(null)
	const lightCore = useRef<HTMLDivElement | null>(null)
	const lightHalo = useRef<HTMLDivElement | null>(null)
	const silhouette = useRef<HTMLDivElement | null>(null)
	const stage = useRef<HTMLDivElement | null>(null)
	const headingLines = useRef<HTMLSpanElement[]>([])
	const paragraph = useRef<HTMLParagraphElement | null>(null)
	const cta = useRef<HTMLAnchorElement | null>(null)
	const eyebrow = useRef<HTMLDivElement | null>(null)
	const footer = useRef<HTMLDivElement | null>(null)
	const scrollCue = useRef<HTMLDivElement | null>(null)
	const isActiveRef = useRef(false)
	const timelineRef = useRef<gsap.core.Timeline | null>(null)
	const lastBackEdgeRef = useRef(0)
	const reverseIntentRef = useRef(0)

	const setLine = (i: number) => (el: HTMLSpanElement | null) => {
		if (el) headingLines.current[i] = el
	}

	useEffect(() => {
		const playFinale = () => {
			gsap.killTweensOf([
				lightCore.current,
				lightHalo.current,
				silhouette.current,
				stage.current,
				paragraph.current,
				eyebrow.current,
				cta.current,
				footer.current,
				scrollCue.current,
			])
			gsap.killTweensOf(headingLines.current)

			// Keep a faint ambient base so transition never feels like a blank/error frame.
			gsap.set(lightCore.current, { scale: 0.55, opacity: 0.12 })
			gsap.set(lightHalo.current, { scale: 0.9, opacity: 0.18 })
			gsap.set(silhouette.current, { opacity: 0.2, scale: 1.08, filter: "blur(18px)" })
			gsap.set(headingLines.current, { yPercent: 110, opacity: 0, filter: "blur(18px)" })
			gsap.set(paragraph.current, { opacity: 0, filter: "blur(12px)", y: 20 })
			gsap.set(eyebrow.current, { opacity: 0, y: 12 })
			gsap.set(cta.current, { opacity: 0, y: 24, scale: 0.92 })
			gsap.set(footer.current, { opacity: 0, y: 60 })
			gsap.set(scrollCue.current, { opacity: 0.8, y: 0 })
			gsap.set(stage.current, { scale: 1 })

			timelineRef.current?.kill()
			timelineRef.current = gsap
				.timeline({ defaults: { ease: "power3.out" }, paused: true })
				.to(lightCore.current, { opacity: 1, scale: 1, duration: 1.2 }, 0.15)
				.to(lightHalo.current, { opacity: 1, scale: 1.2, duration: 1.6 }, 0.2)
				.to(silhouette.current, { opacity: 0.85, scale: 1, filter: "blur(0px)", duration: 1.8 }, 0.35)
				.to(lightHalo.current, { scale: 1.85, opacity: 0.72, duration: 1.8 }, 0.7)
				.to(lightCore.current, { scale: 1.35, duration: 1.8 }, 0.7)
				.to(scrollCue.current, { opacity: 0, y: -8, duration: 0.35, ease: "power2.out" }, 0.45)
				.to(eyebrow.current, { opacity: 1, y: 0, duration: 0.6 }, 1.0)
				.to(
					headingLines.current,
					{
						yPercent: 0,
						opacity: 1,
						filter: "blur(0px)",
						duration: 1.0,
						stagger: 0.2,
						ease: "expo.out",
					},
					1.05,
				)
				.to(paragraph.current, { opacity: 1, filter: "blur(0px)", duration: 0.9 }, 1.55)
				.to(cta.current, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 1.7)
				.to([lightCore.current, lightHalo.current], { opacity: 0.35, duration: 1.0 }, 2.2)
				.to(footer.current, { opacity: 1, y: 0, duration: 0.8 }, 2.25)

			timelineRef.current.progress(0)
		}
		const animateIn = () => {
			playFinale()
			isActiveRef.current = true
		}
		onReady?.((active: boolean) => {
			isActiveRef.current = active
		}, animateIn)

		const onMove = (e: MouseEvent) => {
			const r = root.current?.getBoundingClientRect()
			if (!r) return
			const x = (e.clientX - r.left) / r.width - 0.5
			const y = (e.clientY - r.top) / r.height - 0.5
			gsap.to(silhouette.current, {
				xPercent: x * -3,
				yPercent: y * -2,
				duration: 1.4,
				ease: "power2.out",
			})
			gsap.to(lightCore.current, {
				xPercent: x * 6,
				yPercent: y * 5,
				duration: 1.2,
				ease: "power2.out",
			})
			gsap.to(lightHalo.current, {
				xPercent: x * 3,
				yPercent: y * 2,
				duration: 1.6,
				ease: "power2.out",
			})
		}

		const onWheel = (e: WheelEvent) => {
			if (!isActiveRef.current) return
			e.preventDefault()
			e.stopImmediatePropagation()

			const tl = timelineRef.current
			if (!tl) return

			const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
			const current = tl.progress()

			if (delta > 0) {
				reverseIntentRef.current = 0
			} else if (delta < 0) {
				reverseIntentRef.current += Math.abs(delta)
			}

			// Prevent accidental tiny reverse jitter from hiding revealed text.
			const reverseUnlocked = reverseIntentRef.current >= REVERSE_SCROLL_THRESHOLD
			if (delta < 0 && !reverseUnlocked) return

			const next = gsap.utils.clamp(0, 1, current + delta * FINALE_SCRUB_FACTOR)
			gsap.to(tl, {
				progress: next,
				duration: 0.22,
				ease: "power2.out",
				overwrite: true,
			})

			if (delta < 0 && next <= 0.01 && onBackEdge) {
				const now = Date.now()
				if (now - lastBackEdgeRef.current > 600) {
					lastBackEdgeRef.current = now
					reverseIntentRef.current = 0
					onBackEdge()
				}
			}
		}
		const node = root.current
		node?.addEventListener("mousemove", onMove)
		window.addEventListener("wheel", onWheel, { passive: false, capture: true })

		return () => {
			node?.removeEventListener("mousemove", onMove)
			window.removeEventListener("wheel", onWheel, { capture: true })
			timelineRef.current?.kill()
		}
	}, [onBackEdge, onReady])

	return (
		<section
			id="finale"
			ref={root}
			className="finale-bg-void fixed inset-0 z-[86] h-screen w-full overflow-hidden"
			style={{ opacity: 0, pointerEvents: "none" }}
			aria-label="The Dubai Mall — finale"
		>
			{/* STAGE — everything that compresses on entry */}
			<div ref={stage} className="absolute inset-0 will-change-transform">
				{/* Silhouette layer */}
				<div
					ref={silhouette}
					className="absolute inset-0 will-change-transform"
					style={{
						backgroundImage: `url(/images/mall-silhouette.jpg)`,
						backgroundSize: "cover",
						backgroundPosition: "center 70%",
						mixBlendMode: "screen",
					}}
				/>

				{/* Vignette to drown the edges */}
				<div className="finale-vignette pointer-events-none absolute inset-0" />

				{/* Golden halo (wide diffuse) */}
				<div
					ref={lightHalo}
					className="finale-radial-gold pointer-events-none absolute left-1/2 top-[58%] h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 will-change-transform"
					style={{ filter: "blur(32px)" }}
				/>

				{/* Golden core (tight bright) */}
				<div
					ref={lightCore}
					className="pointer-events-none absolute left-1/2 top-[58%] h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
					style={{
						background: "radial-gradient(circle, hsl(var(--gold-pale) / 0.9) 0%, hsl(var(--gold) / 0.45) 30%, transparent 70%)",
						filter: "blur(20px)",
					}}
				/>

				{/* Subtle film grain via SVG noise */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
					style={{
						backgroundImage:
							"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
					}}
				/>
			</div>

			{/* CONTENT */}
			<div className="relative z-10 flex h-full w-full items-center justify-center px-6">
				<div className="mx-auto max-w-3xl text-center">
					<div ref={eyebrow} className="mb-10 flex items-center justify-center gap-4">
						<span className="finale-line h-px w-12" />
						<span className="font-condensed text-[11px] uppercase finale-text-gold">The Final Chapter</span>
						<span className="finale-line h-px w-12" />
					</div>

					<h2 className="font-serif-display text-5xl leading-[1.05] finale-text-cream md:text-7xl">
						<span className="block overflow-hidden">
							<span ref={setLine(0)} className="inline-block will-change-transform">
								More Than a
							</span>
						</span>
						<span className="mt-2 block overflow-hidden">
							<span ref={setLine(1)} className="inline-block italic finale-text-gold-light will-change-transform">
								Destination
							</span>
						</span>
					</h2>

					<p
						ref={paragraph}
						className="mx-auto mt-10 max-w-xl font-sans-luxe text-base font-light leading-relaxed text-[hsl(var(--cream)/0.7)] md:text-lg"
					>
						From iconic fashion to immersive art, <br />
						world-class dining to unforgettable attractions — <br />
						Dubai Mall is not just a place you visit. <br />
						It is a world you step into.
					</p>

					<a
						ref={cta}
						href="#discover"
						className="finale-cta mt-14 inline-flex items-center gap-3 rounded-sm px-10 py-4 font-condensed text-xs uppercase will-change-transform"
					>
						<span>Plan Your Visit</span>
						<span aria-hidden className="text-gold">
							→
						</span>
					</a>
				</div>
			</div>

			{/* FOOTER reveal */}
			<div
				ref={footer}
				className="absolute bottom-0 left-0 right-0 z-20 border-t border-[hsl(var(--gold)/0.15)] bg-[hsl(var(--void)/0.8)] px-8 py-6 backdrop-blur-sm"
			>
				<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
					<span className="font-condensed text-[10px] uppercase finale-text-gold">The Dubai Mall · Downtown Dubai</span>
					<span className="font-sans-luxe text-[11px] text-[hsl(var(--cream)/0.5)]">© {new Date().getFullYear()} — Crafted in light.</span>
				</div>
			</div>

			<div ref={scrollCue} className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
				<div className="flex items-center gap-3">
					<span className="h-px w-8 bg-[hsl(var(--gold)/0.35)]" />
					<span className="font-condensed text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--gold)/0.7)]">Scroll To Reveal</span>
					<span className="h-px w-8 bg-[hsl(var(--gold)/0.35)]" />
				</div>
			</div>
		</section>
	)
}

export default FinaleSection
