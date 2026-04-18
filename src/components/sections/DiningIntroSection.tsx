export function DiningIntroSection() {
	return (
		<div
			id="dining-intro"
			className="fixed inset-0 flex flex-col items-center justify-center text-center overflow-hidden"
			style={{ zIndex: 85, opacity: 0, pointerEvents: "none", background: "var(--c-void)", padding: "80px 48px" }}
		>
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse 65% 50% at 50% 45%,rgba(200,149,60,.07) 0%,transparent 62%),radial-gradient(ellipse 40% 40% at 80% 75%,rgba(160,80,30,.05) 0%,transparent 55%),var(--c-void)",
				}}
			/>

			<div
				className="absolute flex items-center"
				style={{
					top: 36,
					left: 48,
					fontFamily: "var(--f-display)",
					fontSize: 10,
					letterSpacing: ".22em",
					color: "var(--c-gold)",
					fontWeight: 400,
					gap: 10,
				}}
			>
				05 — Dining
				<span style={{ width: 24, height: 1, background: "rgba(200,169,110,.5)", display: "block" }} />
			</div>

			<p
				id="di-eyebrow"
				className="di-eyebrow flex items-center justify-center relative"
				style={{
					zIndex: 1,
					fontFamily: "var(--f-sans)",
					fontSize: 10,
					fontWeight: 300,
					letterSpacing: ".36em",
					textTransform: "uppercase",
					color: "var(--c-gold)",
					marginBottom: 28,
					gap: 18,
					opacity: 0,
					transform: "translateY(14px)",
				}}
			>
				<span style={{ width: 36, height: 1, background: "rgba(200,169,110,.45)", display: "block" }} />
				The Dining Experience
				<span style={{ width: 36, height: 1, background: "rgba(200,169,110,.45)", display: "block" }} />
			</p>

			<h2
				id="di-headline"
				style={{
					fontFamily: "var(--f-serif)",
					fontSize: "clamp(44px,6.5vw,86px)",
					fontWeight: 400,
					color: "var(--c-white)",
					lineHeight: 1.04,
					letterSpacing: "-.02em",
					position: "relative",
					zIndex: 1,
					opacity: 0,
					transform: "translateY(18px)",
				}}
			>
				Dining at
				<br />
				<em style={{ fontStyle: "italic", color: "var(--c-cream)" }}>Dubai Mall</em>
			</h2>

			<div id="di-divider" className="flex items-center relative" style={{ zIndex: 1, gap: 20, width: 200, margin: "24px auto 26px", opacity: 0 }}>
				<div style={{ flex: 1, height: 1, background: "rgba(200,169,110,.2)" }} />
				<div style={{ width: 5, height: 5, border: "1px solid rgba(200,169,110,.45)", transform: "rotate(45deg)", flexShrink: 0 }} />
				<div style={{ flex: 1, height: 1, background: "rgba(200,169,110,.2)" }} />
			</div>

			<p
				id="di-sub"
				style={{
					fontFamily: "var(--f-sans)",
					fontSize: "clamp(13px,1.35vw,16px)",
					fontWeight: 300,
					color: "var(--c-stone)",
					lineHeight: 1.78,
					maxWidth: 540,
					margin: "0 auto 44px",
					position: "relative",
					zIndex: 1,
					opacity: 0,
					transform: "translateY(12px)",
				}}
			>
				From Michelin-inspired tasting menus to vibrant waterfront cafés,
				<br />
				Dubai Mall offers a world-class culinary destination where
				<br />
				global flavors meet unforgettable dining experiences.
			</p>

			<div
				id="di-stats"
				className="flex items-center justify-center relative"
				style={{ zIndex: 1, gap: 60, opacity: 0, transform: "translateY(10px)" }}
			>
				{[
					{ num: "200", sup: "+", label: "Restaurants" },
					{ num: "50", sup: "+", label: "Global Cuisines" },
					{ num: "30", sup: "+", label: "Waterfront Dining" },
				].map((stat, i) => (
					<div key={i} style={{ display: "contents" }}>
						{i > 0 && <div style={{ width: 1, height: 40, background: "rgba(200,169,110,.18)", flexShrink: 0 }} />}
						<div style={{ textAlign: "center" }}>
							<div
								style={{
									fontFamily: "var(--f-display)",
									fontSize: "clamp(32px,3.8vw,48px)",
									fontWeight: 700,
									color: "var(--c-white)",
									letterSpacing: "-.02em",
									lineHeight: 1,
								}}
							>
								{stat.num}
								<sub
									style={{
										fontSize: ".42em",
										color: "var(--c-gold)",
										fontFamily: "var(--f-serif)",
										fontStyle: "italic",
										fontWeight: 300,
										verticalAlign: "super",
									}}
								>
									{stat.sup}
								</sub>
							</div>
							<div
								style={{
									fontFamily: "var(--f-sans)",
									fontSize: 9,
									fontWeight: 300,
									letterSpacing: ".18em",
									textTransform: "uppercase",
									color: "var(--c-muted)",
									marginTop: 8,
								}}
							>
								{stat.label}
							</div>
						</div>
					</div>
				))}
			</div>

			<div
				id="di-scroll"
				className="absolute flex flex-col items-center"
				style={{ bottom: 36, left: "50%", transform: "translateX(-50%)", gap: 8, opacity: 0, zIndex: 1 }}
			>
				<div
					style={{
						width: 1,
						height: 28,
						background: "linear-gradient(to bottom,var(--c-gold),transparent)",
						animation: "needlePulse 2.2s ease-in-out infinite",
					}}
				/>
				<span
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 9,
						fontWeight: 300,
						letterSpacing: ".26em",
						textTransform: "uppercase",
						color: "rgba(200,169,110,.55)",
					}}
				>
					Explore Dining
				</span>
			</div>
		</div>
	)
}
