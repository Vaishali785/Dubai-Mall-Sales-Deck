import { BRAND_TILES, TICKER_BRANDS } from "@/data/retailBrands"
import type { BrandTile } from "@/types/app-types"

function BrandTile({ tile }: { tile: BrandTile }) {
	const lines = tile.name.split("\n")
	return (
		<div id={tile.id} className="brand-tile" style={tile.isHero ? { gridRow: "span 2" } : undefined}>
			<div
				className="bt-image"
				style={{
					backgroundImage: `url('${tile.img}')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			{/* <div className="bt-ambient" style={{ background: tile.ambient }} /> */}
			<div className="bt-vignette" />
			<div className="bt-text-overlay" />
			<div className="bt-name-wrap">
				{tile.logo && <div className="bt-mono">{tile.logo}</div>}
				<div className="bt-category">{tile.category}</div>
				<div className="bt-name" style={tile.isHero ? { fontSize: "clamp(32px,3.5vw,54px)" } : undefined}>
					{lines.map((l, i) => (
						<span key={i}>
							{l}
							{i < lines.length - 1 && <br />}
						</span>
					))}
				</div>
			</div>
			<div className="bt-detail">
				<div className="bt-detail-desc">{tile.desc}</div>
				<span className="bt-detail-tag">{tile.tag}</span>
			</div>
			<div className="bt-corner-tl" />
			<div className="bt-corner-br" />
		</div>
	)
}

export function RetailBrandsSection() {
	const doubled = [...TICKER_BRANDS, ...TICKER_BRANDS]

	return (
		<div
			id="retail-brands"
			className="fixed inset-0 z-[87] overflow-hidden"
			style={{ opacity: 0, pointerEvents: "none", background: "var(--c-void)" }}
		>
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse 70% 55% at 65% 25%,rgba(200,149,60,.07) 0%,transparent 60%),radial-gradient(ellipse 50% 45% at 20% 80%,rgba(200,149,60,.04) 0%,transparent 55%),var(--c-void)",
				}}
			/>

			<div
				id="retail-brands-header"
				className="absolute top-0 left-0 right-0 flex items-center justify-between"
				style={{ padding: "22px 52px 0", height: 64, zIndex: 20, opacity: 0 }}
			>
				<span className="rb-section-label">Featured Brands</span>
				{/* <span className="rb-headline">World-class retail, under one roof</span> */}
			</div>

			<div id="bento-grid">
				{BRAND_TILES.map((tile) => (
					<BrandTile key={tile.id} tile={tile} />
				))}
			</div>

			<div
				id="more-brands"
				className="absolute bottom-0 left-0 right-0 flex items-center"
				style={{
					height: 46,
					padding: "10px 52px 0",
					zIndex: 20,
					opacity: 0,
					background: "linear-gradient(to top,rgba(6,5,4,.9) 0%,transparent 100%)",
				}}
			>
				<div
					style={{
						fontFamily: "var(--f-sans)",
						fontSize: 8,
						letterSpacing: ".22em",
						textTransform: "uppercase",
						color: "rgba(200,169,110,.4)",
						fontWeight: 300,
						marginRight: 24,
						flexShrink: 0,
					}}
				>
					Also at The Mall
				</div>
				<div
					className="brands-ticker-mask"
					style={{
						display: "flex",
						overflow: "hidden",
						flex: 1,
						maskImage: "linear-gradient(to right,transparent 0%,black 5%,black 95%,transparent 100%)",
					}}
				>
					<div
						className="brands-inner"
						style={{ display: "flex", gap: 24, alignItems: "center", animation: "tickerScroll 30s linear infinite", whiteSpace: "nowrap" }}
					>
						{doubled.map((brand, i) => (
							<span
								key={i}
								style={{ fontFamily: "var(--f-serif)", fontSize: 11, fontStyle: "italic", color: "rgba(240,235,225,.28)", flexShrink: 0 }}
							>
								{brand}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
