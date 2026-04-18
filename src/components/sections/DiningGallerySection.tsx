import { CARDS } from "@/data/diningCards"
import { DiningCard, DiningGallerySectionProps } from "@/types/app-types"
import gsap from "gsap"
import { useEffect, useRef } from "react"

export function DiningGallerySection({ onReady, onBackEdge, onForwardEdge }: DiningGallerySectionProps) {
	const trackRef = useRef<HTMLDivElement>(null)
	const cardsRef = useRef<HTMLDivElement[]>([])
	const isActiveRef = useRef(false)
	const isDragging = useRef(false)
	const startX = useRef(0)
	const startScroll = useRef(0)
	const lastWheelTs = useRef(0)

	function updatePerspective() {
		const track = trackRef.current
		if (!track) return
		const trackRect = track.getBoundingClientRect()
		const viewCenter = trackRect.left + trackRect.width / 2
		cardsRef.current.forEach((card) => {
			if (!card) return
			const rect = card.getBoundingClientRect()
			const cardCenter = rect.left + rect.width / 2
			const dist = cardCenter - viewCenter
			const maxDist = trackRect.width * 0.65
			const norm = Math.max(-1, Math.min(1, dist / maxDist))
			gsap.to(card, {
				rotateY: norm * -7,
				scale: 1 - Math.abs(norm) * 0.07,
				filter: `brightness(${1 - Math.abs(norm) * 0.28})`,
				duration: 0.45,
				ease: "power2.out",
				overwrite: "auto",
				transformPerspective: 900,
			})
		})
	}

	function animateIn() {
		const track = trackRef.current
		if (track) track.scrollLeft = 0
		gsap.set(cardsRef.current, { opacity: 0, scale: 0.96, y: 12 })
		const tl = gsap.timeline()
		tl.to("#dg-header", { opacity: 1, duration: 0.6, ease: "power3.out" })
			.to(cardsRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.06 }, 0.1)
			.call(() => updatePerspective())
	}

	useEffect(() => {
		onReady((active) => {
			isActiveRef.current = active
		}, animateIn)

		const track = trackRef.current
		if (!track) return

		/* ── Mouse drag ── */
		const onMouseDown = (e: MouseEvent) => {
			isDragging.current = true
			startX.current = e.clientX
			startScroll.current = track.scrollLeft
			track.classList.add("dragging")
			e.preventDefault()
		}
		const onMouseMove = (e: MouseEvent) => {
			if (!isDragging.current) return
			track.scrollLeft = startScroll.current - (e.clientX - startX.current) * 1.5
			requestAnimationFrame(updatePerspective)
		}
		const onMouseUp = () => {
			isDragging.current = false
			track.classList.remove("dragging")
		}
		track.addEventListener("mousedown", onMouseDown)
		document.addEventListener("mousemove", onMouseMove)
		document.addEventListener("mouseup", onMouseUp)
		document.addEventListener("mouseleave", onMouseUp)

		/* ── Touch drag ── */
		let touchStartX = 0,
			touchScrollLeft = 0
		const onTouchStart = (e: TouchEvent) => {
			touchStartX = e.touches[0].clientX
			touchScrollLeft = track.scrollLeft
		}
		const onTouchMove = (e: TouchEvent) => {
			track.scrollLeft = touchScrollLeft + (touchStartX - e.touches[0].clientX)
		}
		track.addEventListener("touchstart", onTouchStart, { passive: true })
		track.addEventListener("touchmove", onTouchMove, { passive: true })

		/* ── Scroll perspective ── */
		track.addEventListener("scroll", updatePerspective, { passive: true })

		/* ── Wheel: capture phase, non-passive, only active when gallery is shown ── */
		const onWheel = (e: WheelEvent) => {
			if (!isActiveRef.current) return
			e.preventDefault()
			e.stopImmediatePropagation()

			const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY

			if (delta < 0 && track.scrollLeft <= 6) {
				const now = Date.now()
				if (now - lastWheelTs.current > 700) {
					lastWheelTs.current = now
					onBackEdge()
				}
				return
			}

			const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8
			if (delta > 0 && atEnd && onForwardEdge) {
				const now = Date.now()
				if (now - lastWheelTs.current > 700) {
					lastWheelTs.current = now
					onForwardEdge()
				}
				return
			}

			track.scrollLeft += delta * 2
			requestAnimationFrame(updatePerspective)
		}
		window.addEventListener("wheel", onWheel, { passive: false, capture: true })

		return () => {
			track.removeEventListener("mousedown", onMouseDown)
			document.removeEventListener("mousemove", onMouseMove)
			document.removeEventListener("mouseup", onMouseUp)
			document.removeEventListener("mouseleave", onMouseUp)
			track.removeEventListener("touchstart", onTouchStart)
			track.removeEventListener("touchmove", onTouchMove)
			track.removeEventListener("scroll", updatePerspective)
			window.removeEventListener("wheel", onWheel, { capture: true })
		}
	}, [])

	function getCardStyle(card: DiningCard) {
		const isMobile = window.innerWidth < 768
		const isTablet = window.innerWidth < 1024
		const base: React.CSSProperties = {
			position: "relative",
			overflow: "hidden",
			borderRadius: 12,
			flexShrink: 0,
			background: "var(--c-depth)",
			border: "1px solid rgba(200,169,110,.08)",
			boxShadow: "0 0 0 0 rgba(200,169,110,0)",
			cursor: "grab",
		}
		if (isMobile) {
			if (card.size === "large") {
				return { ...base, width: "80vw", height: "55vh", marginRight: "5vw" }
			}
			return { ...base, width: "60vw", height: "36vh", marginRight: "5vw", marginTop: 0 }
		}
		if (isTablet) {
			if (card.size === "large") {
				return { ...base, width: "55vw", height: "62vh", marginRight: "4vw" }
			}
			const zigTop = card.zigzag === "up" ? "-10vh" : "8vh"
			return { ...base, width: "32vw", height: "34vh", marginRight: "4vw", marginTop: zigTop }
		}
		if (card.size === "large") {
			return { ...base, width: "42vw", height: "68vh", marginRight: "4vw" }
		}
		const zigTop = card.zigzag === "up" ? "-12vh" : "10vh"
		return { ...base, width: "22vw", height: "34vh", marginRight: "4vw", marginTop: zigTop }
	}

	return (
		<div
			id="dining-gallery"
			className="fixed inset-0 overflow-hidden flex flex-col"
			style={{ zIndex: 84, opacity: 0, pointerEvents: "none", background: "var(--c-void)" }}
		>
			<div
				id="dg-header"
				className="absolute top-0 left-0 right-0 flex items-center justify-between"
				style={{
					zIndex: 10,
					padding: "26px 52px",
					opacity: 0,
					background: "linear-gradient(to bottom,rgba(6,5,4,.6) 0%,transparent 100%)",
				}}
			>
				<span className="dg-label">Dining Gallery</span>
				{/* <span className="dg-scroll-hint">
					Scroll to explore
					<span className="dg-scroll-arrow" />
				</span> */}
			</div>

			<div
				id="dg-track"
				ref={trackRef}
				className="absolute inset-0"
				style={{
					display: "flex",
					alignItems: "stretch",
					overflowX: "scroll",
					overflowY: "hidden",
					scrollBehavior: "auto",
					cursor: "grab",
					WebkitOverflowScrolling: "touch",
				}}
			>
				<div
					id="dg-inner"
					style={{
						display: "flex",
						alignItems: "center",
						padding: "0 8vw",
						gap: 0,
						height: "100%",
						minWidth: "max-content",
					}}
				>
					{CARDS.map((card, i) => (
						<div
							key={i}
							ref={(el) => {
								if (el) cardsRef.current[i] = el
							}}
							className="dg-card"
							style={getCardStyle(card)}
						>
							<div
								className="dg-card-bg"
								style={{
									position: "absolute",
									inset: 0,
									zIndex: 0,
									backgroundImage: `url('${card.img}')`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									transform: "scale(1.06)",
									transition: "transform 1s cubic-bezier(.25,0,0,1)",
								}}
							/>
							<div className="dg-card-grad" />
							<div className="dg-card-label">
								<span className="dg-card-tag">{card.tag}</span>
								<div className="dg-card-title">
									{card.title.split("\n").map((line, j) => (
										<span key={j}>
											{line}
											{j < card.title.split("\n").length - 1 && <br />}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
