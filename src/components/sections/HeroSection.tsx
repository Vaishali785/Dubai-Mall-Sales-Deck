import { GoldDivider } from "../ui/GoldDivider"
import { ScrollCue } from "../ui/ScrollCue"

const HERO_STAGE_BG = "radial-gradient(ellipse 50% 210% at 23% 50%, #ff000014 75%, #00000082 80%, rgb(6 5 4 / 88%) 85%)"

export function HeroSection() {
	return (
		<div id="hero" className="fixed inset-0 z-[100] flex overflow-hidden" style={{ opacity: 0, pointerEvents: "none", background: HERO_STAGE_BG }}>
			{/* ── Left video panel ── */}
			<div id="hero-video-panel" className="absolute left-0 top-0 bottom-0 z-[1] overflow-hidden hero-video-panel" style={{ width: "100%" }}>
				<video
					id="hero-vid"
					src="/videos/hero-section-video.mp4"
					autoPlay
					muted
					loop
					playsInline
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
						opacity: 1,
						zIndex: 1,
					}}
				></video>
				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse 70% 55% at 38% 45%, rgba(200,149,60,.09) 0%, transparent 58%), linear-gradient(165deg, #131008 0%, #0c0a07 55%, #060504 100%)",
					}}
				/>
				<div
					className="absolute inset-0"
					style={{
						background: "linear-gradient(to right, transparent 60%, rgba(6,5,4,.9) 100%)",
					}}
				/>
				<div
					className="absolute inset-0"
					style={{
						background: "linear-gradient(to bottom, rgba(6,5,4,.45) 0%, transparent 18%, transparent 72%, rgba(6,5,4,.4) 100%)",
					}}
				/>
				<div
					className="absolute inset-0"
					style={{
						backgroundImage:
							"linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)",
						backgroundSize: "80px 80px",
						opacity: 0.025,
					}}
				/>
				<div
					className="absolute bottom-6 left-8"
					style={{
						fontFamily: "var(--f-display)",
						fontSize: 9,
						fontWeight: 300,
						letterSpacing: "0.28em",
						textTransform: "uppercase",
						color: "rgba(200,169,110,.35)",
					}}
				>
					Downtown Dubai · UAE
				</div>
			</div>

			{/* ── Overlay gradient (arc from left panel into right) ── */}
			<div
				id="arcOverlay"
				className="absolute inset-0 z-[3] pointer-events-none"
				style={{
					background: HERO_STAGE_BG,
				}}
			/>
			<div
				className="absolute top-0 left-0 right-0 z-[4] pointer-events-none"
				style={{
					height: 160,
					background: "linear-gradient(to bottom, rgba(6,5,4,.45) 0%, transparent 100%)",
				}}
			/>

			{/* ── Right text panel ── */}
			<div
				id="textPanel"
				className="absolute right-0 top-0 bottom-0 z-[8] flex flex-col justify-center overflow-hidden"
				style={{ width: "35%", padding: "110px 52px 80px 36px" }}
			>
				<div
					className="absolute pointer-events-none rounded-full"
					style={{
						top: "10%",
						right: "-15%",
						width: "60%",
						height: "60%",
						background: "radial-gradient(ellipse at center, rgba(200,149,60,.07) 0%, transparent 65%)",
					}}
				/>

				<div
					id="hEyebrow"
					className="flex items-center"
					style={{
						gap: 14,
						fontFamily: "var(--f-sans)",
						fontSize: 10,
						fontWeight: 300,
						letterSpacing: "0.26em",
						textTransform: "uppercase",
						color: "var(--c-gold)",
						marginBottom: 26,
						opacity: 0,
					}}
				>
					<div style={{ width: 22, height: 1, background: "rgba(200,169,110,.7)", flexShrink: 0 }} />
					Global Destination · Dubai, UAE
				</div>

				<h2
					style={{
						fontFamily: "var(--f-serif)",
						fontSize: "clamp(26px, 2.8vw, 44px)",
						fontWeight: 400,
						color: "var(--c-white)",
						lineHeight: 1.1,
						letterSpacing: "-0.018em",
						margin: "0 0 22px",
					}}
				>
					<span className="h-line" style={{ display: "block", opacity: 0, transform: "translateY(26px)", willChange: "transform, opacity" }}>
						A Global Destination
					</span>
					<span className="h-line" style={{ display: "block", opacity: 0, transform: "translateY(26px)", willChange: "transform, opacity" }}>
						for Retail <em style={{ fontStyle: "italic", color: "var(--c-cream)" }}>&amp;</em>
					</span>
					<span className="h-line" style={{ display: "block", opacity: 0, transform: "translateY(26px)", willChange: "transform, opacity" }}>
						<em style={{ fontStyle: "italic", color: "var(--c-cream)" }}>Experiences</em>
					</span>
				</h2>

				<div id="hDivider" style={{ opacity: 0, marginBottom: 18 }}>
					<GoldDivider />
				</div>

				<p
					id="hSub"
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 13,
						fontWeight: 300,
						color: "var(--c-off-white)",
						lineHeight: 1.82,
						maxWidth: 300,
						marginBottom: 44,
						opacity: 0,
						transform: "translateY(12px)",
					}}
				>
					More than a shopping center.
					<br />
					Where brands, culture, and experiences
					<br />
					converge at the center of the world.
				</p>

				<div id="scrollCue" style={{ opacity: 0, transform: "translateY(8px)" }}>
					<ScrollCue text="Scroll to explore" />
				</div>
			</div>

			{/* ── Side indicator ── */}
			<div
				id="sideInd"
				className="absolute flex flex-col items-center z-[8]"
				style={{ left: 20, top: "50%", transform: "translateY(-50%)", gap: 10, opacity: 0 }}
			>
				<div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, rgba(200,169,110,.65), transparent)" }} />
				<div style={{ width: 4, height: 4, borderRadius: "50%", border: "1px solid rgba(200,169,110,.7)" }} />
				<div
					style={{
						fontFamily: "var(--f-display)",
						fontSize: 9,
						fontWeight: 300,
						letterSpacing: "0.2em",
						color: "rgba(200,169,110,.65)",
						writingMode: "vertical-rl",
					}}
				>
					01
				</div>
			</div>
		</div>
	)
}
