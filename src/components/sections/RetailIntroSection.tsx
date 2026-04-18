export function RetailIntroSection() {
	return (
		<div
			id="retail-intro"
			className="fixed inset-0 z-[88] flex flex-col items-center justify-center text-center"
			style={{ opacity: 0, pointerEvents: "none", background: "var(--c-void)", padding: "80px 48px" }}
		>
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(200,149,60,.08) 0%, transparent 62%), var(--c-void)",
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
				03 — Retail
				<span style={{ width: 24, height: 1, background: "rgba(200,169,110,.5)", display: "block" }} />
			</div>

			<p
				id="ri-eyebrow"
				className="flex items-center justify-center"
				style={{
					fontFamily: "var(--f-sans)",
					fontSize: 10,
					fontWeight: 300,
					letterSpacing: ".32em",
					textTransform: "uppercase",
					color: "var(--c-gold)",
					marginBottom: 28,
					gap: 16,
				}}
			>
				<span style={{ width: 32, height: 1, background: "rgba(200,169,110,.4)", display: "block" }} />
				The Retail Ecosystem
				<span style={{ width: 32, height: 1, background: "rgba(200,169,110,.4)", display: "block" }} />
			</p>

			<h2
				id="ri-headline"
				style={{
					fontFamily: "var(--f-serif)",
					fontSize: "clamp(42px,6vw,80px)",
					fontWeight: 400,
					color: "var(--c-white)",
					lineHeight: 1.05,
					letterSpacing: "-.02em",
				}}
			>
				Retail at
				<br />
				<em style={{ fontStyle: "italic", color: "var(--c-cream)" }}>Dubai Mall</em>
			</h2>

			<div id="ri-divider" className="flex items-center" style={{ gap: 20, width: 200, margin: "24px auto 28px" }}>
				<div style={{ flex: 1, height: 1, background: "rgba(200,169,110,.2)" }} />
				<div style={{ width: 5, height: 5, border: "1px solid rgba(200,169,110,.4)", transform: "rotate(45deg)", flexShrink: 0 }} />
				<div style={{ flex: 1, height: 1, background: "rgba(200,169,110,.2)" }} />
			</div>

			<p
				id="ri-sub"
				style={{
					fontFamily: "var(--f-sans)",
					fontSize: "clamp(13px,1.3vw,16px)",
					fontWeight: 300,
					color: "var(--c-stone)",
					lineHeight: 1.75,
					maxWidth: 560,
					margin: "0 auto 40px",
				}}
			>
				Home to the world's most iconic brands —<br />
				from luxury fashion houses to global retail leaders,
				<br />
				all under one architecturally iconic roof.
			</p>

			<div id="ri-stats" className="flex items-center justify-center" style={{ gap: 56 }}>
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							fontFamily: "var(--f-display)",
							fontSize: "clamp(30px,3.5vw,44px)",
							fontWeight: 700,
							color: "var(--c-white)",
							letterSpacing: "-.02em",
							lineHeight: 1,
						}}
					>
						1,200
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
							+
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
							marginTop: 7,
						}}
					>
						Retail Stores
					</div>
				</div>
				<div style={{ width: 1, height: 36, background: "rgba(200,169,110,.18)" }} />
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							fontFamily: "var(--f-display)",
							fontSize: "clamp(30px,3.5vw,44px)",
							fontWeight: 700,
							color: "var(--c-white)",
							letterSpacing: "-.02em",
							lineHeight: 1,
						}}
					>
						200
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
							+
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
							marginTop: 7,
						}}
					>
						Luxury Brands
					</div>
				</div>
				<div style={{ width: 1, height: 36, background: "rgba(200,169,110,.18)" }} />
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							fontFamily: "var(--f-display)",
							fontSize: "clamp(30px,3.5vw,44px)",
							fontWeight: 700,
							color: "var(--c-white)",
							letterSpacing: "-.02em",
							lineHeight: 1,
						}}
					>
						5
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
							M
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
							marginTop: 7,
						}}
					>
						Sq Ft Retail
					</div>
				</div>
			</div>

			<div id="ri-scroll" className="absolute flex flex-col items-center" style={{ bottom: 36, left: "50%", transform: "translateX(-50%)", gap: 8 }}>
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
						color: "rgba(200,169,110,.5)",
					}}
				>
					Continue
				</span>
			</div>
		</div>
	)
}
