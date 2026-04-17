import { WHY_BG_STYLES, WHY_CHAPTERS, WHY_IMG_STYLES } from "@/components/data/whySection";

export function WhySection() {
	return (
		<div
			id="why-section"
			className="fixed inset-0 z-[90] flex overflow-hidden"
			style={{ opacity: 0, pointerEvents: "none", willChange: "opacity, transform" }}
		>
			{/* Background layers */}
			<div className="absolute inset-0 z-0">
				{WHY_BG_STYLES.map((style, i) => (
					<div key={i} id={`wbg${i}`} className="bg-layer absolute inset-0" style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity", ...style }} />
				))}
			</div>

			{/* Overlay for text legibility */}
			<div
				className="absolute inset-0 z-[2] pointer-events-none"
				style={{
					background:
						"linear-gradient(to right, rgba(6,5,4,.88) 0%, rgba(6,5,4,.55) 40%, transparent 62%), linear-gradient(to bottom, rgba(6,5,4,.3) 0%, transparent 14%, transparent 78%, rgba(6,5,4,.4) 100%)",
				}}
			/>

			{/* Section header */}
			<div id="why-header" className="absolute z-[6]" style={{ top: 44, left: 96, opacity: 0, transform: "translateY(-10px)" }}>
				<span
					className="flex items-center"
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 10,
						fontWeight: 400,
						letterSpacing: "0.3em",
						textTransform: "uppercase",
						color: "var(--c-gold)",
						gap: 12,
					}}
				>
					<span
						style={{
							fontFamily: "var(--f-display)",
							fontSize: 10,
							fontWeight: 400,
							color: "rgba(200,169,110,.65)",
							letterSpacing: "0.18em",
						}}
					>
						02
					</span>
					Why This Property
					<span style={{ width: 28, height: 1, background: "rgba(200,169,110,.5)", display: "block" }} />
				</span>
			</div>

			{/* Image panel */}
			<div
				id="why-img-panel"
				className="absolute z-[3] overflow-hidden"
				style={{
					right: 52,
					top: 60,
					bottom: 60,
					width: "40%",
					borderRadius: 12,
					border: "1px solid rgba(200,169,110,.12)",
					boxShadow: "0 0 80px rgba(0,0,0,.6), inset 0 0 0 1px rgba(200,169,110,.06)",
				}}
			>
				{WHY_CHAPTERS.map((chapter, i) => (
					<div
						key={chapter.id}
						className="absolute top-0 bottom-0 left-0 z-[2] pointer-events-none"
						style={{
							width: "100%",
							background: `url(${chapter.img}) no-repeat center center`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							borderRadius: "12px 0 0 12px",
						}}
					/>
				))}

				{WHY_CHAPTERS.map((chapter, i) => (
					<div
						key={chapter.id}
						id={`wi${i}`}
						className="why-img-card absolute inset-0 flex items-center justify-center overflow-hidden"
						style={{ opacity: 0, willChange: "opacity", borderRadius: 12, ...WHY_IMG_STYLES[i] }}
					>
						<div
							className="absolute inset-0"
							style={{
								opacity: 0.07,
								backgroundImage:
									"linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)",
								backgroundSize: "60px 60px",
							}}
						/>
						<div className="absolute z-[3] flex items-flex-end justify-between" style={{ bottom: 28, left: 28, right: 28 }}>
							<span
								style={{
									fontFamily: "var(--f-sans)",
									fontSize: 9,
									fontWeight: 300,
									letterSpacing: "0.22em",
									textTransform: "uppercase",
									color: "rgba(200,169,110,.55)",
									border: "1px solid rgba(200,169,110,.18)",
									padding: "6px 14px",
									borderRadius: 100,
									background: "rgba(6,5,4,.4)",
								}}
							>
								{chapter.imgLabel}
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Text chapters */}
			<div className="why-text-container absolute inset-0 z-[5] flex items-center" style={{ padding: "0 0 0 96px", width: "55%" }}>
				{WHY_CHAPTERS.map((chapter, i) => (
					<div
						key={chapter.id}
						id={`wc${i}`}
						className="why-chapter absolute"
						style={{ maxWidth: 520, opacity: 0, transform: "translateY(32px)", willChange: "opacity, transform" }}
					>
						<div
							className="flex items-center"
							style={{
								fontFamily: "var(--f-display)",
								fontSize: 11,
								fontWeight: 400,
								letterSpacing: "0.3em",
								color: "var(--c-gold)",
								textTransform: "uppercase",
								marginBottom: 28,
								gap: 14,
							}}
						>
							{chapter.num}
							<span style={{ display: "block", width: 32, height: 1, background: "rgba(200,169,110,.6)" }} />
						</div>

						<div
							style={{
								fontFamily: "var(--f-display)",
								fontSize: "clamp(80px, 11vw, 138px)",
								fontWeight: 700,
								lineHeight: 0.88,
								color: "var(--c-white)",
								letterSpacing: "-0.025em",
								marginBottom: 20,
							}}
						>
							{chapter.stat}
							{chapter.unit && (
								<sub
									style={{
										fontSize: "0.36em",
										color: "var(--c-gold)",
										fontFamily: "var(--f-serif)",
										fontStyle: "italic",
										fontWeight: 300,
										verticalAlign: "super",
									}}
								>
									{chapter.unit}
								</sub>
							)}
						</div>

						<h3
							style={{
								fontFamily: "var(--f-serif)",
								fontSize: "clamp(20px, 2.2vw, 28px)",
								fontWeight: 400,
								color: "var(--c-white)",
								lineHeight: 1.2,
								letterSpacing: "-0.01em",
								marginBottom: 18,
							}}
						>
							{chapter.title}
						</h3>

						<p
							style={{
								fontFamily: "var(--f-sans)",
								fontSize: 14,
								fontWeight: 300,
								color: "var(--c-off-white)",
								lineHeight: 1.85,
								maxWidth: 400,
							}}
						>
							{chapter.desc}
						</p>
					</div>
				))}
			</div>

			{/* Progress indicator — dot nav (matches other sections) */}
			<div
				id="why-progress"
				className="absolute z-[8] flex flex-col items-center"
				style={{ right: 32, top: "50%", transform: "translateY(-50%)", gap: 0 }}
			>
				{/* Hidden fill element kept for GSAP compatibility */}
				<div id="wpFill" style={{ display: "none" }} />
				<div id="wpLabel" style={{ display: "none" }} />

				{WHY_CHAPTERS.map((_, i) => (
					<div
						key={i}
						data-i={i}
						className="wp-dot-wrap why-side-dot flex-shrink-0"
						style={{
							position: "relative",
							width: 32,
							height: 32,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "default",
						}}
					>
						<div
							className="wp-dot-inner wp-dot"
							style={{
								width: i === 0 ? 6 : 5,
								height: i === 0 ? 6 : 5,
								borderRadius: "50%",
								border: `1px solid ${i === 0 ? "var(--c-gold)" : "rgba(200,169,110,.5)"}`,
								background: i === 0 ? "var(--c-gold)" : "transparent",
								boxShadow: i === 0 ? "0 0 8px rgba(200,169,110,.5)" : "none",
								transition: "all 0.45s cubic-bezier(0.25,0,0,1)",
							}}
						/>
						{i < WHY_CHAPTERS.length - 1 && (
							<div
								style={{
									position: "absolute",
									bottom: -11,
									left: "50%",
									transform: "translateX(-50%)",
									width: 1,
									height: 10,
									background: "linear-gradient(to bottom, rgba(200,169,110,.2), rgba(200,169,110,.1))",
								}}
							/>
						)}
					</div>
				))}
			</div>

			{/* Scroll hint */}
			<div
				id="why-scroll-hint"
				className="absolute left-1/2 -translate-x-1/2 z-[8] flex flex-col items-center"
				style={{ bottom: 32, opacity: 0, gap: 8 }}
			>
				<div
					style={{
						width: 1,
						height: 28,
						background: "linear-gradient(to bottom, var(--c-gold), transparent)",
						animation: "needlePulse 2.2s ease-in-out infinite",
					}}
				/>
				<span
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 9,
						fontWeight: 300,
						letterSpacing: "0.26em",
						textTransform: "uppercase",
						color: "var(--c-gold)",
					}}
				>
					Scroll to continue
				</span>
			</div>
		</div>
	)
}
