import { IntroLoaderMark } from "../../../public/svgs/IntroLoaderMark"

export function IntroLoader() {
	return (
		<div id="intro" className="fixed inset-0 z-[500] flex flex-col items-center justify-center" style={{ background: "var(--c-void)" }}>
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
				style={{
					width: 500,
					height: 500,
					background: "radial-gradient(ellipse at center, rgba(200,149,60,.07) 0%, transparent 65%)",
				}}
			/>

			<div id="goldOverlay" className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "var(--c-gold)", opacity: 0 }} />

			<div
				id="iconWrap"
				className="relative z-[2] flex items-center justify-center flex-shrink-0"
				style={{ width: 172, height: 192, transformOrigin: "center center" }}
			>
				<div
					id="iconGlow"
					className="absolute top-1/2 left-1/2 pointer-events-none"
					style={{
						width: 115,
						height: 150,
						transform: "translate(-50%, -50%) scale(0.8)",
						background: "radial-gradient(ellipse 60% 70% at 50% 65%, rgba(200,149,60,.22) 0%, transparent 70%)",
						opacity: 0,
					}}
				/>

				<IntroLoaderMark />
			</div>

			<div id="introCopy" className="relative z-[2] text-center" style={{ marginTop: 46, opacity: 0, transform: "translateY(14px)" }}>
				<p
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 10,
						fontWeight: 200,
						letterSpacing: "0.38em",
						textTransform: "uppercase",
						color: "rgba(200,169,110,.5)",
						marginBottom: 12,
					}}
				>
					Welcome to
				</p>
				<h1
					style={{
						fontFamily: "var(--f-serif)",
						fontSize: "clamp(16px, 2vw, 22px)",
						fontWeight: 400,
						color: "var(--c-off-white)",
						lineHeight: 1.35,
						letterSpacing: "-0.01em",
					}}
				>
					The World's Most Visited
					<br />
					Retail Destination
				</h1>
			</div>

			<div className="loader-bar-outer absolute left-1/2 -translate-x-1/2 z-[2]" style={{ bottom: 52, width: 180 }}>
				<div style={{ width: "100%", height: 1, background: "rgba(200,169,110,.1)" }}>
					<div
						id="loaderFill"
						style={{
							height: 1,
							width: "0%",
							background: "linear-gradient(to right, rgba(200,169,110,.4), var(--c-gold))",
						}}
					/>
				</div>
				<div
					id="loaderPct"
					style={{
						fontFamily: "var(--f-display)",
						fontSize: 10,
						letterSpacing: "0.18em",
						color: "rgba(200,169,110,.5)",
						textAlign: "right",
						marginTop: 9,
					}}
				>
					0%
				</div>
			</div>
		</div>
	)
}
