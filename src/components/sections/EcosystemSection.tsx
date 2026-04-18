import { CATS } from "@/data/ecosystem"
import type { EcoCategory } from "@/types/app-types"
import gsap from "gsap"
import { useRef } from "react"

function LogoCloud({ logos }: { logos: EcoCategory["logos"] }) {
	return (
		<div className="eco-logo-cloud">
			{logos.map((row, ri) => (
				<div key={ri}>
					<div className="eco-logo-row">
						{row.map((b, i) => (
							<span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
								<div className={`eco-logo-item ${b.c}`}>
									<span className="eco-logo-text">{b.t}</span>
								</div>
								{i < row.length - 1 && <span className="eco-logo-dot" />}
							</span>
						))}
					</div>
					{ri < logos.length - 1 && <div className="eco-logo-row-gap" />}
				</div>
			))}
		</div>
	)
}

interface EcosystemSectionProps {
	onReady: (flipTo: (nextIdx: number, direction: number) => void, getIdx: () => number, getFlipping: () => boolean) => void
}

export function EcosystemSection({ onReady }: EcosystemSectionProps) {
	const ecoIdxRef = useRef(0)
	const ecoFlippingRef = useRef(false)
	const leftRefs = useRef<(HTMLDivElement | null)[]>([])
	const rightRefs = useRef<(HTMLDivElement | null)[]>([])
	const dotRefs = useRef<(HTMLDivElement | null)[]>([])

	function updateNav(idx: number) {
		dotRefs.current.forEach((d, i) => {
			if (!d) return
			d.classList.toggle("active", i === idx)
		})
	}

	function flipTo(nextIdx: number, direction: number) {
		if (ecoFlippingRef.current || nextIdx === ecoIdxRef.current) return
		ecoFlippingRef.current = true

		const prevIdx = ecoIdxRef.current
		ecoIdxRef.current = nextIdx
		updateNav(nextIdx)

		const curCat = leftRefs.current[prevIdx]
		const curLogo = rightRefs.current[prevIdx]
		const nxtCat = leftRefs.current[nextIdx]
		const nxtLogo = rightRefs.current[nextIdx]
		const DUR = 0.88
		const isMobile = window.innerWidth < 768

		if (isMobile) {
			/* ── Mobile: horizontal split flip ──
         Top panel (cat) exits LEFT, bottom panel (logo) exits RIGHT
         Incoming: top from RIGHT, bottom from LEFT                    */
			gsap.set(nxtCat, { rotationY: direction > 0 ? 90 : -90, z: -60, opacity: 0 })
			gsap.set(nxtLogo, { rotationY: direction > 0 ? -90 : 90, z: -60, opacity: 0 })

			if (curCat)
				gsap.to(curCat, {
					rotationY: direction > 0 ? -90 : 90,
					z: -60,
					opacity: 0,
					duration: DUR,
					ease: "power3.inOut",
					transformOrigin: "50% 50%",
				})
			if (curLogo)
				gsap.to(curLogo, {
					rotationY: direction > 0 ? 90 : -90,
					z: -60,
					opacity: 0,
					duration: DUR,
					ease: "power3.inOut",
					transformOrigin: "50% 50%",
				})
			if (nxtCat)
				gsap.to(nxtCat, {
					rotationY: 0,
					z: 0,
					opacity: 1,
					duration: DUR,
					ease: "power3.inOut",
					delay: 0.05,
					transformOrigin: "50% 50%",
					onComplete: () => {
						ecoFlippingRef.current = false
					},
				})
			if (nxtLogo)
				gsap.to(nxtLogo, {
					rotationY: 0,
					z: 0,
					opacity: 1,
					duration: DUR,
					ease: "power3.inOut",
					delay: 0.05,
					transformOrigin: "50% 50%",
				})
		} else {
			/* ── Desktop: vertical flip (original) ── */
			gsap.set(nxtCat, { rotationX: direction > 0 ? 90 : -90, z: -60, opacity: 0 })
			gsap.set(nxtLogo, { rotationX: direction > 0 ? -90 : 90, z: -60, opacity: 0 })

			if (curCat)
				gsap.to(curCat, {
					rotationX: direction > 0 ? -90 : 90,
					z: -60,
					opacity: 0,
					duration: DUR,
					ease: "power3.inOut",
					transformOrigin: "50% 0%",
				})
			if (curLogo)
				gsap.to(curLogo, {
					rotationX: direction > 0 ? 90 : -90,
					z: -60,
					opacity: 0,
					duration: DUR,
					ease: "power3.inOut",
					transformOrigin: "50% 100%",
				})
			if (nxtCat)
				gsap.to(nxtCat, {
					rotationX: 0,
					z: 0,
					opacity: 1,
					duration: DUR,
					ease: "power3.inOut",
					delay: 0.05,
					transformOrigin: "50% 100%",
					onComplete: () => {
						ecoFlippingRef.current = false
					},
				})
			if (nxtLogo)
				gsap.to(nxtLogo, {
					rotationX: 0,
					z: 0,
					opacity: 1,
					duration: DUR,
					ease: "power3.inOut",
					delay: 0.05,
					transformOrigin: "50% 0%",
				})
		}
	}

	function handleReady(el: HTMLDivElement | null) {
		if (!el) return
		gsap.set(leftRefs.current.slice(1), { opacity: 0 })
		gsap.set(rightRefs.current.slice(1), { opacity: 0 })
		gsap.set(leftRefs.current[0], { opacity: 1 })
		gsap.set(rightRefs.current[0], { opacity: 1 })
		onReady(
			flipTo,
			() => ecoIdxRef.current,
			() => ecoFlippingRef.current,
		)
	}

	return (
		<div
			id="ecosystem"
			className="fixed inset-0 overflow-hidden"
			style={{ zIndex: 86, opacity: 0, pointerEvents: "none", background: "var(--c-void)" }}
			ref={handleReady}
		>
			<div
				id="eco-stage"
				style={{
					position: "absolute",
					inset: 0,
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					perspective: "1200px",
				}}
			>
				{/* LEFT — category info faces */}
				<div
					id="eco-left"
					style={{ position: "relative", overflow: "hidden", transformStyle: "preserve-3d", borderRight: "1px solid rgba(200,169,110,.08)" }}
				>
					{CATS.map((cat, i) => (
						<div
							key={cat.id}
							ref={(el) => {
								leftRefs.current[i] = el
							}}
							className="eco-face eco-cat-face"
							style={{
								position: "absolute",
								inset: 0,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								padding: "80px 64px 80px 72px",
								overflow: "hidden",
								backfaceVisibility: "hidden",
							}}
						>
							<div className="eco-cat-bg" style={{ position: "absolute", inset: 0, zIndex: 0, background: cat.catBg }} />
							<div style={{ position: "relative", zIndex: 1 }}>
								<div className="eco-cat-eyebrow">{cat.eyebrow}</div>
								<h3 className="eco-cat-title">
									{cat.title}
									<br />
									<em>{cat.titleItalic}</em>
								</h3>
								<p className="eco-cat-desc">{cat.desc}</p>
								<div className="eco-cat-stat">
									<div className="eco-cat-stat-num">{cat.stat}</div>
									<div className="eco-cat-stat-label" style={{ whiteSpace: "pre-line" }}>
										{cat.statLabel}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* RIGHT — logo cloud faces */}
				<div id="eco-right" style={{ position: "relative", overflow: "hidden", transformStyle: "preserve-3d" }}>
					{CATS.map((cat, i) => (
						<div
							key={cat.id}
							ref={(el) => {
								rightRefs.current[i] = el
							}}
							className="eco-face eco-logo-face"
							style={{
								position: "absolute",
								inset: 0,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								padding: "60px 52px",
								overflow: "hidden",
								backfaceVisibility: "hidden",
							}}
						>
							<div className="eco-logos-bg" style={{ position: "absolute", inset: 0, zIndex: 0, background: cat.logosBg }} />
							<div style={{ position: "relative", zIndex: 1, width: "100%" }}>
								<LogoCloud logos={cat.logos} />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Side dot navigation */}
			<div
				id="eco-side-nav"
				style={{
					position: "fixed",
					right: 32,
					top: "50%",
					transform: "translateY(-50%)",
					zIndex: 200,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					pointerEvents: "all",
					gap: 0,
				}}
			>
				{CATS.map((cat, i) => (
					<div
						key={cat.id}
						ref={(el) => {
							dotRefs.current[i] = el
						}}
						className={`eco-side-dot${i === 0 ? " active" : ""}`}
						onClick={() => {
							if (i !== ecoIdxRef.current) flipTo(i, i > ecoIdxRef.current ? 1 : -1)
						}}
					>
						<span className="eco-side-label">{cat.eyebrow.split(" — ")[1]}</span>
					</div>
				))}
			</div>

			<div
				id="eco-hint"
				style={{
					position: "fixed",
					bottom: 28,
					left: "50%",
					transform: "translateX(-50%)",
					fontFamily: "var(--f-sans)",
					fontSize: 8,
					letterSpacing: ".26em",
					textTransform: "uppercase",
					color: "rgba(200,169,110,.5)",
					pointerEvents: "none",
					whiteSpace: "nowrap",
				}}
			>
				Use scroll to navigate
			</div>
		</div>
	)
}
