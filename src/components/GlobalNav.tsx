import { BlindSlats } from "@/components/ui/BlindSlats"
import { BurjHamburger } from "@/components/ui/BurjHamburger"
import { useNavMenuAnimation } from "@/hooks/useNavMenuAnimation"
import { useScrolled } from "@/hooks/useScrolled"
import { cn } from "@/lib/utils"
import type { GlobalNavProps } from "@/types/app-types"
import { useRef, type ReactNode } from "react"

interface NavLink {
	num: string
	text: ReactNode
	action: () => void
}

const FOOTER_LINKS = ["Leasing", "Sponsorship", "Media", "Contact"]

export function GlobalNav({ onWhy, onRetail, onDining, onAttractions, onPlanVisit }: GlobalNavProps) {
	const scrolled = useScrolled(20)

	const slatsWrap = useRef<HTMLDivElement>(null)
	const line1 = useRef<HTMLSpanElement>(null)
	const line2 = useRef<HTMLSpanElement>(null)
	const line3 = useRef<HTMLSpanElement>(null)
	const glow = useRef<HTMLDivElement>(null)
	const content = useRef<HTMLDivElement>(null)
	// const brand = useRef<HTMLDivElement>(null)
	const label = useRef<HTMLParagraphElement>(null)
	const linksList = useRef<HTMLUListElement>(null)
	const rule = useRef<HTMLDivElement>(null)
	const footer = useRef<HTMLDivElement>(null)
	const bottomBar = useRef<HTMLDivElement>(null)

	const { isOpen, toggle, close } = useNavMenuAnimation({
		slats: slatsWrap,
		lines: [line1, line2, line3],
		glow,
		content,
		// brand,
		label,
		links: linksList,
		rule,
		footer,
		bottomBar,
	})

	const navLinks: NavLink[] = [
		{
			num: "01",
			text: (
				<>
					Why This <em className="font-serif-display italic text-stone">Property</em>
				</>
			),
			action: onWhy,
		},
		{
			num: "02",
			text: (
				<>
					<em className="font-serif-display italic text-stone">Retail</em> & Brands
				</>
			),
			action: onRetail,
		},
		{
			num: "03",
			text: (
				<>
					Dining <em className="font-serif-display italic text-stone">Destinations</em>
				</>
			),
			action: onDining,
		},
		{ num: "04", text: <em className="font-serif-display italic text-stone">Attractions</em>, action: onAttractions },
		{
			num: "05",
			text: (
				<>
					Plan a <em className="font-serif-display italic text-stone">Visit</em>
				</>
			),
			action: onPlanVisit,
		},
	]

	return (
		<>
			<nav
				id="heroNav"
				className={cn(
					"fixed inset-x-0 top-0 z-[900] flex h-[72px] items-center justify-center border-b border-transparent transition-[background,border-color] duration-500",
					scrolled && "border-gold/10 bg-void/80 backdrop-blur-xl",
				)}
				style={{ opacity: 0, pointerEvents: "none" }}
			>
				<BurjHamburger isOpen={isOpen} onClick={toggle} lineRefs={[line1, line2, line3]} />
			</nav>

			<div
				role="dialog"
				aria-hidden={!isOpen}
				aria-modal="true"
				className={cn("fixed inset-0 z-[800] flex flex-col items-center justify-center", isOpen ? "pointer-events-auto" : "pointer-events-none")}
			>
				<BlindSlats ref={slatsWrap} count={18} />

				<div
					ref={glow}
					aria-hidden
					className="pointer-events-none absolute inset-0 z-[1] will-change-[opacity]"
					style={{
						background:
							"radial-gradient(ellipse 65% 45% at 50% 35%, hsl(var(--gold) / 0.16) 0%, transparent 65%), radial-gradient(ellipse 35% 25% at 15% 75%, hsl(var(--gold) / 0.08) 0%, transparent 55%)",
					}}
				/>

				<div
					ref={content}
					className={cn(
						"relative z-[2] flex w-full flex-col items-center px-10 pb-14 pt-20 will-change-[opacity]",
						isOpen ? "pointer-events-auto" : "pointer-events-none",
					)}
				>
					{/* <div ref={brand} className="mb-11 flex flex-col items-center gap-[3px]">
						<span className="font-serif-display text-[clamp(16px,1.6vw,20px)] font-normal tracking-[0.08em] text-off-white">The Dubai Mall</span>
						<span className="font-sans-luxe text-[8px] font-light uppercase tracking-[0.34em] text-gold">Downtown Dubai</span>
					</div> */}

					<p ref={label} className="mb-10 font-sans-luxe text-[8px] font-normal uppercase tracking-[0.4em] text-gold/70">
						Explore the Mall
					</p>

					<ul ref={linksList} className="mb-12 flex list-none flex-col items-center gap-2">
						{navLinks.map((link) => (
							<li key={link.num} className="overflow-hidden">
								<a
									href="#"
									tabIndex={isOpen ? 0 : -1}
									onClick={(e) => {
										e.preventDefault()
										link.action()
										close()
									}}
									className="group relative flex cursor-pointer items-baseline gap-[14px] py-[5px] font-serif-display text-[clamp(26px,4vw,52px)] font-normal leading-[1.1] text-off-white no-underline transition-colors duration-[400ms] hover:text-gold"
									style={{ transitionTimingFunction: "cubic-bezier(0.25, 0, 0, 1)" }}
								>
									<span className="link-num self-start mt-2 -translate-x-1.5 font-sans-luxe text-[9px] font-light tracking-[0.2em] text-gold/70 opacity-0 transition-all duration-[350ms] group-hover:translate-x-0 group-hover:text-gold group-hover:opacity-100">
										{link.num}
									</span>
									<span className="relative">
										{link.text}
										<span
											className="pointer-events-none absolute inset-x-0 -bottom-1 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-[width] duration-[550ms] group-hover:w-full"
											style={{ transitionTimingFunction: "cubic-bezier(0.25, 0, 0, 1)" }}
										/>
									</span>
								</a>
							</li>
						))}
					</ul>

					{/* <div
            ref={rule}
            className="menu-rule mx-auto mb-10 h-0 w-px opacity-0 transition-[height,opacity] duration-[1400ms]"
            style={{
              transitionTimingFunction: "cubic-bezier(0.25, 0, 0, 1)",
              background: "linear-gradient(to bottom, transparent, hsl(var(--gold) / 0.28), transparent)",
            }}
          /> */}
				</div>

				<div
					ref={bottomBar}
					className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between border-t border-gold/10 px-12 will-change-[opacity]"
				>
					<div className="flex items-center gap-2.5 font-sans-luxe text-[9px] font-light uppercase tracking-[0.24em] text-gold/60">
						<span className="h-1 w-1 rounded-full bg-gold/70" />
						Downtown Dubai, United Arab Emirates
					</div>

					<div ref={footer} className="flex items-center gap-10 will-change-[opacity,transform]">
						{FOOTER_LINKS.map((item, i) => (
							<div key={item} className="flex items-center gap-10">
								<a
									href="#"
									className="font-sans-luxe text-[9px] font-light uppercase tracking-[0.26em] text-gold/65 no-underline transition-colors duration-300 hover:text-gold-light"
								>
									{item}
								</a>
								{i < FOOTER_LINKS.length - 1 && <div className="h-[18px] w-px bg-gold/20" aria-hidden />}
							</div>
						))}
					</div>
				</div>
			</div>

			<style>{`.menu-rule.show { height: 44px; opacity: 1; }`}</style>
		</>
	)
}
