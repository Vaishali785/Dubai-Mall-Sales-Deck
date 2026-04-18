import { VerticalDotProgress } from "@/components/ui/VerticalDotProgress"
import { ATTRACTION_CARDS } from "@/data/attractionsGallery"
import type { AttractionsGallerySectionProps } from "@/types/app-types"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"

const WHEEL_COOLDOWN_MS = 950
const CARD_ENTER_RATIO = 0.55
const CARD_EXIT_FORWARD_Y = -20

export function AttractionsGallerySection({ onReady, onBackEdge, onForwardEdge }: AttractionsGallerySectionProps) {
	const cardRefs = useRef<HTMLDivElement[]>([])
	const [activeDotIndex, setActiveDotIndex] = useState(0)
	const activeIdx = useRef(0)
	const isActiveRef = useRef(false)
	const isAnimRef = useRef(false)
	const lastWheelTs = useRef(0)

	function applyState(active: number) {
		cardRefs.current.forEach((card, i) => {
			if (!card) return
			if (i === active) {
				gsap.set(card, { opacity: 1, y: 0, scale: 1, zIndex: 20, filter: "brightness(1)" })
			} else {
				gsap.set(card, { opacity: 0, y: 0, scale: 1, zIndex: 0, filter: "brightness(1)" })
			}
		})
	}

	function goToCard(nextIdx: number, prevIdx: number) {
		if (isAnimRef.current) return
		isAnimRef.current = true

		const dir = nextIdx > prevIdx ? 1 : -1
		const curr = cardRefs.current[prevIdx]
		const next = cardRefs.current[nextIdx]
		const enterDistance = Math.round(window.innerHeight * CARD_ENTER_RATIO)

		cardRefs.current.forEach((card, i) => {
			if (i !== prevIdx && i !== nextIdx) gsap.set(card, { opacity: 0, zIndex: 0 })
		})

		if (dir > 0) {
			gsap.set(next, {
				y: enterDistance,
				opacity: 1,
				scale: 1,
				zIndex: 21,
				filter: "brightness(0.92)",
			})
			gsap.set(curr, { zIndex: 20 })
		} else {
			gsap.set(next, {
				y: 0,
				opacity: 0.6,
				scale: 0.98,
				zIndex: 20,
				filter: "brightness(0.82)",
			})
			gsap.set(curr, { zIndex: 21 })
		}

		const tl = gsap.timeline({
			onComplete: () => {
				activeIdx.current = nextIdx
				setActiveDotIndex(nextIdx)
				applyState(nextIdx)
				isAnimRef.current = false
			},
		})
		if (dir > 0) {
			tl.to(curr, {
				scale: 0.95,
				y: CARD_EXIT_FORWARD_Y,
				opacity: 0.55,
				filter: "brightness(0.74)",
				duration: 0.92,
				ease: "power2.out",
			}).to(next, { y: 0, opacity: 1, scale: 1, filter: "brightness(1)", duration: 1.05, ease: "power3.out" }, 0)
		} else {
			// On reverse scroll, current card slides back down to reveal previous card underneath.
			tl.to(curr, {
				y: enterDistance,
				opacity: 0.35,
				scale: 1,
				filter: "brightness(0.8)",
				duration: 1.0,
				ease: "power3.inOut",
			}).to(next, { y: 0, opacity: 1, scale: 1, filter: "brightness(1)", duration: 0.78, ease: "power2.out" }, 0.12)
		}
	}

	function animateIn() {
		activeIdx.current = 0
		setActiveDotIndex(0)
		applyState(0)
		if (cardRefs.current[0]) gsap.set(cardRefs.current[0], { opacity: 0, y: 70, scale: 0.97, zIndex: 30 })

		const tl = gsap.timeline()
		tl.to("#ag-header", { opacity: 1, duration: 0.55, ease: "power3.out" })
			.to("#ag-progress", { opacity: 1, duration: 0.45 }, 0.25)
			.to(cardRefs.current[0], { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "power3.out" }, 0.15)
	}

	useEffect(() => {
		onReady((active) => {
			isActiveRef.current = active
		}, animateIn)

		const onWheel = (e: WheelEvent) => {
			if (!isActiveRef.current) return
			e.preventDefault()
			e.stopImmediatePropagation()

			const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
			const now = Date.now()
			if (now - lastWheelTs.current < WHEEL_COOLDOWN_MS) return
			lastWheelTs.current = now

			if (delta > 0) {
				const next = activeIdx.current + 1
				if (next < ATTRACTION_CARDS.length) {
					goToCard(next, activeIdx.current)
				} else if (onForwardEdge) {
					onForwardEdge()
				}
			} else {
				const prev = activeIdx.current - 1
				if (prev >= 0) {
					goToCard(prev, activeIdx.current)
				} else {
					onBackEdge()
				}
			}
		}

		window.addEventListener("wheel", onWheel, { passive: false, capture: true })
		return () => window.removeEventListener("wheel", onWheel, { capture: true })
	}, [])

	return (
		<div
			id="attractions-gallery"
			className="fixed inset-0 overflow-hidden"
			style={{ zIndex: 87, opacity: 0, pointerEvents: "none", background: "var(--c-void)" }}
		>
			<div
				id="ag-header"
				className="absolute top-0 left-0 right-0 flex items-center justify-between"
				style={{
					zIndex: 10,
					padding: "26px 52px",
					opacity: 0,
					background: "linear-gradient(to bottom,rgba(6,5,4,.55) 0%,transparent 100%)",
				}}
			>
				<span
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 9,
						fontWeight: 400,
						letterSpacing: ".3em",
						textTransform: "uppercase",
						color: "var(--c-gold)",
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}
				>
					<span
						style={{
							fontFamily: "var(--f-display)",
							fontSize: 9,
							color: "rgba(200,169,110,.55)",
							letterSpacing: ".2em",
						}}
					>
						05
					</span>
					Attractions Gallery
					<span style={{ width: 20, height: 1, background: "rgba(200,169,110,.45)", display: "block" }} />
				</span>
				<span
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 9,
						fontWeight: 300,
						letterSpacing: ".22em",
						textTransform: "uppercase",
						color: "rgba(200,169,110,.4)",
					}}
				>
					Scroll to explore
				</span>
			</div>

			<div
				id="ag-progress"
				className="fixed flex flex-col items-center"
				style={{
					right: 36,
					top: "50%",
					transform: "translateY(-50%)",
					zIndex: 100,
					gap: 24,
					opacity: 0,
				}}
			>
				<VerticalDotProgress
					count={ATTRACTION_CARDS.length}
					activeIndex={activeDotIndex}
					dotClassName="wp-dot"
					onSelect={(index) => {
						if (index !== activeIdx.current) goToCard(index, activeIdx.current)
					}}
				/>
			</div>

			{/* Card stage — centred like original layout */}
			<div className="absolute inset-0 flex items-center justify-center" style={{ padding: "96px 48px 48px" }}>
				{ATTRACTION_CARDS.map((card, i) => (
					<div
						key={i}
						ref={(el) => {
							if (el) cardRefs.current[i] = el
						}}
						className="ag-card absolute"
						style={{
							width: "min(1200px, calc(100% - 96px))",
							height: "75vh",
							minHeight: 480,
							borderRadius: 20,
							overflow: "hidden",
							boxShadow: "0 20px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(200,169,110,.08)",
							opacity: 0,
							cursor: "default",
							transformOrigin: "center top",
						}}
					>
						{/* Image layer — scale on hover via CSS */}
						<div
							className="ag-card-img"
							style={{
								position: "absolute",
								inset: 0,
								backgroundImage: `url('${card.img}')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								transform: "scale(1)",
								transformOrigin: "center",
								transition: "transform 2.2s cubic-bezier(.25,0,0,1)",
							}}
						/>

						{/* Gradient overlay — lightens on hover via CSS */}
						<div
							className="ag-card-overlay"
							style={{
								position: "absolute",
								inset: 0,
								background: "linear-gradient(to top,rgba(6,5,4,.88) 0%,rgba(6,5,4,.3) 42%,rgba(6,5,4,.08) 100%)",
							}}
						/>

						{/* Content — shifts up on hover via CSS */}
						<div
							className="ag-card-content"
							style={{
								position: "absolute",
								bottom: 0,
								left: 0,
								right: 0,
								padding: "52px 52px",
								zIndex: 2,
								background: "radial-gradient(ellipse 60% 80% at 20% 70%, #2d2b2b, #00000087, transparent)",
							}}
						>
							<div
								style={{
									fontFamily: "var(--f-display)",
									fontSize: 10,
									fontWeight: 300,
									letterSpacing: ".28em",
									textTransform: "uppercase",
									color: "var(--c-gold)",
									marginBottom: 16,
									display: "flex",
									alignItems: "center",
									gap: 12,
								}}
							>
								<span
									style={{
										width: 20,
										height: 1,
										background: "var(--c-gold)",
										display: "block",
										flexShrink: 0,
									}}
								/>
								{card.eyebrow}
							</div>
							<h2
								style={{
									fontFamily: "var(--f-serif)",
									fontSize: "clamp(32px,4.5vw,60px)",
									fontWeight: 400,
									color: "var(--c-white)",
									lineHeight: 1.1,
									letterSpacing: "-.02em",
									marginBottom: 16,
								}}
							>
								{card.title} <em style={{ fontStyle: "italic", color: "var(--c-cream)" }}>{card.titleEm}</em>
							</h2>
							<p
								style={{
									fontFamily: "var(--f-sans)",
									fontSize: "clamp(13px,1.1vw,15px)",
									fontWeight: 300,
									color: "var(--c-stone)",
									lineHeight: 1.7,
									maxWidth: 480,
								}}
							>
								{card.desc}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
