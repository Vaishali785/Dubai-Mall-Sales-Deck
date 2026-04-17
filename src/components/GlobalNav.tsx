import { NAV_ITEMS } from "@/components/data/globalNav"
import type { GlobalNavProps } from "@/components/types/globalNav"

export function GlobalNav({ onWhy, onRetail, onDining, onAttractions, onPlanVisit }: GlobalNavProps) {
	function handleClick(key: string, e: { preventDefault: () => void }) {
		e.preventDefault()
		if (key === "why") onWhy()
		else if (key === "retail") onRetail()
		else if (key === "dining") onDining()
		else if (key === "attractions") onAttractions()
	}

	return (
		<nav
			id="heroNav"
			className="fixed top-0 left-0 right-0 z-[200] flex items-center"
			style={{
				padding: "20px 48px",
				opacity: 0,
				pointerEvents: "none",
				background: "linear-gradient(to bottom, rgba(6,5,4,.92) 0%, rgba(6,5,4,.7) 60%, transparent 100%)",
			}}
		>
			<a
				href="#"
				onClick={(e) => {
					e.preventDefault()
				}}
				style={{
					fontFamily: "var(--f-serif)",
					fontSize: 15,
					fontWeight: 400,
					color: "var(--c-off-white)",
					letterSpacing: "0.04em",
					textDecoration: "none",
					flexShrink: 0,
				}}
			>
				The Dubai <span style={{ color: "var(--c-gold)" }}>Mall</span>
			</a>

			<ul className="hero-nav-links flex list-none p-0" style={{ margin: "0 auto", gap: 32 }}>
				{NAV_ITEMS.map((item) => (
					<li key={item.key}>
						<a
							href="#"
							onClick={(e) => handleClick(item.key, e)}
							className="nav-item-link"
							style={{
								fontFamily: "var(--f-sans)",
								fontSize: 10,
								fontWeight: 300,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "rgba(240,235,225,.75)",
								textDecoration: "none",
							}}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>

			<a
				href="#"
				className="hero-enquire"
				onClick={(e) => {
					e.preventDefault()
					onPlanVisit()
				}}
				style={{
					fontFamily: "var(--f-sans)",
					fontSize: 10,
					fontWeight: 300,
					letterSpacing: "0.18em",
					textTransform: "uppercase",
					color: "var(--c-gold)",
					textDecoration: "none",
					border: "1px solid rgba(200,169,110,.35)",
					padding: "9px 22px",
					borderRadius: 100,
					flexShrink: 0,
				}}
			>
				Plan a Visit
			</a>
		</nav>
	)
}
